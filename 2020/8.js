var fs = require('fs');
let lines = fs.readFileSync('8-input.txt').toString().split('\n').filter(l => l.length > 0)

let instructions = lines.map(l => {
    let parts = l.split(' ');
    return { opcode: parts[0], arg: Number.parseInt(parts[1]), hit: 0 };
});



let pc = 0;
let a = 0;

function execute() {
    let instr = instructions[pc];

    if (instr.hit > 0) {
        console.log("Day 8 part 1:", a);
        return false;
    }

    switch (instr.opcode) {
        case 'acc':
            a += instr.arg;
            pc++;
            break;

        case 'jmp':
            pc += instr.arg;
            break;
    
        default:
            pc++
            break;
    }

    instr.hit++;
    return true;
}

while(execute());




function execute2() {
    let instr = instructions[pc];

    if (instr.hit > 0) {
        return 1;
    }

    switch (instr.opcode) {
        case 'acc':
            a += instr.arg;
            pc++;
            break;

        case 'jmp':
            pc += instr.arg;
            break;
    
        default:
            pc++
            break;
    }

    instr.hit++;

    if (pc === instructions.length) {
        return 2;
    }

    return 0;
}


function testProgram() {
    pc = 0;
    a = 0;

    instructions.forEach(i => {
        i.hit = 0;
    });

    let result = 0;
    do {
        result = execute2();
    } while (result === 0);

    if (result === 2) {
        console.log("Day 8 part 2:", a);
        return true;
    } else {
        return false;
    }
}


for (let i = 0; i < instructions.length; i++) {
    let result;
    instr = instructions[i];
    if (instr.opcode === 'nop') {
        instr.opcode = 'jmp';
        result = testProgram();
        instr.opcode = 'nop';
    } 

    if (result) {
        console.log("PC", i);
        break;
    }
    
    
    if (instr.opcode === 'jmp') {
        instr.opcode = 'nop';
        result = testProgram();
        instr.opcode = 'jmp';
    }
    
    if (result) {
        console.log("PC", i);
        break;
    }
}
