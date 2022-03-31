const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

const btn = document.querySelector("button");


// before clicking the button
let lVal = localStorage.getItem("Local Score") || 0;
const ls = document.getElementById("localScore");
ls.value = lVal;

let sVal = sessionStorage.getItem("Session Score") || 0;
const ss = document.getElementById("sessionScore");
ss.value = sVal;

// when button is clicked
btn.addEventListener('click', () => {

    // code for local storage
    let val = localStorage.getItem("Local Score") || 0;
    val = parseInt(val) + 1;
    localStorage.setItem("Local Score", val);

    const ls = document.getElementById("localScore");
    ls.value = val;


    // code for session storage
    let sVal = sessionStorage.getItem("Session Score") || 0;
    sVal = parseInt(sVal) + 1;
    sessionStorage.setItem("Session Score", sVal);
    const ss = document.getElementById("sessionScore");
    ss.value = sVal;
})


