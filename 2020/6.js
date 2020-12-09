var fs = require('fs');
let lines = fs.readFileSync('6-input.txt').toString().split('\n');

let groups = [];
let group = [];
lines.forEach(l => {
    if (l.length > 0) {
        group.push(l);
    } else {
        groups.push(group);
        group = []
    }
});

function countGroup(g) {
    return g.reduce((last, curr) => last + curr).split('').sort().filter((el,i,a) => i == a.indexOf(el)).length;
}

function allInGroup(g) {
    let persons = g.length;
    let str = g.reduce((last, curr) => last + curr).split('').sort().join('');
    let count = 0;
    let letter = '';
    let letters = 0;
    str.split('').forEach(l => {
        if (l !== letter) {
            letter = l;
            if (letters === persons)
                count++;
            letters = 0;
        }
        letters++;
    })
    if (letters === persons) {
        count++;
    }
    return count;
}

console.log("Day 6 part 1:", groups.reduce((last, g) => last + countGroup(g), 0));
console.log("Day 6 part 2:", groups.reduce((last, g) => last + allInGroup(g), 0));
