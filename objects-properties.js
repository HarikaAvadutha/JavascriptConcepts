/*
Property flags
Object properties, besides a value, have three special attributes (so-called “flags”):

writable – if true, the value can be changed, otherwise it’s read-only.
enumerable – if true, then listed in loops, otherwise not listed.
configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.
*/

const { get } = require('http');

let obj = {
  firstName: 'harika',
  lastName: 'Avadutha',
  fullName() {
    this.firstName + ' ' + this.lastName;
  },
};

let descriptor = Object.getOwnPropertyDescriptor(obj, firstName);

console.log(descriptor); // { configurable:true enumerable:true value:harika writable:true }

//============================================================================//

//To change the flags, we can use Object.defineProperty.

//If the property exists, defineProperty updates its flags.
//Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed false.

let user = {};

Object.defineProperty(user, 'name', {
  value: 'harika',
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(descriptor);
/* Output 
{
  "value": "harika",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

//============================================================================//

// to create new property with enumerable false

let obj = {
  firstName: 'harika',
  lastName: 'Avadutha',
  fullName() {
    this.firstName + ' ' + this.lastName;
  },
};

Object.defineProperty(obj, 'lastName', {
  enumerable: false,
});

for (let o in obj) console.log(o); // firstName fullName

for (let i of obj) console.log(i); // { obj is not iterable }

Object.keys(obj); //[ firstName,fullName ]

//============================================================================//

// to create new property with writable false
// With writable false you can just can't modify existing properties but can add new properties
//Now no one can change the value, unless they apply their own defineProperty to override ours.

let obj = {
  firstName: 'harika',
  lastName: 'Avadutha',
  fullName() {
    this.firstName + ' ' + this.lastName;
  },
};

Object.defineProperty(obj, 'lastName', {
  writable: false,
});

obj.lastName = 'Avad'; // Gives error only in strict mode, if its non-strict mode it doesn't throw error and doesn't update the value

console.log(obj.lastName); // Avadutha ( As it is in non-strict mode it didn't update the value)

obj.firstName = 'Harry'; // Only particular property can't be writable, we can modify other properties of the object

console.log(obj.firstName); // Harry

obj.newProp = 'new prop';

console.log(obj); //{ firstName:"harika" fullName: fullName() lastName:"Avadutha" newProp: "new prop"}

Object.defineProperty(obj, 'lastName', { value: 'updated_value' }); // though writable is false we can update the value through defineProperty

console.log(obj.lastName); // updated_value

//============================================================================//

// to create new property with configuarable false
//Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.

let obj = {
  firstName: 'harika',
  lastName: 'Avadutha',
  fullName() {
    this.firstName + ' ' + this.lastName;
  },
};

Object.defineProperty(obj, 'lastName', {
  value: 'Avad',
  configurable: false,
});

obj.lastName = 'last'; // can modify the existing value
obj.newProp = 'newProp'; // can add new property (Non-configurable doesn't mean not writable)

delete obj.lastName; // false - Can't delete objects if its non-configurable

//1
let user = {};

Object.defineProperty(user, 'name', {
  value: 'John',
  configurable: false,
});
Object.defineProperty(user, 'name', { value: 'Pete' }); //This will give error saying can't redefine

//2
let user = {
  name: 'test',
};
Object.defineProperty(user, 'name', {
  value: 'John',
  configurable: false,
});
Object.defineProperty(user, 'name', { value: 'Pete' }); // Whereas it updates correctly
console.log(user);

//============================================================================//
//Object.defineProperties

//There’s a method Object.defineProperties(obj, descriptors) that allows to define many properties at once.

let user = {};

Object.defineProperties(user, {
  firstName: { value: 'Harika', writable: false },
  lastName: { value: 'Avadutha', writable: false },
  // ...
});

//============================================================================//
//Object.getOwnPropertyDescriptors

//To get all property descriptors at once, we can use the method Object.getOwnPropertyDescriptors(obj).

/*
Together with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

Normally when we clone an object, we use an assignment to copy properties, like this:

for (let key in user) {
  clone[key] = user[key]
}

…But that does not copy flags. So if we want a “better” clone then Object.defineProperties is preferred.

Another difference is that for..in ignores symbolic properties, 
but Object.getOwnPropertyDescriptors returns all property descriptors including symbolic ones.
*/

//============================================================================//

/*
Property descriptors work at the level of individual properties.

There are also methods that limit access to the whole object:
*/
Object.preventExtensions(obj); //Forbids the addition of new properties to the object.
Object.seal(obj); //Forbids adding/removing of properties. Sets configurable: false for all existing properties.
Object.freeze(obj); //Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.
Object.isExtensible(obj); // Returns false if adding properties is forbidden, otherwise true.
Object.isSealed(obj); // Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
Object.isFrozen(obj); //Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.

//============================================================================//

/*
Property getters and setters:
There are two kinds of object properties. 1) data properties  (discussed above) 2)accesor properties
Accessor properties are represented by “getter” and “setter” methods. In an object literal they are denoted by get and set:
*/

let user = {
  name: 'harika',
  surname: 'avadutha',

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },
};
console.log(user.fullName); // harika avadutha  (note that it is not a function call but just the 'fullName' not 'fullName()')

user.fullName = 'Mickey Mouse';

console.log(user.name); // Mickey
console.log(user.surname); // Mouse

//Accessor descriptors

/*
That is, an accessor descriptor may have:

get – a function without arguments, that works when a property is read,
set – a function with one argument, that is called when the property is set,
enumerable – same as for data properties,
configurable – same as for data properties.
*/

let user = {
  name: 'Harika',
  surname: 'Avadutha',
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(' ');
  },
});

console.log(user.fullName); // Harika Avadutha

for (let key in user) console.log(key); // name, surname

// Note: property can be either an accessor (has get/set methods) or a data property (has a value), not both

// If it has both get and the value descriptor then it will throw an error

Object.getOwnPropertyDescriptor(user, 'fullName'); // { configurable:false, enumerable:false, get: get(), set: set(value)}

//============================================================================//
