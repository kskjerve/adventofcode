const { performance } = require('perf_hooks');

let start_numbers = [0,14,6,20,1,4];

function playGame(numbers_spoken) {
    const start = performance.now();

    const history = new Uint32Array(numbers_spoken);

    for (let i = 0; i < start_numbers.length; i++) {
        history[start_numbers[i]] = i+1;
    }

    let last = start_numbers[start_numbers.length - 1];

    for (let i = start_numbers.length; i < numbers_spoken; i++) {
        let next;
        let last_time = history[last];
        if (last_time > 0) {
            next = i - last_time;
        } else {
            last_time = i;
            next = 0;
        }

        history[last] = i;
        last = next;
    }

    console.log(`Time for ${numbers_spoken} turns:`, (performance.now() - start).toFixed(1), "ms");

    return last;
}

console.log("Day 15 part 1:", playGame(2020));
console.log("Day 15 part 2:", playGame(30000000));
