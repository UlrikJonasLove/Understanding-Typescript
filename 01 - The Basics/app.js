// unknown is a better choice than any, because it is more restrictive than any
var userInput; // this is more restrictive than any, because you can't assign a variable of type unknown to a variable of type string
var userName;
userInput = 5;
userInput = "Ulrik";
// userName = userInput; // this is not allowed because userInput is of type unknown, would work if userInput was of type any
// first we need to check if userInput is of type string
if (typeof userInput === "string")
    userName = userInput; // now it works
// never is a better choice than void, because it is more restrictive than void for these cases
function generateError(message, code) {
    throw { message: message, errorCode: code }; // never produces a value, it never finishes, it crashes the script
    // while(true) {} // this is also of type never
}
generateError("An error occurred!", 500);
