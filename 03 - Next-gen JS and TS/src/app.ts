// VAR & CONST & LET
const userName = "ullis";
// userName = "ullis2"; // wont work because of const
let age = 30; // similar to var but with block scope
// var is global scope, not block scope, not recommended
age = 29;

var result; // not recommended
function add(a: number, b: number) {

  result = a + b;
  return result;
}

if(age > 20) {
    // now only available in this block, with let
    let isOld = true;
    console.log(isOld);
}

console.log(result); // undefined



// ARROW FUNCTIONS and DEFAULT FUNCTION PARAMETERS
const add2  = (a: number, b: number = 1) => a + b; // this is a function expression to always return, when only one line, b has a default value
// default values must be last in the parameter list

console.log(add2(2, 5));

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector("button");

if(button) {
    button.addEventListener("click", event => console.log(event));
}

printOutput(add2(2)); // when we have a default value, we can call it with only one parameter
printOutput(add2(2, 5)); // here we overwrite the default value with 5

// spread opperator (...) arrays
const hobbies = ["Sports", "Cooking"]; // arrays are objects, so they are reference types
const activeHobbies = ["Hiking", ...hobbies];

activeHobbies.push(...hobbies); // push is a method of the array object, we can use the spread operator to push all elements of the array into the other array

const person = {
    firstName: "Ullis",
    age: 30
};

const copiedPerson = {...person}; // this is a shallow copy, only the first level is copied, not the nested objects

// rest parameters
const add3 = (...numbers: number[]) => { 
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0); // 0 is the initial value
}// rest parameters are always arrays

const addedNumbers = add3(5, 10, 2, 3.7);
console.log(addedNumbers);

// array & object destructuring, pull items out of arrays or objects and store them in variables
const [hobby1, hobby2, ...remainingHobbies] = hobbies; // this is array destructuring, remainingHobbies is an array with the remaining elements
// destructering does not change the original array
console.log(hobby1, hobby2, remainingHobbies);

const {firstName: userName2, age: age2} = person; // this is object destructuring, we can rename the variables with the : operator
// destructering does not change the original object
console.log(userName2, age2);
