const array = [1,2,3,4,5];
let even = array.some(function(element){
	return element % 2 === 0;
});
console.log(even);	// true

array.some(function(element,index,array){
	console.log(element,index,array);
	return element > 3;
})

let obj = {
	age:27,
	name:'kyrie'
}
const ages = [34,24,30,27,29];
ages.some(function(item,index,array){
	console.log(item,index);
	return this.age > item;
},obj);


let arr1 = [2,5,8,1,4];
let arr2 = [12,5,8,1,4];

function isBiggerThan10(element,index,array){
	return element > 10;
}
console.log( arr1.some(isBiggerThan10) );	// false
console.log( arr2.some(isBiggerThan10) );	// true

// 判断数组元素中是否存在某个值
const fruits = ["apple","banana","mango","guava"];
console.log( fruits.includes("apple") );	// true
console.log( fruits.includes("grape")); 	// false

function checkFruit(array,value){
	return array.some(function(item){
		return item === value
	});
}
console.log( checkFruit(fruits,"apple") );	// true
console.log( checkFruit(fruits,"grape") );	// false