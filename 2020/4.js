var fs = require('fs');
let batch = fs.readFileSync('4-input.txt').toString().split('\n');

let passports = [];
let chunk = '';
batch.forEach(l => {
    if (l.trim().length > 0) {
        chunk += ' ' + l.trim();
    } else {
        passports.push(chunk.trim());
        chunk = ''
    }
});


let req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']; //, 'cid'];

function validatePassport(p) {
    // console.log(p);
    let fields = p.split(' ').map(f => f.split(':'));
    if (!req.every(r => fields.some(f => f[0] === r)))
        return false;

    if (!checkYear(fields, 'byr', 1920, 2002)) return false;
    if (!checkYear(fields, 'iyr', 2010, 2020)) return false;
    if (!checkYear(fields, 'eyr', 2020, 2030)) return false;
    if (!checkHeight(fields)) return false;
    if (!checkHair(fields)) return false;
    if (!checkEye(fields)) return false;
    if (!checkPID(fields)) return false;

    return true;
}

function checkYear(p, field, from, to) {
    let n = Number.parseInt(p.find(f => f[0] === field)[1]);
    return n >= from && n <= to;
}

function checkHeight(p) {
    let strHeight = p.find(f => f[0] === 'hgt')[1];
    if (strHeight.endsWith('cm')) {
        let h = Number.parseInt(strHeight.replace('cm', ''));
        return h >= 150 && h <= 193;    
    }
    if (strHeight.endsWith('in')) {
        let h = Number.parseInt(strHeight.replace('in', ''));
        return h >= 56 && h <= 76;    
    }
}

function checkHair(p) {
    let strColor = p.find(f => f[0] === 'hcl')[1];
    let match = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(strColor);
    return match;
}

function checkEye(p) {
    let strColor = p.find(f => f[0] === 'ecl')[1];
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(c => strColor === c);
}

function checkPID(p) {
    let strColor = p.find(f => f[0] === 'pid')[1];
    let match = /^([0-9]{9})$/.test(strColor);
    return match;
}

let valids = passports.reduce((total, p) => total + (validatePassport(p) ? 1 : 0), 0);


console.log("Day 4 part 2:", valids);

// let slopes = [{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}];
// let result = slopes.reduce((acc, slope) => acc * calculateSlope(slope.x, slope.y), 1);
// console.log("Day 3 part 2:", result);
