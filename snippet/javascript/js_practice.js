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
let some_number = 1;
let res = 1 + 2;
res = 1 - 2;
res = -some_number;
res = 1 * 2;
res = 1 / 2;
res = 1 % 2;
res = 1 ** 2;
res += 5;
res -= 5;
res *= 5;
res /= 5;
res++;
res--;
--res;
++res;

console.log("1" + 1 + 1); // 111
console.log(1 + 1 + "1"); // 21
console.log(+"1"); // 1
console.log(+"1" + +"1"); // 2

let middle_number = 0;
console.log(3 - (middle_number = 2 + 1));
console.log(middle_number);

let chain1, chain2, chain3;
chain1 = chain2 = chain3 = 2 + 2;
console.log(chain1, chain2, chain3);

console.log((1 + 2, 3 + 4)); // 7

console.log("z" > "a");
console.log("zz" > "aa");

console.log(0 > "-1");
console.log(true == 1);

let int0 = 0;
let string0 = "0";

console.log(Boolean(int0) == Boolean(string0));
console.log(int0 == string0);
console.log(int0 === string0);
console.log(int0 !== string0);

console.log(null === undefined);
console.log(null == undefined);

console.log(null > 0);
console.log(null == 0);
console.log(null >= 0);

console.log(undefined > 0);
console.log(undefined == 0);
console.log(undefined >= 0);

let find_first_true = 0 || 1 || 3;
let find_string = "" || "" || "nice";
console.log(find_first_true, find_string);

let find_first_false = 1 || null || 3;
console.log(find_first_false);

console.log(!!"123");

console.log(undefined ?? "123");
console.log(null ?? "321");
console.log(null ?? "");
console.log("" ?? "??");

console.log("start loop");
label: for (let i = 0; i < 3; i++) {
  console.log(i);
  for (let j = 0; j < 3; j++) {
    console.log(j);
    break label;
  }
}

console.log("start loop2");
label2: for (let i = 0; i < 3; i++) {
  console.log(i);
  for (let j = 0; j < 3; j++) {
    console.log(j);
    continue label2;
  }
}

let switch_cond = "1";
switch (switch_cond) {
  case 1:
    console.log("==");
    break;
  case "1":
    console.log("===");
    break;
  default:
    console.log("default===");
    break;
}

function func(param) {
  console.log(param);
}

func("hello,world");

let obj = {
  a: "a",
};
let base = 0;

function change_obj(o, b) {
  o.a = "c";
  b = 1;
}

change_obj(obj, base);
console.log(obj.a, base);

function func2(param1, param2 = "default") {
  console.log(param1, param2);
}

func2();
func2(null, null);
func2("", "");
func2(false, false);

function noreturn() {}
function return_nothing() {
  return;
}
console.log(noreturn());
console.log(return_nothing());

let func3 = function () {
  return;
};

console.log(func2);
console.log(func3);

let vvv = func3;
console.log(vvv());

function callback(flag, fn1, fn2) {
  if (flag) {
    fn1();
  } else {
    fn2();
  }
}

let get_func_to_outer;
if (true) {
  get_func_to_outer = function () {
    console.log("escape!!!");
  };
}
get_func_to_outer();

let arrowfunc = () => "arrow";
let arrowfunc2 = () => {
  return "arrow";
};
console.log(arrowfunc());
console.log(arrowfunc2());
