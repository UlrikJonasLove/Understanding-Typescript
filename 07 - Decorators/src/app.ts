 // working with decorator factories
 // decorator mostly used uppercase
function Logger(logString: string) { // this is a decorator factory 
    return function(constructor: Function) { //this is the actual decorator function
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) { // the _ means we don't care about the argument
        return class extends originalConstructor { // this is a decorator that returns a class
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                if(hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    }
}

// they will be executed bottom up
// @ is a identifier for a decorator
@Logger("LOGGING - PERSON") // decorators execute when class is defined, not when instantiated
@WithTemplate("<h1>My person object</h1>", "app")
class Person {
    name = "Ullis";

    constructor() {
        console.log("Creating person object...");
    }
}

const pers = new Person();
console.log(pers.name);

// PROPERTY DECORATORS
function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: TypedPropertyDescriptor<number>) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}

class product {
    @Log // adding the decorator to the property
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if(val > 0) {
            this._price = val;
        } else {
            throw new Error("Invalid price - should be positive!");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}