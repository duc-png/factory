// Demo typeof operator
console.log("=== TYPEOF EXAMPLES ===");

// Các kiểu dữ liệu khác nhau
let number = 42;
let text = "Hello";
let flag = true;
let nothing = undefined;
let empty = null;
let array = [1, 2, 3];
let object = { name: "John" };
let func = function() { return "test"; };

console.log("typeof", number, "=", typeof number);     // "number"
console.log("typeof", text, "=", typeof text);         // "string"
console.log("typeof", flag, "=", typeof flag);         // "boolean"
console.log("typeof", nothing, "=", typeof nothing);   // "undefined"
console.log("typeof", empty, "=", typeof empty);       // "object" (bug!)
console.log("typeof", array, "=", typeof array);       // "object"
console.log("typeof", object, "=", typeof object);     // "object"
console.log("typeof", func, "=", typeof func);         // "function"

// Sử dụng trong điều kiện
function checkType(value) {
  if (typeof value === "string") {
    console.log(value, "là chuỗi");
  } else if (typeof value === "number") {
    console.log(value, "là số");
  } else if (typeof value === "boolean") {
    console.log(value, "là boolean");
  } else {
    console.log(value, "là kiểu khác:", typeof value);
  }
}

checkType("Hello");    // Hello là chuỗi
checkType(42);         // 42 là số  
checkType(true);       // true là boolean
checkType([1,2,3]);    // [1,2,3] là kiểu khác: object
