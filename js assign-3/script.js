// 1) 
// Refactor the following function into a one-liner:
// const printName = (name) => {
//                      return “Hi” + name;
//            }


//SOLUTION -> 

const printName = name => "Hi" + name;


// QUESTION - 2
// Rewrite the following code using template literals
// const printBill = (name, bill) => {
//                      return “Hi “ + name + “, please pay: “ + bill;
//            }

// SOLUTION -> 

const printBill = (name, bill) => `Hi ${name}, please pay: ${bill} rs`;

console.log(printBill("John", 1000));


//QUESTION 3
// Modify the following code such that the object properties are destructured and logged.
// const person = {
//                       name: “Noam Chomsky”,
//                       age: 92
//             }

//            let name = person.name;
//            let age = person.age;
//            console.log(name);
//            console.log(age);

//SOLUTION ->

const person = {
    name: "Noam Chomsky",
    age: 92
};

const {name, age} = person;
console.log(name);
console.log(age);

// ----------------- or -------------------

const {...arg} = person;
console.log(`name is ${arg.name} and age is ${arg.age}`);