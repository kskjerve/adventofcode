var fs = require('fs');
let list = fs.readFileSync('7-input.txt').toString().split('\n').filter(l => l.length > 0)

let rules = [];
list.forEach(r => {
    let regex = /^(\w+ \w+) bags contain/;
    let match = regex.exec(r);
    let rule = {
        color: match[1],
        contains: []
    };

    let children = r.split(' contain ')[1].replace('.', '').split(', ');
    children.forEach(c => {
        if (c !== 'no other bags') {
            let regex = /(\d+) (\w+ \w+) bag[s]?/;
            let match = regex.exec(c);
            rule.contains.push({
                count: match[1], 
                color: match[2]
            });
        }
    });

    rules.push(rule);
});

function canHold(color) {
    let colors = [];
    let outer = rules.filter(r => r.contains.some(c => c.color == color));
    outer.forEach(o => {
        // console.log(o);
        colors.push(o.color);
        colors = colors.concat(canHold(o.color));
    });
    return colors;
}

let colors = canHold('shiny gold');
let unique = colors.sort().filter(function(el,i,a){return i===a.indexOf(el)});

console.log("Day 7 part 1:", unique.length);


function contains(color) {
    let cRule = rules.find(r => r.color === color);

    let n = 0;
    cRule.contains.forEach(c => {
        n += c.count * (1 + contains(c.color));
    });
    return  n;
}

console.log("Day 7 part 2:", contains('shiny gold'));
