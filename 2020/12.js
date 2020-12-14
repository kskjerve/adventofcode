let commands = require('fs').readFileSync('12-input.txt').toString().split('\n').filter(l => l.length > 0).map(l => { 
    return { cmd: l.substr(0, 1), val: Number.parseInt(l.substr(1)) };
});

function normalizeHeading(heading) {
    heading = heading % 360;
    return heading < 0 ? heading + 360 : heading;
}

class FerryNav1 {
    constructor() {
        this.heading = 90;
        this.ns = 0;
        this.ew = 0;
    }

    execute(command) {
        let heading = 0;
        switch (command.cmd) {
            case 'N':
                this.ns += command.val;
                break;
            case 'S':
                this.ns -= command.val;
                break;
            case 'E':
                this.ew += command.val;
                break;
            case 'W':
                this.ew -= command.val;
                break;
            case 'L':
                this.heading = normalizeHeading(this.heading - command.val);
                break;
            case 'R':
                this.heading = normalizeHeading(this.heading + command.val);
                break;
            case 'F':
                switch (this.heading) {
                    case 0:
                        this.ns += command.val;
                        break;
                    case 90:
                        this.ew += command.val;
                        break;
                    case 180:
                        this.ns -= command.val;
                        break;
                    case 270:
                        this.ew -= command.val;
                        break;
                }
        }
    }
}

class FerryNav2 {
    constructor() {
        this.ns = 0;
        this.ew = 0;
        this.wp_ns = 1;
        this.wp_ew = 10;
    }
    execute(command) {
        let rotation = command.val;
        
        switch (command.cmd) {
            case 'N':
                this.wp_ns += command.val;
                break;
            case 'S':
                this.wp_ns -= command.val;
                break;
            case 'E':
                this.wp_ew += command.val;
                break;
            case 'W':
                this.wp_ew -= command.val;
                break;
            case 'L':
                rotation = normalizeHeading(-command.val)
            case 'R':
                let ew = 0, ns = 0;
                switch (rotation) {
                    case 90:
                        ew = this.wp_ns;
                        ns = -this.wp_ew;
                        break;
                    case 270:
                        ew = -this.wp_ns;
                        ns = this.wp_ew;
                        break;
                    case 180:
                        ew = -this.wp_ew;
                        ns = -this.wp_ns;
                        break;
                }

                this.wp_ns = ns;
                this.wp_ew = ew;
                break;

                case 'F':
                    this.ns += this.wp_ns*command.val;
                    this.ew += this.wp_ew*command.val;
                break;
        }
    }
}

let ferry = new FerryNav1();
commands.forEach(c => ferry.execute(c));
console.log("Day 12 part 1:", Math.abs(ferry.ns) + Math.abs(ferry.ew));

ferry = new FerryNav2();
commands.forEach(c => ferry.execute(c));
console.log("Day 12 part 2:", Math.abs(ferry.ns) + Math.abs(ferry.ew));

