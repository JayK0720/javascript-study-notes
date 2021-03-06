const obj = {
	0:'a',
	1:'b',
	2:'c',
	length:3
}
console.log( Array.from(obj) );
console.log(obj);

Array.from(obj,function(value,index){
	console.log(value,index,this,arguments.length);
},obj);
/*
a 0 {0: "a", 1: "b", 2: "c", length: 3} 2
b 1 {0: "a", 1: "b", 2: "c", length: 3} 2
c 2 {0: "a", 1: "b", 2: "c", length: 3} 2 */

let newArray = Array.from(obj,function(value,index){
	return value.repeat(3);
},obj);
console.log(newArray);

// Array from a String
console.log(Array.from('Hello World'));

// Array from a Set
console.log(Array.from(new Set(['hello','world'])));	//  ["hello", "world"]


// Array from a Array-like object(arguments);
function f(){
	return Array.from(arguments);
}
console.log(f(1,2,3));	// [1,2,3]

// Array.from 中使用箭头函数
console.log( Array.from([1,2,3],(x) => x * 2) );	// [2,3,4]


// 将HTMLElementCollection 或 NodeList 转化为真正的数组
let oBox1 = document.querySelectorAll('.box');
let oBox2 = document.getElementsByClassName('box');

console.log([...oBox1],[...oBox2]);
console.log(Array.from(oBox1),Array.from(oBox2));
console.log(Array.prototype.slice.apply(oBox1),Array.prototype.slice.apply(oBox2));


// Array.isArray() 判断一个变量是否是数组类型.
const a = [1,2,3];
const b = {}
console.log(a instanceof Array);	// true
console.log(a.constructor);	// f Array
console.log( Object.prototype.toString.call(a) );	// [Object Array]
console.log(Array.isArray(a));	// true
console.dir(a);

const arrayLike = {
	__proto__:Array.prototype
}
console.log(arrayLike instanceof Array);	// true
console.log(arrayLike.constructor);	// f Array()
console.log(arrayLike.__proto__ === Array.prototype); // true
console.dir(arrayLike);	// Array
console.log(Array.isArray(arrayLike));	// false
console.log(Object.prototype.toString.call(arrayLike));	// [object Object]

// Array.prototype
console.log(Array.isArray(Array.prototype));	// true