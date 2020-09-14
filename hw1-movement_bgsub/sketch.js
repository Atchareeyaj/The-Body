let myVideo;
let pastPixels = [];
//let avgDiff;
let slider;
let bgBUT;
let bgPixels = [];
let secretPixels = [];

let img;

function preload(){
  img = loadImage("../../assets/dem.png");
}

function setup() {
  createCanvas(640, 480);

  myVideo = createCapture(VIDEO);
  myVideo.size(width,height);
  myVideo.hide();
  slider = createSlider(0,255,100);

  bgBUT = createButton('set BG');
  bgBUT.mousePressed(setBG);

  img.loadPixels();
  secretPixels = img.pixels;
}

function setBG(){
  console.log('Set BG !');

  myVideo.loadPixels();
  const currentPixels = myVideo.pixels;

  for(let i=0; i<currentPixels.length; i++){
    bgPixels[i] = currentPixels[i];
  }
}

function draw() {
  myVideo.loadPixels();

  let sliderVal = slider.value();

  const currentPixels = myVideo.pixels;

  for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
      const i = (y*width+x)*4;

      const rDiff = abs(currentPixels[i+0]-pastPixels[i+0]);
      const gDiff = abs(currentPixels[i+1]-pastPixels[i+1]);
      const bDiff = abs(currentPixels[i+2]-pastPixels[i+2]);

      //set pastPixels to currentPixels
      pastPixels[i+0] = currentPixels[i+0];
      pastPixels[i+1] = currentPixels[i+1];
      pastPixels[i+2] = currentPixels[i+2];
      pastPixels[i+3] = currentPixels[i+3];

      const avgDiff = (rDiff+gDiff+bDiff)/3;

      if(avgDiff < sliderVal){
        currentPixels[i+0] = currentPixels[i+0];
        currentPixels[i+1] = currentPixels[i+0];
        currentPixels[i+2] = currentPixels[i+0];
        currentPixels[i+3] = 10;
      }
      // show cat
      else{
        currentPixels[i+0] = secretPixels[i+0];
        currentPixels[i+1] = secretPixels[i+1];
        currentPixels[i+2] = secretPixels[i+2];
      }
    }
  }
  myVideo.updatePixels();
  image(myVideo,0,0,width,height);
}
