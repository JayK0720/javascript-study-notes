function isBelowThreshold(currentValue){
	return currentValue < 40
}
const array1 = [1,30,39,29,10,13];
console.log( array1.every(isBelowThreshold) );	// true

function isBigEnough(element,index,array){
	return element > 10;
}

const arr1 = [12,5,8,130,44];
const arr2 = [12,54,18,130,44];
console.log( arr1.every(isBigEnough) );	// false
console.log( arr2.every(isBigEnough) );	// true
			