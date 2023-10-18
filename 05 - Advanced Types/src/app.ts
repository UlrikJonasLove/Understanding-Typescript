// INTERSECTION TYPES
type Admin = { // creates a new type called Admin
    name: string;
    privileges: string[];
};
type Employee = { // creates a new type called Employee
    name: string;
    startDate: Date;
};
type ElevatedEmployee = Admin & Employee; // creates a new type called ElevatedEmployee which is a combination of Admin and Employee
// intersection type
const e1: ElevatedEmployee = {
    name: "Ullis",
    privileges: ["create-server"],
    startDate: new Date()
}

// Intersaction can be used with any type
type Combineable = string | number; // creates a new union type
type Numeric = number | boolean; // creates a new union type
type Universal = Combineable & Numeric; // creates a new intersection type

// TYPE GUARDS - check if types exist before using them
function add(a: Combineable, b: Combineable) {
    if(typeof a === 'string' || typeof b === 'string') { // this is called a type-guard
        // need to check if a or b is a string before using the + operator
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin; // creates a new union type
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if('privileges' in emp) { // this is another type-guard for our custom types
        console.log('Privileges: ' + emp.privileges);
    }
    // if('startdate' in emp) { // this is another type-guard for our custom types
    //     console.log('Start date: ' + emp.startDate);
    // }
}

printEmployeeInformation(e1);

class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount: number) {
        console.log("loading cardo... " + amount);
    }
}

type Vehicle = Car | Truck; // creates a new union type
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if(vehicle instanceof Truck) { // this is another type-guard for our classes, only works with classes
        vehicle.loadCargo(1000);
    }
}

// DISCRIMINATED UNIONS TYPES
interface Bird {
    type: 'bird'; // this is a literal type
    flyingSpeed: number;
}
interface Horse {
    type: 'horse'; // this is a literal type
    runningSpeed: number;
 }
 type Animal = Bird | Horse; // creates a new union type
 function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
         case 'bird':
            speed = animal.flyingSpeed;
             break;
         case 'horse':
            speed = animal.runningSpeed;
             break;
    }

    console.log('Moving with speed: ' + speed);
 }
 moveAnimal({type: "bird", flyingSpeed: 15})
 moveAnimal({type: "horse", runningSpeed: 50})

 // Two ways of type-casting
 const paragraph = <HTMLParagraphElement>document.getElementById('message-output'); // TYPE CASTING to HTMLParagraphElement
 const userInput = document.getElementById('user-input') as HTMLInputElement; // TYPE CASTING to HTMLInputElement

 userInput.value = 'Hi there!'; // this is a string type

// INDEX PROPERTIES
interface ErrorContainer {
    [prop: string]: string; // this is an index property
}

const errorBad: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a capital character'
};

// FUNCTION OVERLOADS
// merges togheter and combines methods
function addFunc(a: number, b: number): number; // this is a function overload for numbers
function addFunc(a: string, b: string): string; // this is a function overload for strings
function addFunc(a: Combineable, b: Combineable) {
    if(typeof a === 'string' || typeof b === 'string') { 
        return a.toString() + b.toString();
    }
    return a + b;
} 

const result = addFunc("Ullis", " Ullis");
result.split(' '); // this is a string method
const result2 = addFunc(1, 1);

// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    name: 'Ullis',
    job: { title: 'CEO', description: 'My own company' } // lets say it does not exist
};

console.log(fetchedUserData?.job?.title); // then we can add ? to check if it exists, optional chaining

// NULLISH COALESCING
const userInput2 = null; // null

// we use ?? to check if userInput2 is null or undefined, which is nullish coalescing
const storedData = userInput2 ?? 'DEFAULT'; // if userInput2 is null or undefined then use 'DEFAULT'
console.log(storedData); // prints DEFAULT
