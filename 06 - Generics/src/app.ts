// GENERICS
const names: Array<string> = [];
names[0].split(' '); // can use string methods

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!'); // this promise will resolve to a string
    }, 2000)
});

promise.then(data => {
    data.split(' '); // can use string methods because its a string
});

// CREATING A GENERIC FUNCTION
//extends create a constraint that the type has to be an object
function merge<T extends {}, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Ullis'}, {age: 30});
console.log(mergedObj.name); // this will work because we know that the object will have a name property

// creating a generic function where element is of type T
interface lengthy {
    length: number;
}
function countAndDesc<T extends lengthy>(element: T): [T, string] {
    let desc = 'Got no value';
    if(element.length > 0) {
        desc = `Got ${element.length} elements`;
    } else if(element.length == 1) {
        desc = `Got 1 element`;
    }
    return [element, desc]
}
console.log(countAndDesc('Hi there!'));
// should be any kind of object, should be any type of key in that object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

console.log(extractAndConvert({name: "Ullis"}, "name"));

// GENERIC CLASSES
// i can extend the T to only work with strings | numbers | boolean, etc
class DataStorage<T> {
    private data: T[] = [];
    
    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }

        this.data.splice(this.data.indexOf(item), 1); // if no found, will return -1
    }

    getItems() {
        return [...this.data];
    }
}

// wont work with objects because they are reference types
// if i want it to work with objects
// i have to create a new instance of the object
// let obj = {name:"Ullis"}; and this this where i want it
const textStorage = new DataStorage<string>();
textStorage.addItem("Ullis");
textStorage.addItem("Ullis2");
textStorage.removeItem("Ullis");
textStorage.getItems();

// GENERIC UTILITY TYPES
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date) {
    let courseGoal: Partial<CourseGoal> = {}; // tells typescript this is an object which in the end will be of type CourseGoal, but all properties are optional
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal; // this is a type cast
}

const names2: Readonly<string[]> = ['Ullis', 'Ullis2']; // this will make the array immutable
// names2.push('Ullis3'); // this will not work because its readonly

// GENERIC VS UNION TYPES
// union types are more flexible with each function call
// generics are more restrictive
// generics are more type safe
// generics make us have to chose one type depending on what we pass in <string>, <number> etc