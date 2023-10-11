type AddFn = (a: number, b: number) => number; // custom function type
interface AddFn2 {
    // anonymous function
    (a: number, b: number): number; // interface as function type
}
let add: AddFn;
let add2: AddFn2;

add = (n1: number, n2: number) => { 
    return n1 + n2;
}

add2 = (n1: number, n2: number) => {
    return n1 + n2;
}
interface Named {
    readonly name?: string; // cant change after initialization
    outputName?: string; // optional property
}

// interfaces is useful if we want to force a class to have a certain structure
interface Greetable extends Named { // can extend multiple interfaces
    greet(phrase: string): void;
} // interfaces are clearer than custom types, interfaces can be implemented by classes
// interface is a structure that defines the contract in your application, it defines the syntax that any entity must adhere to

class Person implements Greetable { // now we tell TS that Person implements Greetable and need to use the methods and properties from the interface
    name?: string; // optional property
    age = 30;
    constructor(n?: string) {
        if(n) {
            this.name = n;
        }
    }

    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);
    }
}
let user1: Greetable;

user1 = new Person('Ullis'); // we need to add the name property because it is required by the interface unless we make it optional
// user1.name = "name"; // cant do this because it is readonly

user1.greet('Hi there, I am');