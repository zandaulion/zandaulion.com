# Replay & GIF Export

## Replay Recorder

`ReplayRecorder` maintains a fixed-capacity ring buffer of `Frame` objects. One frame is recorded per game tick, giving approximately 3 seconds of history at 60 fps.

### Ring Buffer

```
capacity = 180 frames
buffer   = Array<Frame?>(180)
head     = 0   // next write index (wraps around)
size     = 0   // grows until full, stays at 180
```

Writing always happens at `buffer[head]`; `head = (head + 1) % capacity`. Reading returns frames in chronological order by unwinding from `(head - size)` to `head`.

### Frame Data Structure

```kotlin
data class Frame(
    // Player
    val playerX: Float, val playerY: Float,
    val playerVelX: Float, val playerVelY: Float,
    val playerScale: Float, val playerRotation: Float,
    // Stardust
    val dustX: Float, val dustY: Float,
    val dustPulseTimer: Float,
    // Mines
    val mines: List<MineSnapshot>,
    val hunters: List<MineSnapshot>,
    // Warp
    val warpActive: Boolean,
    val warpX: Float, val warpY: Float,
    val warpTimer: Float, val warpFade: Float
)
```

`MineSnapshot` stores position, velocity, and pulse timer. Hunter snapshots add no extra fields — they are distinguished by the list they appear in.

---

## Near-Miss Detection

Checked every frame during normal play:

```kotlin
val dist = player.position.dst(mine.position)
if (dist in 72f..80f) {
    startNearMissCapture(label = "CLOSE CALL #${clips.size + 1}", score = currentScore)
}
```

### Capture Lifecycle

```
startNearMissCapture()
    → pulls getRecentFrames(120)      ← 2 seconds of pre-context
    → begins collecting post frames   ← records for 2 more seconds

after 120 post frames:
    → assembles NearMissClip(pre + post frames, label, score)
    → appends to clips list (max 5; oldest dropped if full)
```

`flushPending()` is called when the player dies mid-capture, so partial clips are still saved.

---

## Highlights Screen

After the replay, if `nearMissClips` is non-empty, the Highlights screen is shown.

Layout:

```
┌────────────────────────────────┐
│        CLOSE CALLS             │
│                                │
│  CLOSE CALL #1  Score: 14  [Save] │
│  CLOSE CALL #2  Score: 21  [Save] │
│  CLOSE CALL #3  Score: 28  [Save] │
│                                │
│           [Continue]           │
└────────────────────────────────┘
```

Tapping **Save** on a clip starts GIF encoding for that clip. Tapping **Continue** proceeds to the Game Over screen.

---

## GIF Export Pipeline

### 1 — Frame capture

When the player taps Save, `GravityWarpGame.renderSavingClip()` reads frames from the selected `NearMissClip` and renders each frame off-screen to a `Pixmap`.

Rendering is identical to `renderReplay()` — physics objects are reconstructed from the frame snapshot and drawn to the frame buffer, then `Gdx.gl.glReadPixels()` reads the buffer into a `Pixmap`.

### 2 — AndroidVideoRecorder

`addFrame(pixmap)` copies the Pixmap into a queue (`LinkedBlockingQueue<Pixmap>`). The encoder thread runs concurrently:

```
encoder thread loop:
    pixmap = queue.take()           // blocks until frame available
    scaled = downscale(pixmap, targetW, targetH)
    gifEncoder.addFrame(scaled)
    pixmap.dispose()
    scaled.dispose()
    progress = encoded / total
```

Frame rate of the output GIF is configurable; the default is 30 fps (every other game frame at 60 fps).

### 3 — GifEncoder

`GifEncoder` produces a valid **GIF89a** binary in three phases:

#### Quantization

The encoder builds a fixed 8-8-4 RGB palette (256 colours). Each pixel is mapped to the nearest palette entry. **Floyd–Steinberg dithering** distributes the quantization error to adjacent pixels:

```
for each pixel (x, y):
    newColor = nearest(palette, pixel)
    error    = pixel - newColor
    pixel[x+1][y  ] += error * 7/16
    pixel[x-1][y+1] += error * 3/16
    pixel[x  ][y+1] += error * 5/16
    pixel[x+1][y+1] += error * 1/16
```

This eliminates visible banding on gradient regions (space, explosion debris).

#### LZW Compression

GIF uses LZW with:
- Initial code size: 8 bits
- Maximum code size: 12 bits (4096 entries)
- Clear code resets the dictionary when it fills up

#### Output Structure

```
GIF89a header
Logical Screen Descriptor (width, height, palette info)
Global Color Table (256 × 3 bytes RGB)
Netscape Application Extension (loop count = 0 = infinite)
for each frame:
    Graphic Control Extension (frame delay, transparency)
    Image Descriptor
    LZW-compressed image data
GIF Trailer (0x3B)
```

### 4 — Save to Gallery

On Android 10+ (`Build.VERSION.SDK_INT >= Q`):

```kotlin
MediaStore.Images.Media.insert(contentResolver, values)
// opens OutputStream, writes GIF bytes, closes
```

On older Android:

```kotlin
File(Environment.getExternalStoragePublicDirectory(PICTURES), "GravityWarp/clip.gif")
// writes directly, then calls MediaScannerConnection.scanFile()
```

### Progress Tracking

`AndroidVideoRecorder.saveProgress` is a `Float` in 0.0–1.0. `GravityWarpGame` reads it each frame and passes it to `HudRenderer.renderSavingProgress()`, which draws a progress bar overlay.

When `saveResult` becomes non-null, either a success message or error is shown on screen.
