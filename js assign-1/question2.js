//An arrow function takes two arguments firstName and lastName and returns
// a 2 letter string that represents the first letter of both the arguments.
// For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
//Submit the github link to the code


//Solution

var funName =  (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0);
}

// ---------- or ------------

var anotherName = (fname, lname) => fname.charAt(0) + lname.charAt(0);


console.log(funName("Ritika", "Chauhan"));
console.log(anotherName("Abcd", "Efgh"));