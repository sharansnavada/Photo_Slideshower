# God Photo Gallery

Put your photos (jpg/png...) in the `photos/` folder. Each time you push new images to `main`, the GitHub Actions workflow will generate `photos.json` and deploy the site to GitHub Pages.

If you prefer to run locally:

1. `node generate_manifest.js` to create `photos.json`
2. Serve the folder (e.g. `npx http-server` or `python -m http.server 8000`) and open `index.html`.

Enjoy your gallery ❤️