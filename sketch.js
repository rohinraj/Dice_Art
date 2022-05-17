let uploadButton;

let img; // creates image variable
let nos = 75;
let size;
let scl;
let imageCounter = 0;
let images = [];
let diceLimit = 225;

let startx = 0; // starting x coordinate
let starty = 0; // starting y coordinate

let canvasWidth;
let canvasHeight;

let diceType = "B";
// let diceType = "W";
// let diceType = "B&W";

function preload() {
  // img = loadImage("virgie.png"); // preloads Virginia picture!
  img = loadImage("kunal-nayyar.jpg");
}

function setup() {
  let cnv = createCanvas((w = 1500), (h = 1500)); // creates canvas
  // cnv.position(w < windowWidth ? (windowWidth - w) / 2 : 0, 0);

  size = w / nos;
  scl = size / 118;
  relA4Width = 2478 * scl;
  relA4Height = 3504 * scl;

  img.resize(
    img.width <= img.height ? nos * size : 0,
    img.width > img.height ? nos * size : 0
  );
  img = img.get(0, 0, nos * size, nos * size);
  img.loadPixels(); // loads image
  img.updatePixels(); // updates image
  stroke(120);

  if (nos > diceLimit) {
    nos = 1;
  }

  uploadButton = createButton("Click me!");
}

function draw() {
  clear();
  background(255);
  let maxDim = w > h ? w : h;
  let finalImgScale = (maxDim = w ? width / img.width : height / img.height);

  // size = w / nos;
  for (var starty = 0; starty < img.height; starty++) {
    // creates pixel index
    for (var startx = 0; startx < img.width; startx++) {
      var index = (startx + starty * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = floor(0.3 * r + 0.59 * g + 0.11 * b); // sets pixel value to adjusted grayscale

      // noStroke(); // disables element stroke

      // if (bright < 63.75) {
      //   fill(0);
      // } else if (bright >= 63.75 && bright < 127.5) {
      //   fill(85);
      // } else if (bright >= 127.5 && bright <= 191.25) {
      //   fill(170);
      // } else if (bright >= 191.25 && bright <= 255) {
      //   fill(255);
      // }

      // fill(bright); // fills element with adjusted grayscale

      // image(img,0,0)
      // rect(startx, starty, size, size);

      if (diceType == "B") {
        onlyBlackDice(bright, startx, starty, size);
      } else if (diceType == "W") {
        onlyWhiteDice(bright, startx, starty, size);
      } else if (diceType == "B&W") {
        dice(bright, startx, starty, size);
      }

      // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
      // triangle(startx, starty, startx, starty + size, startx + size, starty)

      startx = startx + floor(size) - 1; // set new startx value
    }
    starty = starty + floor(size) - 1; // set new starty value
  }
  // console.log((h - (h % relA4Height)) / relA4Height + 1);
  noLoop();
  // image(img, 0, 0);
}

function mouseClicked() {
  let counter = 1;
  for (j = 0; j < (h - (h % relA4Height)) / relA4Height + 1; j++) {
    for (i = 0; i < (w - (w % relA4Width)) / relA4Width + 1; i++) {
      let c = get(i * relA4Width, j * relA4Height, relA4Width, relA4Height);
      c.resize(2478, 0);
      // c.save("SCB " + str(counter), "png");
      images.push(c);
    }
  }
  console.log(images.length);
  for (let i = 0; i < images.length; i++) {
    images[i].save("Dice Art " + str(counter), "png");
    counter++;
  }
  images = [];
}
