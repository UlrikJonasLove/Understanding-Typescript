 /* 
    Decorators in TypeScript are special functions that can be attached to classes, methods, accessors, properties, or parameters. 
    They offer a way to add custom behavior or metadata to these elements, 
    enhancing their functionality without altering the original code structure. 
    Decorators provide a declarative approach to modifying or extending the behavior of various elements in object-oriented programming. 
 */
 
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

// PROPERTY DECORATORS - Property decorators in TypeScript are functions used to modify or annotate the properties of a class.
function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}

// ACCESSOR DECORATORS - An accessor decorator in TypeScript is a special kind of declaration that can be attached to a class accessor 
// (getter or setter) to modify its behavior or annotate it with metadata.
function Log2(target: any, name: string, descriptor: TypedPropertyDescriptor<number>) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// METHOD DECORATORS - Method decorators in TypeScript are functions that are used to observe, modify, 
// or replace a method definition in a class, allowing for custom behavior or metadata annotation on that method.
function Log3(target: any, name: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// PARAMETER DECORATORS - A parameter decorator in TypeScript is a function that can be applied to the parameters of a class constructor or method, 
// allowing for additional behaviors or metadata to be associated with those parameters.
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

const p1 = new product("book", 10);
const p2 = new product("book2", 20);

// this Autobind will bind the this keyword to the object that the method is attached to
function Autobind() {
    return function(_: any, _2: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;
        const adjDescriptor: TypedPropertyDescriptor<any> = {
            configurable: true,
            enumerable: false,
            get() {
                const boundFn = originalMethod.bind(this); // this is the object that the getter is attached to
                return boundFn;
            }
        };
        return adjDescriptor;
    }
}

class Printer {
    message = "This works!";

    @Autobind()
    showMessage() {
        console.log(this.message);
    }
}
const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);