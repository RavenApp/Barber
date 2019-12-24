// edited script, originally by doron (doronrasis.com) & chirag (chirag.io) 

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //noStroke();
  hexWidth = rectWidth - rectWidth * (1-cos(30));
  let myCanv = createCanvas(windowWidth, windowHeight);
  myCanv.parent("animation");
  // let myCanv = createCanvas(4*rectWidth, 4*rectWidth);

  // frameRate(30);
}

const rectWidth = 300;
let hexWidth;

var colors = ["#baffc5","#ffffff",
    "#18002f","#fc354c","#4f4555","#fc354c","#09225b","#924161","#0a5c41",
    "#6d8b39","#fc4e45","#0f2b3d","#fc194a","#361032","#186061","#0c5d4b",
    "#615839","#fe1744","#12365a","#0c1467","#0d5355","#fb6447","#f21033",
    "#084a61","#513d3c","#0c2147","#0d4e38","#724a3e","#0c2841","#f14247",
    "#0c5b49"];

let fc = 0;

let triangleFolding = false


function draw() {
  // if (keyIsPressed) {
    d();
  // }
}

function d() {
  background(colors[1]);
  fill(colors[0]);
  noStroke()
//   scale(-cos(frameCount)/2 + 1.5);
  if (!triangleFolding) {
    fc += 0.25;
    rotatingHexes();
    if(fc % 60 == 0) {
      fc = 0;
      triangleFolding = !triangleFolding;
    }
  } else {
      fc += .5;

    if (fc % 180 == 0) {
      colors = [colors[1], colors[0]];
      triangleFolding = !triangleFolding;
    }
    foldingTriangles();
  }

}

function foldingTriangles() {
  for (let i = 0; i <= (windowWidth/rectWidth + 2); i++) {
    for (let j = 0; j <= (windowHeight/rectWidth + 3); j++) {
      push();
        if(j % 2 == 0) {
          translate(hexWidth/2, 0);
        }
        const translateUp = rectWidth / 2 - (rectWidth/2)*sin(30);
        translate(i * hexWidth, j*(rectWidth - translateUp) );
        rotate(30);
        scale(sqrt(3)/2);
        for (let tri = 0; tri < 6; tri++) {
          // draw the triangles
          push();
            // if(j%2 == 0)
            // rotate(tri * 60);
            // else
            rotate(-tri * 60);
            translate(hexWidth/2, 0);
            // if (j % 2==0)
            rotate(lerp(180, 0, -cos(fc)/2 + .5));
            // else
            // rotate(-lerp(180, 0, -cos(fc)/2 + .5));
            // scale(lerp(1, .5, -cos(fc * 2)/2 + .5));
            scale(lerp(1, .8, -cos(fc * 2)/2 + .5));
            triangle(0, -translateUp, 0, translateUp, translateUp * sqrt(3), 0);
          pop();
        }
      pop();
    }
  }

}

function rotatingHexes() {
  for (let i = 0; i <= (windowWidth/rectWidth + 2); i++) {
    for (let j = 0; j <= (windowHeight/rectWidth + 3); j++) {
      push();
        if(j % 2 == 0) {
          translate(hexWidth/2, 0);
        }
        const translateUp = rectWidth / 2 - (rectWidth/2)*sin(30);
        translate(i * hexWidth , j*(rectWidth - translateUp));
        if (j% 2 == 0)
        rotate(fc * 3);
        else
          rotate(-fc * 3);
        scale(lerp(sqrt(3)/2, .9, -cos(fc*6)/2 + .5));
        hexagon(0, 0, rectWidth/2);

      pop();
    }
  }
}

function hexagon(posX, posY, rad) {
  push();
    angleMode(DEGREES);
    translate(posX, posY);
    beginShape();
      for (var i = 0; i < 6; i++) {
        const angle = 60 * i;
        vertex(rad * cos(angle), rad * sin(angle));
      }
    endShape(CLOSE);
  pop();
}

function* nested(a, b) {
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < j; j++) {
      yield [i, j];
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}