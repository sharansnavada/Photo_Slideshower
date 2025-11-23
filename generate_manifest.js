// run with: node generate_manifest.js
// It lists files in ./photos and outputs photos.json with sorted filenames (oldest -> newest)
const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(process.cwd(),'photos');
const OUT = path.join(process.cwd(),'photos.json');

function main(){
  if(!fs.existsSync(PHOTOS_DIR)){
    console.error('photos/ folder not found — create it and add images.');
    process.exit(1);
  }
  const files = fs.readdirSync(PHOTOS_DIR)
    .filter(f => !f.startsWith('.'))
    .filter(f => /\.(jpe?g|png|gif|webp|avif)$/i.test(f))
    .map(f => ({name: f, mtime: fs.statSync(path.join(PHOTOS_DIR,f)).mtime.getTime()}))
    .sort((a,b)=>a.mtime - b.mtime)
    .map(x => `./photos/${x.name}`);

  fs.writeFileSync(OUT, JSON.stringify(files, null, 2), 'utf8');
  console.log('Wrote', OUT, 'with', files.length, 'photos');
}

main();