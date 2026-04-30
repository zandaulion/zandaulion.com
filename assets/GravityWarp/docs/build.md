# Build & Setup

## Prerequisites

| Tool | Required version |
|---|---|
| JDK | 21 |
| Android Studio | Meerkat (or any version supporting AGP 9.1) |
| Android SDK | API 35 (compile), API 24+ (device) |
| Gradle | Wrapper included (`gradlew`) |

## Module Configuration

### Root `build.gradle.kts`

```kotlin
plugins {
    id("com.android.application") version "9.1.1" apply false
    id("org.jetbrains.kotlin.android") version "2.2.10" apply false
    id("org.jetbrains.kotlin.jvm") version "2.0.21" apply false
}
```

### `core/build.gradle.kts`

```kotlin
plugins {
    id("org.jetbrains.kotlin.jvm")
}

dependencies {
    api("com.badlogicgames.gdx:gdx:1.13.0")
    api("com.badlogicgames.gdx:gdx-freetype:1.13.0")
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}
```

### `android/build.gradle.kts`

```kotlin
android {
    namespace = "com.orbit.game"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.orbit.game"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }
}

dependencies {
    implementation(project(":core"))
    implementation("com.badlogicgames.gdx:gdx-backend-android:1.13.0")
    implementation("com.badlogicgames.gdx:gdx-freetype:1.13.0")
    // native .so files for arm64-v8a, armeabi-v7a, x86, x86_64
    natives("com.badlogicgames.gdx:gdx-platform:1.13.0:natives-arm64-v8a")
    // ... (all four architectures for gdx and gdx-freetype)
}
```

A custom Gradle task copies native `.so` files from the Gradle cache into `android/libs/` before the build.

### `settings.gradle.kts`

```kotlin
rootProject.name = "orbit"
include(":core", ":android")
```

## Building

```bash
# Debug APK
./gradlew :android:assembleDebug

# Release APK (requires signing config)
./gradlew :android:assembleRelease

# Install on connected device
./gradlew :android:installDebug
```

## Android Manifest

**Location:** `android/src/main/AndroidManifest.xml`

Key declarations:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
<!-- WRITE_EXTERNAL_STORAGE only needed below Android 9; MediaStore handles 10+ -->

<application
    android:label="Gravity Warp"
    android:theme="@android:style/Theme.NoTitleBar.Fullscreen">

    <activity
        android:name=".android.AndroidLauncher"
        android:screenOrientation="portrait"
        android:configChanges="keyboard|keyboardHidden|navigation|orientation|screenSize" />
</application>
```

## AndroidLauncher Configuration

```kotlin
val config = AndroidApplicationConfiguration().apply {
    useAccelerometer = false
    useCompass = false
    useImmersiveMode = true
    numSamples = 2           // 2× MSAA
}
```

`useImmersiveMode = true` hides the system navigation bar and status bar. `numSamples = 2` enables 2× MSAA anti-aliasing for smoother diagonal edges.

## Assets

The only bundled asset is:

```
android/src/main/assets/font.ttf   (Press Start 2P, pixel-art font)
```

All textures and audio are generated procedurally by `AssetFactory` at startup. This keeps the APK small and avoids licensing complications with external assets.

## Persistent Storage

`SharedPreferences` keys (stored under the application package):

| Key | Type | Default | Purpose |
|---|---|---|---|
| `highScore` | Int | 0 | Normal mode high score |
| `highScoreHard` | Int | 0 | Hard mode high score |
| `sfxEnabled` | Boolean | true | SFX toggle state |
| `musicEnabled` | Boolean | true | Music toggle state |
| `gamesPlayed` | Int | 0 | Counter for coffee button |
| `coffeeTapped` | Boolean | false | Coffee easter egg state |

## Minimum Device Requirements

- Android 7.0 (API 24)
- OpenGL ES 2.0 (standard since API 8)
- Touch screen
- ~50 MB free RAM (textures + audio buffers are lightweight)

## Running on Desktop (Development)

LibGDX supports a `lwjgl3` desktop backend for faster iteration. To add it:

1. Add `:desktop` module with `lwjgl3` backend dependency
2. Create a `DesktopLauncher` that passes a stub `VideoRecorder` (GIF saving is Android-only)
3. Run with `./gradlew :desktop:run`

This is not currently in the project but is straightforward to add.
