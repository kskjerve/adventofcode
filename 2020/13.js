let lines = require('fs').readFileSync('13-input.txt').toString().split('\n');
let start = Number.parseInt(lines[0]);
let schedule = lines[1].split(',');

let best_match = schedule.filter(s => s != 'x').map(s => { return {id: s, departs: (Math.floor(start / s) + 1)*s} })
    .reduce((min, s) => s.departs < min.departs ? s : min, { departs: Number.MAX_SAFE_INTEGER});

console.log("Day 13 part 1:", (best_match.departs - start) * best_match.id);


let routes = schedule.map((id, offset) => ({ id: Number.parseInt(id), offset })).filter(s => Number.isSafeInteger(s.id));

function check(t, i) {
    if (i == routes.length) {
        return -1;
    }

    let r = routes[i];
    if ((t + r.offset) % r.id == 0) {
        return check(t, i+1);
    } else {
        return i;
    }
}

for (let t = 1, max_i = 0, period = 1; ; t += period) {
    let i = check(t, 0);

    if (i == -1) {
        console.log("Day 13 part 2:", t);
        break;
    }

    if (i > max_i) {
        period = period * routes[i-1].id;
        max_i = i;
    }
}
