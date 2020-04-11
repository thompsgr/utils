
// counter object - approximates use of associative arrays for counting in php 
function counter(desc) {

    // default to dense array
    var p_sparse = false;

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
            // override sparse if new item is not a number
            if (p_sparse && isNaN(item)) {
                p_sparse =  false;
            }
        }
        return obj[item];
    }

    function sparse(bool) {
        if (bool) {
            p_sparse = bool;
        }
    }

    // array of counter items in sorted order
    function items() {
        let items = [];
        if (p_sparse) {
            // first determine max column
            var columns = Object.keys(obj);
            if (columns.length > 0) {
                var max = columns.sort(function(a, b) { return b - a })[0];
                // initialize sparase array from 0 to max - 1
                for (var i = 0; i <= max; i++) {
                    items.push({item: i, count: 0});
                }
                var ii;
                columns.forEach(function(v, i) {
                    ii = parseInt(v);
                    items[ii] = { item: v, count: obj[v] };
                });
            }
        }
        else {
            // sort items alphabetically
            Object.keys(obj)
                  .sort()
                  .forEach(function(v, i) {
                      items.push({ item: v, count: obj[v]});
                  });
        }
        return items;
    }

    // print items to console
    function log() {
        let s = `${desc}: \n`;
        var columns = Object.keys(obj);
        if (columns.length > 0) {
            var longest = columns.reduce(function(a, b) { return a.length > b.length ? a : b });
            var pad_length = longest.length + 3;
            items().forEach(function(v, i) {
                s += `${v.item.padEnd(pad_length,'.')}: ${v.count} \n`;
            });
        }
        return s;
    }
    return {
        sparse: sparse,
        increment: increment,
        items: items,
        log: log
    }
}
module.exports.counter = counter;
