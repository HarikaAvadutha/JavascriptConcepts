BigNumber.set({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 });

x = new BigNumber(2);
console.log(x); //BigNumber { s: 1, e: 0, c: [ 2 ] }
y = new BigNumber(3);
console.log(y); //BigNumber { s: 1, e: 0, c: [ 3 ] }
z = x.dividedBy(y);
console.log(z); //BigNumber { s: 1, e: -1, c: [ 66666666670000 ] }
console.log(z.squareRoot()); //BigNumber { s: 1, e: -1, c: [ 81649658090000 ] }
console.log(z.exponentiatedBy(-3)); //BigNumber { s: 1, e: 0, c: [ 3, 37499999950000 ] }
console.log(z.toString(2)); //0.1010101011
console.log(z.multipliedBy(z)); //BigNumber { s: 1, e: -1, c: [ 44444444448888, 88888900000000 ] }
console.log(z.multipliedBy(z).decimalPlaces(10)); //BigNumber { s: 1, e: -1, c: [ 44444444450000 ] }

// ============================================================================ //

var dict = new Dict({ a: 1, b: 2 }, function (key) {
  return 'default: ' + key;
});

dict.length; //2
dict.get('a'); //1

dict.add(3, 'c');
dict.get('c'); //3

var heap = new Heap([2, 8, 5]);
heap.length; //3
heap.push(4);
heap.pop(); //8
heap.peek(); //5

var minHeap = new Heap([2, 8, 5], null, function (a, b) {
  return b - a;
});

minHeap.push(6);
minHeap.pop(); //2
minHeap.peek(); //5
