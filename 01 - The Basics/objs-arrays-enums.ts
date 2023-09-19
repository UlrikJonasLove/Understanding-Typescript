// const person: {
//     name: string;
//     age: number;
// } = {
const person1Object: {
    name: string;
    age: number;
    hobbies: string[],
    role: [number, string] // tuple type
} = {
    name: "Ulrik", // string type
    age: 30, // number type
    hobbies: ["Cooking", "Eating"], // array of string types
    role: [2, "author"] // tuples type/union type
};

// person.role.push("Admin"); // push is allowed in tuple
// person.role[1] = 10; // changing the second to number of 10, is not allowed second element must be string
person1Object.role = [0, "admin"] // allowed

let favoriteActivities: string[];
favoriteActivities = ["cooking"];

console.log(person1Object)

for(const hobby of person1Object.hobbies) {
    console.log(hobby.toUpperCase())
}

enum Role { ADMIN = 1, READ_ONLY, AUTHOR };

const person2Enum = {
    name: "Ulrik", // string type
    age: 30, // number type
    hobbies: ["Cooking", "Eating"], // array of string types
    role: Role.ADMIN
};

if(person2Enum.role === Role.ADMIN) console.log("is Admin")