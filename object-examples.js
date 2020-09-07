//objects are used to store keyed collections of various data

let user = new Object(); // "object constructor" syntax
let user = {}; // "object literal" syntax

let user = {
  // an object
  name: 'Harika', // by key "name" store value "Harika"
  age: 21, // by key "age" store value 21
};

//To remove a property, we can use delete operator:
delete user.name;

//We can also use multiword property names, but then they must be quoted:

let user = {
  name: 'Harika',
  age: 21,
  'likes animals': true, // multiword property name must be quoted
};

//Object with const can be changed

const user = {
  name: 'Harika',
};
user.name = 'Avadutha';

console.log(user.name); // Avadutha

//For multiword properties, the dot access doesn’t work:

// user.likes birds //will throw an error

// There’s an alternative “square bracket notation” that works with any string:

user['likes birds']; //true

// We can use square brackets in an object literal, when creating an object. That’s called computed properties.

let fruit = prompt('Which fruit to buy?', 'apple');

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

console.log(bag.apple); // 5

//A variable cannot have a name equal to one of language-reserved words like “for”, “let”, “return” etc.
//But for an object property, there’s no such restriction

//============================================================================//

//One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

// Primitive values: strings, numbers, booleans – are assigned/copied “as a whole value”.

let user = { name: 'Harika' };

let admin = user; // copy the reference

admin.name = 'Avadutha'; // changed by the "admin" reference

console.log(user.name); // 'Avadutha', changes are seen from the "user" reference

// The equality == and strict equality === operators for objects work exactly the same.
// Two objects are equal only if they are the same object.

let a = {};
let b = a; // copy the reference

console.log(a == b); // true, both variables reference the same object
console.log(a === b); // true

//============================================================================//

// Cloning and merging, Object.assign

let user = {
  name: 'Harika',
  age: 21,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = 'Avadutha'; // changed the data in it

console.log(user.name); // still Harika in the original object

//Also we can use the method Object.assign for that.

// Syntax: Object.assign(dest, [src1, src2, src3...])

let user = { name: 'Harika' };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

//now user = { name: "Harika", canView: true, canEdit: true }

// let clone = Object.assign({}, user);

//If the copied propert already exists, it gets overwritten

//Nested cloning

let user = {
  name: 'Harika',
  sizes: {
    height: 182,
    width: 50,
  },
};

// Now it’s not enough to copy clone.sizes = user.sizes, because the user.sizes is an object, it will be copied by reference.
// So clone and user will share the same sizes

let clone = Object.assign({}, user);

console.log(user.sizes === clone.sizes); // true, same object

// user and clone share sizes
user.sizes.width++; // change a property from one place
console.log(clone.sizes.width); // 51, see the result from the other one

// To fix that, we should use the cloning loop that examines each value of user[key] and,
// if it’s an object, then replicate its structure as well. That is called a “deep cloning”.

//============================================================================//

//Object to primitive conversion

// when objects are added obj1 + obj2, subtracted obj1 - obj2 or printed using alert(obj)
// In that case, objects are auto-converted to primitives, and then the operation is carried out.
// All objects are true in a boolean context. There are only numeric and string conversions.

//============================================================================//

//Destructing Objects & Arrays

// we have an array with the name and surname
let arr = ['Ilya', 'Kantor'];

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

// /Ignore elements using commas
// second element is not needed
let [firstName, , title] = [
  'Julius',
  'Caesar',
  'Consul',
  'of the Roman Republic',
];

alert(title); // Consul

// Actually, we can use it with any iterable, not only arrays:

let [a, b, c] = 'abc'; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

//============================================================================//

//The rest ‘…’
//If we want not just to get first values, but also to gather all that follows

let [name1, name2, ...rest] = [
  'Julius',
  'Caesar',
  'Consul',
  'of the Roman Republic',
];

alert(name1); // Julius
alert(name2); // Caesar

// Note that type of `rest` is Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2

//...rest should be the last param

// If we want a “default” value to replace the missing one, we can provide it using =
// default values
let [name = 'Guest', surname = 'Anonymous'] = ['Julius'];

alert(name); // Julius (from array)
alert(surname); // Anonymous (default used)

//============================================================================//

//Object destructuring

let options = {
  title: 'Menu',
  width: 100,
  height: 200,
};

let { title, width, height } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200

// Note if the destructing is done without let then theie might be error

let title, width, height;

// error in this line
// {title, width, height} = options; //error - as js thinks it is a code block

({ title, width, height } = options); // to fix above issue wrap it in a ()

//============================================================================//

//JSON methods, toJSON
/*
JavaScript provides methods:

JSON.stringify to convert objects into JSON.
JSON.parse to convert JSON back into an object.
*/

let student = {
  name: 'Harry',
  age: 21,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
};

let json = JSON.stringify(student);

console.log(typeof json); // we've got a string!

console.log(json);
/* JSON-encoded object:
{
  "name": "Harry",
  "age": 21,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/

/*
JSON supports following data types:

Objects { ... }
Arrays [ ... ]
Primitives:
strings,
numbers,
boolean values true/false,
null.

Strings use double quotes. No single quotes or backticks in JSON.
*/

//JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by JSON.stringify.
// Note: there must be no circular references.

let user = {
  sayHi() {
    // ignored
    alert('Hello');
  },
  [Symbol('id')]: 123, // ignored
  something: undefined, // ignored
};

console.log(JSON.stringify(user)); // {} (empty object)

//Excluding and transforming: replacer
// Syntax  - let json = JSON.stringify(value[, replacer, space])
let room = {
  number: 23,
};

let meetup = {
  title: 'Conference',
  participants: [{ name: 'Harika' }, { name: 'Avadutha' }],
  place: room, // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log(JSON.stringify(meetup, ['title', 'participants']));
// {"title":"Conference","participants":[{},{}]}
// The property list is applied to the whole object structure. So the objects in participants are empty, because name is not in the list.

// If an object has toJSON, then it is called by JSON.stringify.

//============================================================================//

// JSON.parse

// Syntax - let value = JSON.parse(str, [reviver]);

let userData =
  '{ "name": "Harika", "age": 21, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

console.log(user.friends[1]); // 1

//using reviver
// reviver - Optional function(key,value) that will be called for each (key, value) pair and can transform the value.

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

console.log(meetup.date.getDate()); // Error!

// How could JSON.parse know that it should transform that string into a Date?

// Let’s pass to JSON.parse the reviving function as the second argument, that returns all values “as is”, but date will become a Date:

let meetup = JSON.parse(str, function (key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

console.log(meetup.date.getDate()); // now works!
