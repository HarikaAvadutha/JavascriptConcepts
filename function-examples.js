/* 
Functions are the main “building blocks” of the program. They allow the code to be called many times without repetition.
*/

const { log } = require('console');

typeof Function; // though the functions are treated as object, still the output will be a function. why?
/*
Because function is a native object which among other properties has internal [[Construct]] and [[Call]] properties 
and also explicit prototype property — the reference to a prototype of the future objects. And its class is function.

F.[[Class]] = "Function"
F.[[Call]] = <reference to function> // function itself

Thus [[Call]] besides the [[Class]] property (which equals to "Function") is the main in respect of objects distinguishing. 
Therefore the objects having internal [[Call]] property are called as functions. 
The typeof operator for such objects returns "function" value.
*/

// ============================================================================ //

//Function Declaration
//A Function Declaration can be called earlier than it is defined.

declaration(true); // output - true default value

function declaration(param1, default_param = ' default value') {
  if (param1) {
    console.log('This is how the function is declared', default_param);
  }

  return param1 + default_param;
}

// ============================================================================ //

//Function expressions
//It is created when the execution reaches it and is usable only from that moment.

let sayHi = function () {
  console.log('Hello');
};

sayHi; // shows the function code
sayHi(); // calls the function

// ============================================================================ //

//callback functions
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

function showOk() {
  console.log('You agreed.');
}

function showCancel() {
  console.log('You canceled the execution.');
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask('Do you agree?', showOk, showCancel);

// ============================================================================ //

//closures - A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain.
/*
>Closures have access to the outer function’s variable even after the outer function returns:
>Closures store references to the outer function’s variables
*/

function caluclate(x, y) {
  return {
    add: function () {
      return x + y;
    },
    minus: function () {
      return x - y;
    },
    multiply: function () {
      return x * y;
    },
    divide: function () {
      return x / y;
    },
  };
}

var cal = caluclate(2, 3);
cal.add();

// ============================================================================ //

//Closures can go wrong when outer function’s variable changes with a for loop

function IDCreator(persons) {
  let i;
  let uniqueID = 100;
  for (i = 0; i < persons.length; i++) {
    persons[i]['id'] = function () {
      return uniqueID + i;
    };
  }

  return persons;
}

let persons = [
  { name: 'a', id: 0 },
  { name: 'b', id: 0 },
  { name: 'c', id: 0 },
];

let createdIds = IDCreator(persons);

/*
this should actually return 101, but the closure (the anonymous function in this example) 
has access to the outer function’s variables by reference, not by value)
*/
console.log(createIds[0].id); //103

// ============================================================================ //

// Above issue can be fixed using IIFE (Immediately invoked function expression)
function IDCreator(persons) {
  var i;
  var uniqueID = 100;
  for (i = 0; i < persons.length; i++) {
    persons[i]['id'] = (function (j) {
      return (function () {
        return uniqueID + j;
      })();
    })(i);
  }
  return persons;
}

var persons = [
  { name: 'a', id: 0 },
  { name: 'b', id: 0 },
  { name: 'c', id: 0 },
];

var createdIds = IDCreator(persons);

console.log(createdIds[0].id); //101

const person1 = { name: 'joe', height: 72 };
const person2 = { name: 'rob', height: 70 };
const person3 = { name: 'nicholas', height: 66 };

const arr_ = [person1, person2, person3];

function by(propName) {
  return function (a, b) {
    return a[propName] - b[propName];
  };
}

const arr_sorted = arr_.sort(by('name'));
console.log(arr_sorted);

// map

const bankAccount = (initialBalance) => {
  let balance = initialBalance;

  return {
    getBalance: function () {
      return balance;
    },
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
  };
};

const account = bankAccount(100);

account.getBalance();
account.deposit(10);

var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (i) {
    return function () {
      console.log('My value is ' + i);
    };
  })(i);
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}

// ============================================================================ //

// call,apply

function sayHi() {
  alert(this.name);
}

let user = { name: 'John' };
let admin = { name: 'Admin' };

// use call to pass different objects as "this"
sayHi.call(user); // John
sayHi.call(admin); // Admin

/*
Instead of func.call(this, ...arguments) we could use func.apply(this, arguments).

func.apply(context, args)
It runs the func setting this=context and using an array-like object args as the list of arguments.

The only syntax difference between call and apply is that call expects a list of arguments,
while apply takes an array-like object with them.
*/

//Use Apply () to Execute Variable-Arity Functions

let a = { arr: [1, 2, 3] };
a.arr.length;

// ============================================================================ //

//Bind
// bind is slightly different from call and apply , rather than immediately invoking the function it actually creates and returns a new function.
// The new function has the specified this value bound to it.

let car = {
  hornMessage: 'Beep! Beep!',
  honk: function () {
    return this.hornMessage;
  },
};

let truck = {
  hornMessage: 'HOOONNNNKKK!!',
};

// We can easily call the car's honk method.
car.honk(); // "Beep! Beep!"

// We can call honk with the truck context using .call
car.honk.call(truck); // "HOOONNNNKKK!!"

// But what if we want to create a truckHonk method to store that function and call it at a later time?
let truckHonk = car.honk.bind(truck);
truckHonk(); // "HOOONNNNKKK!!"

/*
usecases:
Async stuff
A very common front-end use case for bind is for anything that will happen asynchronously. 
For example in a callback that needs access to the original this context. This is especially handy in component based frameworks like React.

2. Partial Applications
  A great use case for bind is Partial Applications of functions. (i.e. giving a function only some of it’s arguments).
*/
