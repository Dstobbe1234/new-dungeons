const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
cnv.width = 500;
cnv.height = 500;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


let spaces = [[0, 0, cnv.width, cnv.height]];

function divide() {
  for (let i = 0; i < 5; i++) {
    const parent = spaces[i];
    spaces.length = spaces.length * 2;
    let direction = randomInt(0, 2);
    console.log(parent)
    console.log(direction)
    
    // console.log(parent[direction])
    // let randomDivide = randomInt(
    //     parent[direction] + 75,
    //     parent[direction + 2] + parent[direction] - 75
    // )
    // if(parent[direction] >= 75 * 3) {
    //     for (let j = 0; j < spaces.length; j += 2) {
    //         if(direction == 0) {
    //             spaces[j] = [parent[0], parent[1], randomDivide - parent[0], parent[3]];
    //             spaces[j + 1] = [randomDivide, parent[1], parent[2] - (randomDivide - parent[0]), parent[3]];
    //         } else {
    //             spaces[j] = [parent[0], parent[1], parent[2], randomDivide - parent[1]];
    //             spaces[j + 1] = [parent[0], randomDivide, parent[2], parent[3] - (randomDivide - parent[1])];
    //         }
    //     }
    //}
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
//test

divide()


for(i = 0; i < 5; i++) {
    let newSpaces = 0
    for(let j = 0; j < spaces.length; j++) {
        const parent = spaces[j]
        let direction = randomInt(0, 2);
        let randomDivide = randomInt(
        parent[direction] + 75,
        parent[direction + 2] + parent[direction] - 75
        )
        if(parent[direction + 2] < 3 * 75) {
            newSpaces.push([currentSpaces[0], currentSpaces[1], randomDivide - currentSpaces[0], currentSpaces[3]])
            newSpaces.push([randomDivide, currentSpaces[1], currentSpaces[2] + currentSpaces, currentSpaces[3]])
        }
    }
}