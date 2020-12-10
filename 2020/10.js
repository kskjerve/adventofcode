let jolts = require('fs').readFileSync('10-input.txt').toString().split('\n').filter(l => l.length > 0).map(l => Number.parseInt(l)).sort((a,b) => a - b)
jolts.unshift(0);

let one = 0, three = 1;
for (let i = 0; i < jolts.length - 1; i++) {
    if (jolts[i+1] - jolts[i] === 1) {
        one++;
    } else {
        three++;
    }
}
console.log("Day 10 part 1:", one * three);


function countPaths() {
    let paths = []

    for (let i = jolts.length - 1; i >= 0; i--)  {
        curr = jolts[i];

        let p = 0;
        for (let j = 1; j <= 3; j++) {
            if (i + j < jolts.length) {
                next = jolts[i+j];
                
                if ( next - curr <= 3) {
                    p += paths[i+j]
                }
            }
        }
        paths[i] = Math.max(1, p);
    }

    return paths[0];
}

console.log("Day 10 part 2:", countPaths());
