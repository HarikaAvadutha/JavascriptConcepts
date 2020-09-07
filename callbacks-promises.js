// Callback functions
/*
Many functions are provided by JavaScript host environments that allow you to schedule asynchronous actions. 
In other words, actions that we initiate now, but they finish later.

For instance, one such function is the setTimeout function.

There are other real-world examples of asynchronous actions, e.g. loading scripts and modules

So if we want to perform some action based on the asynchronous action then we need to use callbacks which execute after the async call
*/

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
  (script) => {
    console.log(`Cool, the script ${script.src} is loaded`);
    console.log(_); // function declared in the loaded script
  }
);
// second argument is the anonymous function i.e callback

// There is even error handling in callback,

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript('/my/script.js', function (error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});

// This is called the “error-first callback” style.

// We can even have callback in callback and so on, You can image many callbacks it will form a pyramid kind of structure which might be difficult to debug
// This is called callback-hell or pyramid of Doom

// To overcome this scenario we use promises.

// ============================================================================ //

// PROMISES

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done'), 1000);

  reject(new Error('…')); // ignored
});

/*
The function passed to new Promise is called the executor. It runs automatically and attempts to perform a job. 
When it is finished with the attempt it calls resolve if it was successful or reject if there was an error.

There will be only single result either resolve or reject

The promise object returned by the new Promise constructor has these internal properties:

state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
result — initially undefined, then changes to value when resolve(value) called or error when reject(error) is called.

These values are internal and cannot be accessed directly but can be accessed .then/.catch/.finally

**A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise.

*/

// .then
//  there can be two arguments for then which accepts functions, 1st params function is when the promise is successfull and the 2nd is when it has any error(it can be optional)

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done!'), 1000);
});

// resolve runs the first function in .then
promise.then(
  (result) => console.log(result), // shows "done!" after 1 second
  (error) => console.log(error) // doesn't run
);

//.catch
// If we’re interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction).
// Or we can use .catch(errorHandlingFunction), which is exactly the same:

let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Whoops!')), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second

//.finally

//The call .finally(f) is similar to .then(f, f) in the sense that f always runs when the promise is settled: be it resolve or reject.
//On settled promises handlers run immediately
// If a promise is pending, .then/catch/finally handlers wait for it. Otherwise, if a promise has already settled, they execute immediately

// ============================================================================ //

//Promises chaining - a sequence of asynchronous tasks to be performed one after another

//promise.then returns a promise, so that we can call the next .then on it.

// When a handler returns a value, it becomes the result of that promise, so the next .then is called with it.

// technically we can also add many .then to a single promise. This is not chaining.

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });

// ============================================================================ //

// Promise API
/*
There are 5 static methods in the Promise class
1)Promise.all - if we want many promises to execute in parallel and wait until all of them are ready.
*/

Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Whoops!')), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!

// If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.  other promises are ignored

// Normally, Promise.all(...) accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it’s passed to the resulting array “as is”.

Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3

// 2) Promise.allSettled
// Promise.all rejects as a whole if any promise rejects. That’s good for “all or nothing” cases, when we need all results successful to proceed:

// 3) Promise.race

// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Whoops!')), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// The first promise here was fastest, so it became the result.
// After the first settled promise “wins the race”, all further results/errors are ignored.

// 4) Promise.resolve(value) – makes a resolved promise with the given value.
// 5) Promise.reject(error) – makes a rejected promise with the given error.

//Promisification - It’s the conversion of a function that accepts a callback into a function that returns a promise.

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// loadScriptPromise('path/script.js').then(...)

// ============================================================================ //

/*
Promisification is a great approach, especially when you use async/await (see the next chapter), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further calls will be ignored.
*/

// ============================================================================ //

//Async/await
// The word “async” before a function means one simple thing: a function always returns a promise.
// Other values are wrapped in a resolved promise automatically.

async function f() {
  return 1;
}

f().then(alert); // 1

//The keyword await makes JavaScript wait until that promise settles and returns its result.

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000);
  });

  let result = await promise; // wait until the promise resolves

  alert(result); // "done!"
}

f();
