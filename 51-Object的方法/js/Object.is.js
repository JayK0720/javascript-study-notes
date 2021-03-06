console.log( Object.is(+0,-0) );    // false
console.log( Object.is(NaN,NaN));   // true
console.log( Object.is({},{})); // false
console.log( Object.is(true,'true'));   // false
console.log( Object.is(true,true)); // true
console.log( Object.is(null,null));
console.log( Object.is(undefined,undefined));

console.log(undefined == null); // true
console.log(NaN === NaN);   // false
console.log( +0 === -0);    // true


function Dog(name,breed,color,sex){
	this.name = name;
	this.breed = breed;
	this.color = color;
	this.sex = sex;
}

var theDog = new Dog('Gabby','lab','chocolate','female');
const dog = new Dog('Luby','lab','white','male');
console.log(theDog,dog);
console.log(theDog.toString(),dog.toString());	// [object Object]

Dog.prototype.toString = function dogToString(){
	return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}
const dog1 = new Dog('Gabby','lab','chocolate','female');
console.log(dog1.toString());