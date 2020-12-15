let lines = require('fs').readFileSync('14-input.txt').toString().split('\n').filter(l => l.length > 0);
let instructions = lines.map(l => l.split(' = '));

let mask = ""
let mask_lo_0 = 0;
let mask_hi_0 = 0;
let mask_lo_1 = 0;
let mask_hi_1 = 0;

let mem = [];

instructions.forEach(i => {
    if (i[0].startsWith('mask')) {
        mask = i[1];
        let mask_hi = mask.substring(0, 18);
        let mask_lo = mask.substring(18);
        mask_lo_0 = Number.parseInt(mask_lo.replace(/X/g, '1'), 2);
        mask_hi_0 = Number.parseInt(mask_hi.replace(/X/g, '1'), 2);
        mask_lo_1 = Number.parseInt(mask_lo.replace(/X/g, '0'), 2);
        mask_hi_1 = Number.parseInt(mask_hi.replace(/X/g, '0'), 2);
    } else {
        let regex = /mem\[(\d+)\]/;
        let match = regex.exec(i[0]);
        let address = Number.parseInt(match[1]);
        let value = Number.parseInt(i[1]).toString(2).padStart(36, '0');

        let new_value_hi = Number.parseInt(value.substring(0, 18), 2) & mask_hi_0 | mask_hi_1;
        let new_value_lo = Number.parseInt(value.substring(18),    2) & mask_lo_0 | mask_lo_1;
        let new_value = Number.parseInt(new_value_hi.toString(2).padStart(18, '0') + new_value_lo.toString(2).padStart(18, '0'), 2);

        mem[address] = new_value;
    }
});

let sum = 0;
mem.forEach(m => sum += m);
console.log("Day 14 part 1:", sum);


mem = [];
mask = 0;
instructions.forEach(i => {
    if (i[0].startsWith('mask')) {
        mask = i[1];
    } else {
        let regex = /mem\[(\d+)\]/;
        let match = regex.exec(i[0]);
        let address = Number.parseInt(match[1]).toString(2).padStart(36, '0');
        let value = Number.parseInt(i[1]);
        
        let new_address = '';
        for (let n = 0; n < 36; n++) {
            if (mask[n] == '1') {
                new_address += '1';
            } else {
                new_address += address[n];
            }
        }
        
        let num_x = mask.split('X').length - 1;
        for (let m = 0; m < Math.pow(2, num_x); m++) {
            let x = 0;
            let new_address_mutation = '';
            for (let n = 0; n < 36; n++) {
                if (mask[n] == 'X') {
                    let bit = m & (1 << x);
                    new_address_mutation += bit > 0 ? '1' : '0';
                    x++;
                } else {
                    new_address_mutation += new_address[n];
                }
            }
            
            let a = Number.parseInt(new_address_mutation, 2);
            existing = mem.find(p => p[0] == a);
            if (existing) {
                existing[1] = value;
            } else {
                mem.push([a, value]);
            }
        }
    }
});

sum = 0;
mem.forEach(m => sum += m[1]);
console.log("Day 14 part 2:", sum);
