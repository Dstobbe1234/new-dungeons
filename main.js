const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
cnv.width = 500;
cnv.height = 500;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// let spaces = [[0, 0, cnv.width, cnv.height]];
let spaces = [[32]];

function divide() {
  for (let i = 0; i < 5; i++) {
    const parent = spaces[i];
    spaces.length = spaces.length * 2;

    for (let j = 0; j < spaces.length; j += 2) {
      spaces[j] = [parent[0] / 2];
      spaces[j + 1] = [parent[0] / 2];
    }
    // let currentSpaces = [];
    // for(let j = 0; j < spaces.length; j++) {
    //     currentSpaces.push(spaces[j])
    // }
    // for (let k = 0; k > currentSpaces.length; k++) {
    //   let direction = randomInt(0, 2);
    //   if (currentSpaces[i][direction + 2] >= 75 * 3) {
    //     let randomDivide = randomInt(
    //       currentSpaces[i][direction] + 75,
    //       currentSpaces[i][direction + 2] + spaces[i][direction] - 75
    //     );
    //   }
    //   if(direction == 0) {
    //      spaces.push([currentSpaces[0], currentSpaces[1], randomDivide - currentSpaces[0], currentSpaces[3]])
    //      spaces.push(randomDivide, currentSpaces[1], currentSpaces[2] + currentSpaces, currentSpaces[3]])
    //   }
    // }
  }
}

divide();
