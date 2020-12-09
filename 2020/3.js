var fs = require('fs');
let map = fs.readFileSync('3-input.txt').toString().split('\n');
let w = map[0].length;

function calculateSlope(right, down) {
    let x = 0;
    let trees = 0;
    for (let y = down; y < map.length; y += down) {
        x = x + right;
        if (map[y].length > 0) {
            if (map[y][x % w] === '#') {
                trees++;
            }
        }
    }

    return trees;
}

console.log("Day 3 part 1:", calculateSlope(3, 1));

let slopes = [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}];
let result = slopes.reduce((acc, slope) => acc * calculateSlope(slope.x, slope.y), 1);
console.log("Day 3 part 2:", result);
