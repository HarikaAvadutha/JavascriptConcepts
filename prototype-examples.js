// Example-1
let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal;

// we can find both properties in rabbit now:
rabbit.eats; // true
rabbit.jumps; // true

// ============================================================================ //

// Example-2
let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit('Some Rabbit'); //  rabbit.__proto__ == animal

rabbit.eats; // true

// ============================================================================ //

// Example-3
function Test() {}

/* default prototype
Test.prototype = { constructor: Test };
*/

// ============================================================================ //

// Example-4
function Test() {}
Test.prototype = {
  some_prop: true,
};

let test = new Test();
test.constructor === Test; // false
/* So, to keep the right "constructor" we can choose to add/remove properties 
to the default "prototype" instead of overwriting it as a whole */

// ============================================================================ //

// Example-5
function Test() {}

// Not overwrite Test.prototype totally
// just add to it
Test.prototype.some_prop = true;
// the default Test.prototype.constructor is preserved
new Test().constructor === Test; // true

// ============================================================================ //

// Example-6
// Built in prototype of array
let arr = [1, 2, 3];

// it inherits from Array.prototype
arr.__proto__ === Array.prototype; // true

// then from Object.prototype
arr.__proto__.__proto__ === Object.prototype; // true

// and null on the top.
arr.__proto__.__proto__.__proto__; // null

// ============================================================================ //

// Example-7
// __proto__ is considered outdated so should use below prototype methods

let animal = {
  eats: true,
};

// create a new object with animal as a prototype
let dog = Object.create(animal);

dog.eats; // true

Object.getPrototypeOf(dog) === animal; // true

Object.setPrototypeOf(dog, {}); // change the prototype of dog to {}
