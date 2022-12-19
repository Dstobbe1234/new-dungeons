const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 1000;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", keydownListener);
document.addEventListener("keyup", keyupListener);

class space {
  constructor(coords, children) {
    this.coords = coords;
    this.parent = parent;
  }
  split() {
    const direction = randomInt(0, 2);
    const randomDivide = randomInt(
      this.coords[direction] + 500,
      this.coords[direction] + this.coords[direction + 2] - 500
    );
    if (this.coords[direction + 2] >= 500 * 3) {
      if (direction == 0) {
        newSpaces.push(
          new space([
            this.coords[0],
            this.coords[1],
            randomDivide - this.coords[0],
            this.coords[3], 
          ]),
          new space([
            randomDivide,
            this.coords[1],
            this.coords[2] - (randomDivide - this.coords[0]),
            this.coords[3], 
          ])
        );
      } else {
        newSpaces.push(
          new space([
            this.coords[0],
            this.coords[1],
            this.coords[2],
            randomDivide - this.coords[1], 
          ]),
          new space([
            this.coords[0],
            randomDivide,
            this.coords[2],
            this.coords[3] - (randomDivide - this.coords[1]),
          ])
        );
      }
    } else {
      newSpaces.push(this);
    }
  }
}

let spaces = [new space([-3000, -3000, cnv.width + 3000, cnv.height + 3000])];

let input = {};
function keydownListener(event) {
  input[event.key] = true;
}

function keyupListener(event) {
  input[event.key] = false;
}

let displacement = [0, 0];

class dungeon {
  constructor(segments) {
    this.segments = segments
    this.connected = false;
  }
  draw() {
    ctx.fillStyle = "red";
    for(let i = 0; i < this.segments.length; i++) {
      ctx.fillRect(this.segments[i][0] + displacement[0], this.segments[i][1] + displacement[1], this.segments[i][2], this.segments[i][3])
    }
  }
}

let newSpaces;
function divide() {
  for (let i = 0; i < 10; i++) {
    newSpaces = [];
    for (let j = 0; j < spaces.length; j++) {
      spaces[j].split();
    }
    spaces = newSpaces;
  }
  createDungeons()
  console.log(spaces)
}

let dungeons = [];
function createDungeons() {
  for(let i = 0; i < spaces.length; i++) {
    const centreX = spaces[i].coords[0] + (spaces[i].coords[2] / 2);
    const centreY = spaces[i].coords[1] + (spaces[i].coords[3] / 2);
    let randHeights = []
    let randWidths = []
    for(let i = 0; i < 4; i++) {
      randHeights.push(randomInt(50, 100))
      randWidths.push(randomInt(50, 100))
    }
    const tl = [centreX - randWidths[0], centreY - randHeights[0], randWidths[0], randHeights[0]]
    const tr = [centreX, centreY - randHeights[1], randWidths[1], randHeights[1]]
    const bl = [centreX - randWidths[2], centreY, randWidths[2], randHeights[2]]
    const br = [centreX, centreY, randWidths[3], randHeights[3]]

    dungeons.push(new dungeon([tl, tr, bl, br]))
  }
  requestAnimationFrame(loop);
}

function createPaths() {
}

function loop() {
  if (input["a"]) {
    displacement[0] += 10;
  }
  if (input["d"]) {
    displacement[0] -= 10;
  }
  if (input["w"]) {
    displacement[1] += 10;
  }
  if (input["s"]) {
    displacement[1] -= 10;
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  for (let i = 0; i < spaces.length; i++) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(
      spaces[i].coords[0] + displacement[0],
      spaces[i].coords[1] + displacement[1],
      spaces[i].coords[2],
      spaces[i].coords[3]
    );
  }
  for(let j = 0; j < dungeons.length; j++) {
    dungeons[j].draw()
  }
  requestAnimationFrame(loop);
}

divide();

// let test = [{self:0, child:[],}]
// for(let i = 0; i < 5; i++) {
//   for(let j = 0; j < test.length; j++) {
//     let space = test[j]
//     let index = [0, 0, 0, 0, 0]
//     for(let k = 0; k < index.length; k++) {
//       space = test.child[index[k]]
//     }
//     for(let k = 1; k < index.length; k++) {
//       if(index[k] < 1) {
//         index[k] ++
//         break
//       }
//     }
//   }
// }