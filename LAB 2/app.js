/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

const ArrayUtils=require("./arrayUtils");
const StringUtils=require("./stringUtils");
const ObjectUtils=require("./objectUtils");

//1. ArrayUtils -> arrayStats
try
{
    console.log(ArrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11,30, 4,1,-20])); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ArrayUtils.arrayStats("banana")); //Error
}
catch(e)
{
    console.log(e);
}

//2. ArrayUtils -> makeObjects
try
{
    console.log(ArrayUtils.makeObjects(["foo", "bar"], [5, "John"])); // returns {foo:'bar', '5': "John"}
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ArrayUtils.makeObjects([4, 1, 2], [1,2])); // throws error
}
catch(e)
{
    console.log(e);
}

//3.ArrayUtils -> commonElements
const arr1 = [5, 7]; 
const arr2 = [20, 5]; 
const arr3 = [true, 5, 'Patrick']; 
const arr4 = ["CS-546", 'Patrick']; 
const arr5 = [67.7, 'Patrick', true]; 
const arr6 = [true, 5, 'Patrick']; 
const arr7 = [undefined, 5, 'Patrick']; 
const arr8 = [null, undefined, true];
const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
const arr10= [["foo", "bar"], true, "String", 10]

try
{
    console.log(ArrayUtils.commonElements(arr3, arr4, arr5, arr7)); // returns ['Patrick']
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ArrayUtils.commonElements([1,2,"nope"])); // throws error
}
catch(e)
{
    console.log(e);
}

//4.StringUtils -> palindromes
try
{
    console.log(StringUtils.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake")); // Returns: ["mom", "noon", "kayak"]
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(StringUtils.palindromes(1));  //throws error
}
catch(e)
{
    console.log(e);
}

//5.StringUtils -> replaceChar
try
{
    console.log(StringUtils.replaceChar("Hello, How are you? I hope you are well")); // Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(StringUtils.replaceChar(123)); // Throws Error
}
catch(e)
{
    console.log(e);
}

//6.StringUtils -> charSwap
try
{
    console.log(StringUtils.charSwap("Chakravarti", "Kothadiya")); //Returns "Kothravarti Chakadiya"
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(StringUtils.charSwap('hello', 'w   ')); // Throws Error
}
catch(e)
{
    console.log(e);
}

//7.ObjectUtils -> deepEquality
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
try
{
    console.log(ObjectUtils.deepEquality(forth, fifth)); // returns true
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ObjectUtils.deepEquality([1,2,3], [1,2,3])); // throws error 
}
catch(e)
{
    console.log(e);
}

//8.ObjectUtils -> commonKeysValues
const fir = {name: {first: "Patrick", last: "Hill"}, age: 46};
const sec = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const thi = {a: 2, b: {c: true, d: false}};
const fort = {b: {c: true, d: false}, foo: "bar"};
try
{
    console.log(ObjectUtils.commonKeysValues(fir, sec)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ObjectUtils.commonKeysValues("foo", "bar")); // throws error
}
catch(e)
{
    console.log(e);
}

//9.ObjectUtils -> calculateObject
try
{
    console.log(ObjectUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2)); // returns {a:'2.45' , b:'3.74', c:'3.16'}
}
catch(e)
{
    console.log(e);
}

try
{
    console.log(ObjectUtils.calculateObject({a:34,b:6},"45"));
}
catch(e)
{
    console.log(e);
}