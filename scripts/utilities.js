// loop through elements of an array and execute a callback for each element
var forEach = function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i]);
    }
};