/*
Memoization or memoisation is an optimization technique used primarily to speed up computer programs 
by storing the results of expensive function calls and 
returning the cached result when the same inputs occur again.
*/

function slowFunc(params) {}

memoizedFunc = memoize(slowFunc);

memoizedFunc(params); // slow output
memoizedFunc(params); // fast output
memoizedFunc(params); // fast output

memoizedFunc(newParams); // slow output
memoizedFunc(newParams); // fast output

function memoize(fn) {
  const cache = {};
  return function () {
    const args = JSON.stringify(arguments);
    if (cache[args]) {
      return cache[args];
    }
    const evaluatedValue = fn.call(this, arguments);
    cache[args] = evaluatedValue;
    return evaluatedValue;
  };
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return factorial(n - 1) * n;
}

const memoizedFactorial = memoize(factorial);
memoizedFactorial(1000); // slow
memoizedFactorial(1000); // faster
