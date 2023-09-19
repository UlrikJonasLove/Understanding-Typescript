function add(n1: number, n2: number): number { // this must return a number
    return n1 + n2;
}

function printResult(num: number): void { // this must return nothing
    console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, callback: (number) => void) { 
    const result = n1 + n2;
    callback(result);
} // returns the result from the callback function 

printResult(add(5, 12));

let combineValues: Function; // this is of type Function, but it can be any function
let combineValues2: (a: number, b: number) => number; // this is of type Function with two arguments of type number and returns a number, more specific
combineValues2 = add;
// combineValues2 = printResult; // this is not allowed because printResult does not return a number

console.log(combineValues2(8, 8 ));

addAndHandle(10, 20, (result) => {
    console.log(result);
})