let list = require('fs').readFileSync('5-input.txt').toString().split('\n').filter(l => l.length > 0).map(i => parseInt(i.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2)).sort();
console.log("Day 5 part 1:", list[list.length-1]);
console.log("Day 5 part 2:", list.reduce((last, i) => i === last + 1 ? i : last, list[0]-1) + 1);
