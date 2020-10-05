let balls = [];
let numBall = 100;
let xoff = 0;
let interval = 100;
let bright = 0;
let dImg;
function preload(){

}

function setup() {
  createCanvas(640, 576);

  // Set to hsb for nice color gradients
  colorMode(HSB, 255);

  // Create kinectron
  const kinectron = new Kinectron("2a5dff95a159.ngrok.io");

  // Set kinect type to azure
  kinectron.setKinectType("azure");

  // Connect to server
  kinectron.makeConnection();

  // Start the depth feed, and set a callback for when data is recieved
  kinectron.startDepth(drawDepth);
  //kinectron.startColor(drawColor);
}

function draw() {
//background(220);
  if(interval < millis()){
     interval = 100+millis();
    let posx = random(0,width);
    let posy = 0;
    let b = new Ball(posx,posy);
    balls.push(b);
     }

  noStroke();
  for(let i =0; i<balls.length; i+=1){
    bright = get(balls[i].x,balls[i].y);
    bright = brightness(bright);
    console.log(bright);
    balls[i].draw();
    balls[i].update();
    if(bright >= 250){
       balls.splice(i,1);
      console.log("splice");
       }
  }
}

function drawDepth(depthImg) {
  // load the depth image
  loadImage(depthImg.src, (dImg) => {
    // get pixels from depth feed
    dImg.loadPixels();
    let depthPixels = dImg.pixels;

    // go through depth pixels
    // iterate by 4 -- 4 channels per pixels
    for (let i = 0; i < depthPixels.length; i += 4) {
      // get the depth value
      // grayscale depth image is 0-255 8-bit depth
      let depthVal = depthPixels[i]; // 0-255
    }

    // update image
    dImg.updatePixels();

    // draw it!
    image(dImg, 0, 0);
  });
}

function drawColor(colorImg) {
  // load the depth image
  loadImage(colorImg.src, (cImg) => {
    // // get pixels from depth feed
    // cImg.loadPixels();
    // let colorPixels = cImg.pixels;
    //
    // // go through color pixels
    // // iterate by 4 -- 4 channels per pixels
    // for (let i = 0; i < colorPixels.length; i += 4) {
    //   // get the color value
    //   // grayscale color image is 0-255 8-bit color
    //   let colorVal = colorPixels[i]; // 0-255
    // }
    //
    // // update image
    // cImg.updatePixels();
    cImg.resize(1080, 576);
    // draw it!
    image(cImg, -170, 0);

  });
}

class Ball{
  constructor(xPos,yPos){
    this.col = random(0,255);
    this.speed = random(1,3);
    this.bright = random(50,100);
    //this.bright =100;
    this.size = random(10,30);
    this.x = xPos;
    this.y = yPos;
  }
  draw(){
    //colorMode(HSB);
    fill(this.col,this.bright,255);
    ellipse(this.x,this.y,this.size,this.size);
  }
  update(){
    this.y += this.speed;
  }
}
