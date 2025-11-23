// Fetch photos.json and render gallery. Also implement random 5s slideshow.

const PHOTOS_JSON = './photos.json';
let photos = [];
let randomInterval = null;
let randomMode = false;
let currentRandomIndex = -1;

const heroImg = document.getElementById('heroImg');
const grid = document.getElementById('grid');
const randomBtn = document.getElementById('randomBtn');
const pauseBtn = document.getElementById('pauseBtn');

async function loadPhotos(){
  try{
    const res = await fetch(PHOTOS_JSON + '?t=' + Date.now());
    if(!res.ok) throw new Error('Could not load photos.json');
    photos = await res.json();
    renderGallery();
    // show last added by default (or random)
    if(photos.length) showPhoto(photos[photos.length-1]);
  }catch(e){
    console.error(e);
    grid.innerHTML = '<p style="color:#b00">Failed to load photos.json — make sure it exists in the repo root.</p>';
  }
}

function renderGallery(){
  grid.innerHTML = '';
  photos.forEach((p, i) =>{
    const img = document.createElement('img');
    img.src = p;
    img.alt = `photo-${i}`;
    img.addEventListener('click', ()=>{
      stopRandom();
      showPhoto(p);
    });
    grid.appendChild(img);
  });
}

function showPhoto(path){
  heroImg.src = path;
}

function startRandom(){
  if(photos.length===0) return;
  randomMode = true;
  randomBtn.disabled = true;
  pauseBtn.disabled = false;
  // immediately show one
  currentRandomIndex = Math.floor(Math.random()*photos.length);
  showPhoto(photos[currentRandomIndex]);
  randomInterval = setInterval(()=>{
    // pick different index
    let next = Math.floor(Math.random()*photos.length);
    if(photos.length>1){
      while(next===currentRandomIndex) next = Math.floor(Math.random()*photos.length);
    }
    currentRandomIndex = next;
    showPhoto(photos[currentRandomIndex]);
  },5000);
}

function stopRandom(){
  randomMode = false;
  randomBtn.disabled = false;
  pauseBtn.disabled = true;
  if(randomInterval) { clearInterval(randomInterval); randomInterval = null; }
}

randomBtn.addEventListener('click', ()=>{
  startRandom();
});

pauseBtn.addEventListener('click', ()=>{
  stopRandom();
});

// init
pauseBtn.disabled = true;
loadPhotos();