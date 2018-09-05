
// counter object - approximates use of associative arrays for counting in php 
function counter(desc) {

    // must have description
    if (desc === undefined) {
        return -1;
    }

    // use javascript object properties to track items
    let obj = {};

    // increment counter for an item
    function increment(item) {
        if (obj.hasOwnProperty(item)) {
            obj[item] += 1;
        } else {
            obj[item] = 1;
        }
        return obj[item];
    }

    // array of counter items in sorted order
    function items() {
        // sort items alphabetically
        let items = [];
        Object.keys(obj)
              .sort()
              .forEach(function(v, i) {
                  items.push({ item: v, count: obj[v]});
              });
        return items;
    }

    // print items to console
    function log() {
        let s = `${desc}: \n`;
        items().forEach(function(v, i) {
            s += `${v.item}: ${v.count} \n`;
        });
        return s;
    }
    return {
        increment: increment,
        items: items,
        log: log
    }
}
module.exports.counter = counter;
