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
  constructor(coords) {
    this.coords = coords;
    this.connected = false;
  }
  split() {
    console.log("SPLIT");
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
console.log(`length = ${spaces.length}`);

let input = {};
function keydownListener(event) {
  input[event.key] = true;
}

function keyupListener(event) {
  input[event.key] = false;
}

let displacement = [0, 0];

class dungeon {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
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
  console.log(spaces);
  requestAnimationFrame(loop);
}

// let dungeons = [];
// function createDungeons() {
//   for (let i = 0; i < spaces.length; i++) {
//     let randX = randomInt(spaces[i].coords[0] + 50, spaces[i].coords[0] + spaces[i].coords[2] - 50);
//     let randY = randomInt(spaces[i].coords[1] + 10, spaces[i].coords[1] + spaces[i].coords[3] - 50);

//     if (randX % 2 !== 0) {
//       randX++;
//     }
//     if (randY % 2 !== 0) {
//       randY++;
//     }

//     dungeons.push(new dungeon(randX, randY, 10, 10));
//   }
//   requestAnimationFrame(loop);
// }

// // const divideInterval = setInterval(function() {divide() }, 1000)
// divide();
// createDungeons();

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
  requestAnimationFrame(loop);
}

divide();
