const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 1000;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


let spaces = [[0, 0, cnv.width, cnv.height]];

class dungeon {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  } draw() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

function divide() {
  // for(let i = 0; i < 5; i++) {
    let newSpaces = []
    for(j = 0; j < spaces.length; j++) {
      const parent = spaces[j]
      const direction = randomInt(0, 2)
      const randomDivide = randomInt(parent[direction] + 75, parent[direction] + parent[direction + 2] - 75)
      console.log(parent[direction + 2])
      if(parent[direction + 2] >= 75 * 3) {
        if(direction == 0) {
          newSpaces.push([parent[0], parent[1], randomDivide - parent[0], parent[3]])
          newSpaces.push([randomDivide, parent[1], parent[2] - (randomDivide - parent[0]), parent[3]])
        } else {
          newSpaces.push([parent[0], parent[1], parent[2], randomDivide - parent[1]])
          newSpaces.push([parent[0], randomDivide, parent[2], parent[3] - (randomDivide - parent[1])])
        }
      } else {
        newSpaces.push(parent)
      }
    }
    if(JSON.stringify(spaces) == JSON.stringify(newSpaces)) {
      clearInterval(divideInterval)
      createDungeons()
    }
    spaces = newSpaces
    for(let i = 0; i < spaces.length; i++) {
      ctx.strokeStyle = "black"
      ctx.strokeRect(spaces[i][0], spaces[i][1], spaces[i][2], spaces[i][3])
    }
  // }
}

let dungeons = []
function createDungeons() {
  for(let i = 0; i < spaces.length; i++) {
    let randX = randomInt(spaces[i][0] + 50, spaces[i][0] + spaces[i][2] - 50)
    let randY = randomInt(spaces[i][1] + 10, spaces[i][1] + spaces[i][3] - 50)

    if(randX % 2 !== 0) {
      randX++
    } 
    if(randY % 2 !== 0) {
      randY ++
    }

    dungeons.push(new dungeon(randX, randY, 10, 10))
  }
  for(let j = 0; j < dungeons.length; j++) {
    dungeons[j].draw()
  }
}

const divideInterval = setInterval(function() {divide() }, 1000)