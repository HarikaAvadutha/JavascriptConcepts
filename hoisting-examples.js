/*
Hoisting Concept:
var, let and const declarations are hoisted to the top. 
Unlike `var` which is initialized as undefined, the `let` and `const` keyword is not initialized. 
So if you try to use a let variable before declaration, you'll get a Reference Error.
*/

// Example-1
let name = 'harika';
function name() {}
typeof name;

//output of above code is - { Identifier 'name' has already been declared }

//same above code with var type output will be - "string"

// ============================================================================ //

// Example-2
var name = function () {};
let name = 'harika';
typeof name;

//output of above code is - { Identifier 'name' has already been declared }

// ============================================================================ //

// Example-3
functionDeclaration(); // output: "Hoisted"
function functionDeclaration() {
  console.log('Hoisted');
}

//Function declarations are Hoisted

// ============================================================================ //

// Example-4
functionExpression(); // TypeError: functionExpression is not a function

const functionExpression = function () {
  console.log('Not Hoisted');
};

//Function expressions are not Hoisted

// ============================================================================ //

// Example-5
console.log(y);
y = 1;

//Reference Error

// ============================================================================ //

// Example-6
console.log(y);
var y = 2;

//undefined, as the initializations are not hoisted

// ============================================================================ //

// Example-7
y = 3;
console.log(y);
var y;

//Output - 3

// ============================================================================ //

// Example-8
function hoistingExample() {
  console.log('Value of a in local scope: ', a);
}

console.log('Value of a in global scope: ', a);
var a = 1;
hoistingExample();

/*
Output -
Value of a in global scope: Undefined
Value of a in local scope: 1
*/

// ============================================================================ //

// Example-9
function hoistingExample() {
  a = 1;
}
hoistingExample();
console.log(a); // 1,  Variables which are assigned without a var declaration are considered to be global variables

// ============================================================================ //

// Example-10
function hoistingExample() {
  var a = 1;
}
hoistingExample();
console.log(a); // ReferenceError: a is not defined, var a is defined inside local scope.

// ============================================================================ //

// Example-11
var test = 1;
function functionHoisting() {
  test = 10;
  return;

  function test() {}
}
functionHoisting();
console.log(test); // Output - 1 (function Hoisting, test is re-defined and re-declared)
