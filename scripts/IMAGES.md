# Responsive image maintenance

The homepage and related-project cards use small WebP variants. The shared logo
uses lossless PNG variants, including a 32-pixel favicon. Original images remain
available for project galleries and their enlarged views.

Normal page generation and CI checks need only Python's standard library. Image
encoding is an optional authoring step with a pinned Pillow dependency. Use
Python 3.12 with WebP support:

```sh
python3.12 -m venv .venv-images
.venv-images/bin/python -m pip install -r scripts/requirements-images.txt
.venv-images/bin/python scripts/build_images.py
python scripts/build_images.py --check
python scripts/build_locales.py
```

Run these commands from the repository root. The encoder records its Pillow and
WebP versions in `assets/optimized/manifest.json`. Platform encoder versions may
produce different compressed bytes; use the recorded versions when reproducing
existing output. There is no image service or image encoding at runtime or in CI.

## Adding or replacing an image

1. Review the source for private content and metadata before publishing it. Use
   synthetic demo records in screenshots.
2. Add its repository-relative path to `scripts/image_sources.json`. Keep the
   original in `assets/` for gallery use.
3. Run the encoder. It preserves aspect ratio and transparency, applies EXIF
   orientation, converts embedded color profiles to sRGB, and removes source
   metadata from the generated files. It never enlarges a source image.
4. Set the image's `src`, width-based `srcset`, and layout-appropriate `sizes` in
   `templates/home.html` or the root project HTML. The manifest lists each output
   path and its actual dimensions. Use `{{root}}` for homepage asset prefixes;
   project translation adds `../` to relative candidate URLs automatically.
   If source dimensions change, update width descriptors and intrinsic dimensions
   to match. Full-size gallery image URLs can keep pointing to the original.
5. Regenerate localized HTML, run the checks documented in the README, and review
   mobile and desktop rendering. Check Arabic layout and an enlarged gallery image
   when those pages are affected.
6. Commit the source, configuration, manifest, variants, and generated HTML
   together. Remove unused variants when replacing a source path.

`python scripts/build_images.py --check` verifies the configuration and SHA-256
hashes of every source and generated variant without installing Pillow. Site
checks also validate every `srcset` URL, including localized project pages.
