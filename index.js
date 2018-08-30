
// counter object - approximates use of associative arrays for counting in php 
function counter(desc) {

    // use javascript object properties to track items
    let obj = {};

    function increment(item) {
        if (obj.hasOwnProperty(item)) {
            obj[item] += 1;
        } else {
            obj[item] = 1;
        }
    }

    function log() {
        console.log(`${desc}:`);
        // sort items alphabetically, then print out
        Object.keys(obj)
              .sort()
              .forEach(function(v, i) {
                  console.log(`${v}: ${obj[v]}`);
              });
    }
    return {
        increment: increment,
        log: log
    }
}
module.exports.counter = counter;
