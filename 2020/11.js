let mapData = require('fs').readFileSync('11-input.txt').toString().split('\n').filter(l => l.length > 0).map(l => l.split(''));

class Map {
    constructor(map) {
        this.map = map;
        this.x_max = map[0].length;
        this.y_max = map.length;

        this.seats = []

        for (let y = 0; y < this.y_max; y++) {
            for (let x = 0; x < this.x_max; x++) {
                let seat = map[y][x];
                if (seat === 'L') {
                    seat = new Seat(x, y);
                    this.seats.push(seat);
                } else {
                    seat = null
                }
                map[y][x] = seat;
            }
        }
    }

    getAdjSeats() {
        this.seats.forEach(seat => {
            let s;
            let adj = [];
            s = this.getSeat(seat.x-1, seat.y-1);
            if (s) adj.push(s);
            s = this.getSeat(seat.x+0, seat.y-1);
            if (s) adj.push(s);
            s = this.getSeat(seat.x+1, seat.y-1);
            if (s) adj.push(s);
            s = this.getSeat(seat.x-1, seat.y+0);
            if (s) adj.push(s);
            s = this.getSeat(seat.x+1, seat.y+0);
            if (s) adj.push(s);
            s = this.getSeat(seat.x-1, seat.y+1);
            if (s) adj.push(s);
            s = this.getSeat(seat.x+0, seat.y+1);
            if (s) adj.push(s);
            s = this.getSeat(seat.x+1, seat.y+1);
            if (s) adj.push(s);
            seat.setAdj(adj);
        });
    }

    getAdjSeats2() {
        let count = 0;
        this.seats.forEach(seat => {
            let s;
            let adj = [];
            s = this.getSeatStepped(seat.x, seat.y, -1, -1);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, +0, -1);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, +1, -1);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, -1, +0);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, +1, +0);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, -1, +1);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, +0, +1);
            if (s) adj.push(s);
            s = this.getSeatStepped(seat.x, seat.y, +1, +1);
            if (s) adj.push(s);
            seat.setAdj(adj)
        });
    }

    getSeat(x, y) {
        if (x >= 0 && x < this.x_max && y >= 0 && y < this.y_max)
            return this.map[y][x];
        else
            return null;
    }

    getSeatStepped(x, y, xstep, ystep) {
        do {
            x += xstep;
            y += ystep;

            let seat = this.getSeat(x, y);
            if (seat) {
                return seat;
            }

        } while (x >= 0 && x < this.x_max && y >= 0 && y < this.y_max);

        return null;
    }

    applyRules(tolerance) {
        let changes = 0;
        this.seats.forEach(s => s.applyRule(tolerance));
        this.seats.forEach(s => {
            if (s.commit()) {
                changes++;
            }
        });

        return changes;
    }

    getNumOccupied() {
        return this.seats.filter(s => s.isOccupied).length;
    }

    setAllOccupied() {
        this.seats.forEach(s => s.isOccupied = true);
    }

    applyUntilEquilibrium(tolerance) {
        let lastChanges, changes = -1;
        do {
            lastChanges = changes;
            changes = this.applyRules(tolerance);
        } while (changes != lastChanges);
    }
}

class Seat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isOccupied = true;
    }

    setAdj(adj) {
        this.adj = adj;
    }

    getNumOccupiedAdjSeats() {
        return this.adj.filter(a => a.isOccupied).length;
    }

    applyRule(tolerance) {
        this.isOccupied_next = this.isOccupied;
        this.hasChanged = false;

        if (this.isOccupied) {
            if (this.getNumOccupiedAdjSeats() >= tolerance) {
                this.isOccupied_next = false
                this.hasChanged = true;
            }
        } else {
            if (this.getNumOccupiedAdjSeats() === 0) {
                this.isOccupied_next = true;
                this.hasChanged = true;
            }
        }
    }

    commit() {
        this.isOccupied = this.isOccupied_next;
        return this.hasChanged;
    }
}

let map = new Map(mapData);

map.getAdjSeats();
map.applyUntilEquilibrium(4);
console.log("Day 11 part 1:", map.getNumOccupied());

map.setAllOccupied();

map.getAdjSeats2();
map.applyUntilEquilibrium(5);
console.log("Day 11 part 2:", map.getNumOccupied());
