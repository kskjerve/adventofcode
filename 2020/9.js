var fs = require('fs');
let numbers = fs.readFileSync('9-input.txt').toString().split('\n').filter(l => l.length > 0).map(l => Number.parseInt(l));

const preambleLenght = 25;
const lookBack = 25;

function getSums(p) {
    let s = p - lookBack;

    let previous = [];

    for (let i = s; i < p; i++) {
        for (let j = s; j < p; j++) {
            if ( numbers[i] != numbers[j]) {
                previous.push(numbers[i] + numbers[j]);
            }
        }
    }
    return previous;
}

function getContSums(target) {
    for (let start = 0; start < 600; start++) {
        let sum = 0;
        let sums = []
        for (let i = start; i < 600; i++) {
            sum += numbers[i];
            sums.push(numbers[i]);
            if (sum == target) {
                let min = sums.reduce((p, n) => n < p ? n : p, sums[0]);
                let max = sums.reduce((p, n) => n > p ? n : p);
                return min + max;
            }

            if (sum > target) {
                break;
            }
        }
    }
    return -1;
}

let n;
for (let i = preambleLenght; i < numbers.length; i++) {
    n = numbers[i];
    let previous = getSums(i);
    if (!previous.find(p => p == n)) {
        break;
    }
}

console.log("Day 9 part 1:", n);
console.log("Day 9 part 2:", getContSums(n));
