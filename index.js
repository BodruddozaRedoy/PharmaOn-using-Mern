// var createCounter = function (n) {
//   return function () {
//     return n++;
//   };
// };

// const counter = createCounter(10);
// counter(); // 10
// counter(); // 11
// counter(); // 12

// const closureFunction = (n) => {
//     return () => {
//         return console.log(n++);
//     }
// }

// const closure = closureFunction(10)
// closure() //10
// closure() //11
// closure() //12

// var createCounter = function (init) {
//   return {
//     increment: function () {
//       return ++init;
//     },
//     decrement: function () {
//       return --init;
//     },
//     reset: function () {
//       return init;
//     },
//   };
// };

// const counter = createCounter(5);
// console.log(counter.increment());
// console.log(counter.decrement());
// console.log(counter.reset());


// var map = function(arr, fn) {
//     let returnedArray = []
//     for(i=0; i<arr.length; i++){
//         //  fn(arr[i], i)
//         returnedArray.push(fn(arr[i], i))
//         // console.log(fn(arr[i], i));
        
//     }
//     return returnedArray
// };
// let arr = [1,2,3] 
// let fn = function plusone(n) { return n + 1; }
// let fn = function plusI(n, i) { return n + i; }
// let fn = function constant() { return 42; }
// console.log(map(arr, fn));
// map(arr, fn)
// console.log(fn(10, 2));



// const arr = [1, 2, 3, 4,5]
// for(i = 0; i<arr.length; i++){
//     return console.log(arr[i] + 1);
    
// }


var filter = function(arr, fn) {
    let filteredArr = []
    for(i = 0; i<arr.length; i++){
            filteredArr.push(fn(arr[i]))
    }
    return filteredArr
};

// let arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
// let arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
let arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }

console.log(filter(arr, fn));
