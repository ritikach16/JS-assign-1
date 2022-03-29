//Write a program to demonstrate 
//how a function can be passed as a parameter to another function.

//Solution
// 1


var firstFun = function(){
    console.log("this is firstFun function");
}

var mainFun = function(fun){
     return fun;
}

console.log(mainFun(firstFun));


//------------- or -------------------

var firstFun = function(){
    console.log("this is firstFun function");
}

var mainFun = function(fun){
      fun();
}

mainFun(firstFun);