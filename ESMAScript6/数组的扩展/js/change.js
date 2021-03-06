let arr = ['cat','mouse','dog','chicken'];
let item = arr.pop();
console.log(arr,item);	// ['cat','mouse','dog'] "chicken"

const obj = {
	0:'kyrie',
	1:'lebron',
	2:'durant',
	3:'kobe',
	length:3
}

let i = Array.prototype.pop.call(obj);
console.log(obj,i);	// {0: "kyrie", 1: "lebron", 3: "kobe", length: 2} "durant"


let arr1 = ['football','basketball','volleyball'];
const len = arr1.push('golfball');
console.log(arr1,len);	// ["football", "basketball", "volleyball", "golfball"] 4


let arrayLike = {
	0:'football',
	1:'basketball'
}
let newArrayLike = Array.prototype.push.call(arrayLike,'golfball');
console.log(newArrayLike,arrayLike);


const arr2 = [1,2,3,4,5];
console.log(arr2.reverse());	//  [5, 4, 3, 2, 1]

arr2.shift();
console.log(arr2);


let players = ['kyrie','durant','lebron','wade','kobe'];

let ages = [1,20,3,15,8];
console.log(ages.sort());

function compareFun(a,b){
	if(a < b){
		return -1;
	}
	if(a > b){
		return 1;
	}
	return 0
}
console.log( ages.sort(compareFun) );	// [1,3,8,15,20]
console.log(players.sort(compareFun));	// ["durant", "kobe", "kyrie", "lebron", "wade"]

/* var array = [{ n: "a", v: 1 }, { n: "b", v: 1 }, { n: "c", v: 1 }, { n: "d", v: 1 }, { n: "e", v: 1 }, { n: "f", v: 1 }, { n: "g", v: 1 }, { n: "h", v: 1 }, { n: "i", v: 1 }, { n: "js", v: 1 }, { n: "k", v: 1 }, ];
array.sort(function (a, b) {
		return a.v - b.v;
});
for (let i = 0,len = array.length; i < len; i++) {
		console.log(array[i].n);
} */


var array = [{ n: "a", v: 1 }, { n: "b", v: 1 }, { n: "c", v: 1 }, { n: "d", v: 1 }, { n: "e", v: 1 }, { n: "f", v: 1 }, { n: "g", v: 1 }, { n: "h", v: 1 }, { n: "i", v: 1 }, { n: "j", v: 1 },];
array.sort(function (a, b) {
	return a.v - b.v;
});
for (let i = 0,len = array.length; i < len; i++) {
	console.log(array[i].n);
}


let arr3 = ['apple','boy'];
console.log( arr3.splice(1,1),arr3 );	// ["boy"] ["apple"]

let arr4 = ['apple','boy'];
console.log(arr4.splice(1,1,'cat'),arr4);	// ["boy"] (2) ["apple", "cat"]

let members = ['a','b','c','d','e','f'];
console.log( members.splice(3,2,'aaa'),members );	//  ["d", "e"] (5) ["a", "b", "c", "aaa", "f"]



const colors = ['red','blue','green'];
console.log( colors.unshift('black'),colors );	// 4 (4) ["black", "red", "blue", "green"]


console.log( ['a','b','c'].fill(3) );	// [3,3,3]

console.log( ['1','2','3','4','5'].fill(4,0,3) ); // [4, 4, 4, "4", "5"]