
/* =========================
   REGISTER SYSTEM (index.html)
========================= */

const form = document.getElementById("registerForm");

if(form){

form.addEventListener("submit", function(e){
e.preventDefault();

const name = document.querySelector('input[type="text"]').value;
const email = document.querySelector('input[type="email"]').value;

const password = document.getElementById("password").value;
const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

const user = {
name,
email,
password
};

localStorage.setItem("user", JSON.stringify(user));

alert("Account created successfully!");

window.location.href = "master.html";

});

}

/* Show password */
function showPassword(){

let password = document.getElementById("password");

if(password){
password.type = password.type === "password" ? "text" : "password";
}

}


/* =========================
   CROWDFUNDING SYSTEM (master.html)
========================= */

let funding = JSON.parse(localStorage.getItem("funding")) || {
amount: 89914,
backers: 5007
};

let selectedAmount = 25;

/* OPEN MODAL */
function openModal(){
let modal = document.getElementById("modal");
if(modal) modal.style.display = "flex";
}

/* CLOSE MODAL */
function closeModal(){
let modal = document.getElementById("modal");
if(modal) modal.style.display = "none";
}

/* SELECT REWARD TIER */
function selectTier(amount){
selectedAmount = amount;

let input = document.getElementById("customAmount");
if(input) input.value = amount;
}

/* CONFIRM SUPPORT */
function confirmBack(){

let input = document.getElementById("customAmount");

let amount = input && input.value
? Number(input.value)
: selectedAmount;

if(!amount || amount <= 0){
alert("Please enter a valid amount");
return;
}

funding.amount += amount;
funding.backers += 1;

updateUI();
closeModal();

alert("Thank you for supporting this project!");

}


/* =========================
   UPDATE UI + ANIMATION
========================= */

function updateUI(){

let moneyEl = document.querySelector(".stats h2");
let backersEl = document.querySelectorAll(".stats h2")[1];
let progress = document.querySelector(".progress");

if(moneyEl && backersEl){

moneyEl.innerText = "$" + funding.amount.toLocaleString();
backersEl.innerText = funding.backers.toLocaleString();

}

/* progress animation */
let percent = Math.min((funding.amount / 100000) * 100, 100);

if(progress){
progress.style.width = percent + "%";
progress.style.transition = "width 1s ease";
}

/* save data */
localStorage.setItem("funding", JSON.stringify(funding));

}

/* run on load */
window.addEventListener("load", updateUI);