/* Assigment : Movement Detection
Reference
movement detection code example : https://github.com/lisajamhoury/The-Body-Everywhere-And-Here/tree/master/examples/week1/example1_framediff
Rutt etra : Zach Liberman RIP class
*/

let myVideo;
let pastPixels = [];
let slider;

function setup() {
  createCanvas(640, 480);

  myVideo = createCapture(VIDEO);
  myVideo.size(width,height);
  myVideo.hide();
  slider = createSlider(0,255,50);
}


function draw() {
  myVideo.loadPixels();

  let sliderVal = slider.value();

  const currentPixels = myVideo.pixels;
      beginShape(LINES);
  for(let y =0; y<height; y+=6){
    for(let x=0; x<width; x++){
      let i = (x+y*myVideo.width)*4;

      let r = myVideo.pixels[i];
      let b = myVideo.pixels[i+1];
      let g = myVideo.pixels[i+2];

      let col = color(r,g,b);
      let bri = brightness(col);
      let thVal = map(sliderVal,0,255,0,100);
      let offset = map(bri,0,255,thVal,0);
      stroke(0);
      vertex(x,y+offset);
    }
  }
  endShape();
  for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
      const i = (y*width+x)*4;

      // get different between current & past pixel
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
        // currentPixels[i+0] = currentPixels[i+0];
        // currentPixels[i+1] = currentPixels[i+0];
        // currentPixels[i+2] = currentPixels[i+0];
        // currentPixels[i+3] = 10;

        currentPixels[i+0] = 255;
        currentPixels[i+1] = 255;
        currentPixels[i+2] = 255;
        currentPixels[i+3] = 200;

      }
      // glitch
      else{
        currentPixels[i+0] = random(255);
        currentPixels[i+1] = random(255);
        currentPixels[i+2] = 255;
      }
    }
  }
  myVideo.updatePixels();
  image(myVideo,0,0,width,height);
}
