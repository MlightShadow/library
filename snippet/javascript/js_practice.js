// hello, world
console.log("hello, world");
// variables
let variable = "hello, variables";
console.log(variable);

let varialbe1 = 1,
  varialbe2 = 2,
  variable3 = 3;
console.log(varialbe1, varialbe2, variable3);

let apple = "apple";
let Apple = "Apple";
console.log(apple, Apple);

const PI = 3.14;
console.log(PI);

// types
let number = 123;
let float = 23.3;
console.log("string" / 1);
console.log(NaN);
console.log(1 / 0);
console.log(Infinity);

let bigInt = 313231231313232312312312313131312313131313123131233131312313131212313;
console.log(bigInt);

let str = "hello, string";
console.log(` this string is "${str}", length: ${str.length}`);

let boolean_true = true;
let boolean_false = false;
console.log(boolean_true, boolean_false);
console.log(boolean_false === boolean_true);

let some_thing_null = null;
console.log(some_thing_null);
let some_thing_undefined = undefined;
console.log(some_thing_undefined);

console.log(typeof undefined);
console.log(typeof null); //that's error, null is not object, that's history problem
console.log(typeof NaN);
console.log(typeof Infinity);
console.log(typeof (1 + 2));

// type conversions

let string_true = true;
console.log(typeof string_true);
string_true = String(string_true);
console.log(typeof string_true);
console.log(String(null));
console.log(String(undefined));
console.log(String(NaN));

let number_1 = "1";
let number_2 = "2";
console.log(typeof (number_1 + number_2));
console.log(typeof (number_1 - number_2));
console.log(typeof (number_1 * number_2));
console.log(typeof (number_1 / number_2));

number_1 = Number(number_1);
console.log(typeof number_1);

console.log(Number(undefined)); // NaN
console.log(Number(null)); //0
console.log(Number(true));
console.log(Number(false));
console.log(Number("1"));
console.log(Number("i'm NaN"));

console.log(Boolean(1));
console.log(Boolean("0"));
console.log(Boolean(" "));
console.log(Boolean("string"));
console.log(Boolean(Infinity));

console.log(Boolean(""));
console.log(Boolean(0));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));

// operators
