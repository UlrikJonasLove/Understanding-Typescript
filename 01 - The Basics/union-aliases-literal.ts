// Union types and literal types, and aliases / custom types
type Combinable = number | string; // custom union type
type ConversionDescriptor = "as-number" | "as-text"; // custom literal type
function combine(input1: Combinable, 
    input2: Combinable, 
    resultConversion: ConversionDescriptor) { // resultConversion is a literal type, only allow these two values
    let result;
    if(typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
        result = +input1 + +input2; // + converts to number
    } else {
        result = input1.toString() + input2.toString();
    }
    // if(resultConversion === "as-number") {
    //     return +result
    // } else {
    //     return result.toString();
    // }
}

const combinedAges = combine(30, 25, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "25", "as-number");
console.log(combinedStringAges)

const combinedNames = combine("Ulrik", "Jonas", "as-text");
console.log(combinedNames)