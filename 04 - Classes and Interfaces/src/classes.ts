abstract class Department { // since this now is an abstract class, it cannot be instantiated directly, only inherited from
    // statics are properties that are not accessed on the instance of the class but on the class itself
    static fiscalYear = 2023; // can be used in derived classes
    // private id: string;
    // private name: string; // public by default, accessible from the outside to add or change
    protected employees: string[] = []; // private, only accessible from inside the class it is defined in
    // so we can change it to protected to make it accessible from derived classes

    // shortcut to create properties instead of above
    // readonly is a TS feature, not JS, it means that the property can only be set once during initialization
    constructor(protected readonly id: string, public name: string) {
        // this.name = n;
        console.log(Department.fiscalYear); // can access static properties from inside the class like this
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void; // abstract method, must be implemented in derived classes

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT'); // calls the constructor of the base class, must be first line
        // add other stuff here
    }

    describe() {
        console.log("IT Department - ID: " + this.id)
    }
}

const employee1 = Department.createEmployee('Ullis'); // no need to use new keyword because it is a static method
console.log(employee1, Department.fiscalYear); // can access static properties from outside the class

const it = new ITDepartment('d1', ['Ullis']);

it.describe();

// now this must be used 
it.addEmployee('Ullis1');
it.addEmployee('Ullis2');

// not recommended to do this
// it.employees[2] = 'Ullis3'; // can no longer do this because employees is private

it.describe();
it.printEmployeeInformation();

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment; // singleton pattern, only one instance of this class can exist

    // getter, can be used to access private properties from outside the class
    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
     }

     // setter, can be used to change private properties from outside the class
     set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
     }

     // private constructor means we cant create new instances of this class from outside the class
    private constructor(id: string, public reports: string[]) {
        super(id, 'Accounting'); // calls the constructor of the base class, must be first line
        // add other stuff here
        this.lastReport = reports[0];
    }

    static getInstance() { 
        if(this.instance) {
            return this.instance;
        }
        // this can only run once
        this.instance = new AccountingDepartment('d2', []); // can use new inside the class
        return this.instance;
    }
    // overriding the base class method to do something different
    describe() {
        console.log("Accounting Department - ID: " + this.id)
    }

    addEmployee(name: string): void { // override the base class method with own implementation
        if(name === 'Ullis') {
            return;
        }
        this.employees.push(name); // access the protected property from the base class with protected because this extends the base class
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    getReports() { 
        console.log(this.reports);
    }
}

// const accounting = new AccountingDepartment('d2', []); // after making the accountingDepartment constructor private, this is no longer possible
// instead we do it like this
const accounting = AccountingDepartment.getInstance(); // this is the only way to create an instance of this class, and we can only make one instance because of the singleton pattern
accounting.mostRecentReport = 'Year End Report'; // used with setter, access like a property, not a method
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport); // used with getter, access like a property, not a method
accounting.addEmployee('Ullis'); // not work
accounting.addEmployee('Ullis2'); // works
accounting.getReports();
accounting.describe();