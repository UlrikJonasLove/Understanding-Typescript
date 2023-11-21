import _ from 'lodash';
import 'reflect-metadata'; // should be imported in a global file
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
declare var GLOBAL: any; // can use declare as a last resort, if the npm package does not have a @types
import { Product } from './product.modal';
console.log(_.shuffle([1, 2, 3, 4, 5, 6]));

console.log(GLOBAL);
const products = [{title: "A carpet", price: 29.99}, {title: "A book", price: 10.99}] // data from database
const p1 = new Product("A book", 12.99);
console.log(p1.getInformation());

// dont need any types when doing it like this and fetching data
// would not recommend this
const loadedProducts = products.map(prod => {
    return new Product(prod.title, prod.price);
})
for(const prod of loadedProducts) {
    console.log(prod.getInformation());
}

// instead we can use the classtransformers plainToClass method and reflect metadata npm packages
const loadedProductsTransformer = plainToClass(Product, products); // this will create an instance of the class
for(const prod of loadedProductsTransformer) {
    console.log(prod.getInformation());
}

const newProdError = new Product("", -19.99)
validate(newProdError).then(errors => {
    if(errors.length > 0) {
        console.error(errors); // will always cause errors cause the validation rules are not met
    } else {
        console.log(newProdError.getInformation());
    }
});
