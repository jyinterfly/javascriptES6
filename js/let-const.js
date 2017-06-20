{
    let a = 10;
    var b = 1;
}

console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1

var a = [];
var i;
for (i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10

// 这里的说法的确不完整，let i = 0 在整个循环过程中其实只执行了一次（你可以在循环开始处打断点步进观察），由于 let 创建的变量是尊重块级作用域的，所以的确每次循环都是一个新的 i，但是赋值为 0 的动作只有第一次，后面每次的值都是 i++ 的结果。因为每次循环的 i 都是一个独立的变量（内存里的唯一地址），因此闭包记录的值都是唯一的，所以才能得到最终的结果。

//     如果用 var 的话，变量 i 是一个全局变量，虽然循环体内每次都创建了一个函数来打印 i 的指，但是当时当刻仅仅是一个指向全局变量 i 的指针，当循环结束之后无论你用哪一个下标去访问循环创建的闭包函数，打印的变量 i 都是全局的那一个，所以全部都是 9。


for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// abc
// abc
// abc
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
//temporal dead zone

function func(arg) {
    let arg; // 报错
}

function func(arg) {
    {
        let arg; // 不报错
    }
}


// IIFE 写法
(function () {
    var tmp = ...;
  ...
}());


//块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
// 块级作用域写法
{
    let tmp = ...;
  ...
}

//Object.freeze

//es6 const 和 let 不會污染根物件 屬於全局變數

var a = 1;
// 如果在Node的REPL環境，可以寫成global.a
// 或者採用通用方法，寫成this.a
window.a // 1

let b = 1;
window.b // undefined


//变量的解构赋值

//模式匹配

let [a, b, c] = [1, 2, 3];

let [, , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null

//上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null

//如果变量名与属性名不一致，必须写成下面这样。
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

let { log, sin, cos } = Math;

//\u0000~\uFFFF

//ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

// [課後練習題] 請把答案上傳至 Gist 並貼連結上來！
// 請完成以下 API 設計，讓你的程式可以執行以下程式碼，並且得到預期的結果。串接 add 的次數沒有上限，最後一個 API 是 result() 才會回傳結果。
$(1).add(2).add(3).add(99).result() === 105
$(1).add(2).add(3).result() === 6
// etc...
// ...etc...
// ※ 做完的人，可以直接回傳答案，程式碼請務必排版過，必須容易閱讀，然後一樣程式碼最短者勝出！ 😉