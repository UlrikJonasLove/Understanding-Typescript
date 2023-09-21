const button = document.querySelector('button')!; // need this ! to tell TS that button will never be null ( "strictNullChecks": true ) 
const userId = "abc"; // this is allowed because its a global variable
// this would allow us to remove the ! from button, but more code
if(button) {
    button.addEventListener('click', () => {
        console.log('Clicked!');
    });
}

function clickHandler(message: string, age: number) { // this will cause a warning ( "noUnusedParameters": true ), because age is not used
    let userName = "Ulrik"; // this will cause a warning ( "noUnusedLocals": true ), because userName is not used
    console.log('Clicked! ' + message);
}

button.addEventListener('click', clickHandler.bind(null, "You're welcome!", 5))

function add(n1: number, n2: number) {
    if(n1 + n2 > 0) {
        return n1 + n2;
    }
    return; // this is needed, would cause a warning otherwise, ( "noImplicitReturns": true,  ), must return something
}