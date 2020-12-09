var fs = require('fs');
let passwords = fs.readFileSync('2-input.txt').toString().split('\n');

let numOk = 0;

passwords.forEach(p => {
    p = p.trim();
    if (p.length > 0) {
        let pp = p.split(': ');
        let rule = pp[0].split(' ');
        let password = pp[1];
        let bounds = rule[0].split('-');
        let letter = rule[1];
        let splits = password.split(letter);
        let letterCount = splits.length-1;
        let ok = letterCount >= bounds[0] && letterCount <= bounds[1];
        if (ok) {
            numOk++;
        }
        // console.log(bounds[0], bounds[1], letter, password, letterCount,  ok ? 'OK' : 'Not OK');
    }
});

console.log('Day 2 part 1:', numOk);


// Part 2
numOk = 0;
passwords.forEach(p => {
    p = p.trim();
    if (p.length > 0) {
        let pp = p.split(': ');
        let rule = pp[0].split(' ');
        let password = pp[1];
        let index = rule[0].split('-');
        let letter = rule[1];
        
        let hits = 0;
        if (password[index[0]-1] == letter)
        hits++;
        
        if (password[index[1]-1] == letter)
        hits++;
        
        if (hits === 1) {
            numOk++;
        }
        // console.log(index[0], index[1], letter, password, hits === 1 ? 'OK' : 'Not OK');
    }
});

console.log('Day 2 part 2:', numOk);