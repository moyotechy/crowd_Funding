const currentPage =
window.location.pathname;

if(currentPage.includes("master.html")){

const user =
localStorage.getItem("user");

if(!user){

alert("Please login first");

window.location.href =
"index.html";

}

}
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

const amount =
Number(
document.getElementById(
"customAmount"
).value
);

if(!amount || amount < 1){

alert(
"Please enter a valid contribution amount."
);

return;
}

const confirmContribution =
confirm(
`Are you sure you want to contribute $${amount.toLocaleString()}?`
);

if(!confirmContribution){
return;
}

/* Update project */
funding.amount += amount;
funding.backers += 1;

/* Save history */
let history =
JSON.parse(
localStorage.getItem("history")
) || [];

history.push({
amount,
date:new Date().toLocaleString()
});

localStorage.setItem(
"history",
JSON.stringify(history)
);

updateUI();
loadHistory();
closeModal();

alert(
`Thank you for contributing $${amount.toLocaleString()}!`
);

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
window.addEventListener("load", () => {

updateUI();
loadUserProfile();
loadHistory();
loadNavbarProfile();

});

function loadUserProfile(){

const user = JSON.parse(localStorage.getItem("user"));

if(!user) return;

const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("userEmail");

if(nameEl) nameEl.textContent = user.name;
if(emailEl) emailEl.textContent = user.email;

}
function loadHistory(){

const list =
document.getElementById("historyList");

if(!list) return;

let history =
JSON.parse(localStorage.getItem("history")) || [];

if(history.length === 0){

list.innerHTML =
"<li>No contributions yet.</li>";

return;
}

list.innerHTML = "";

history.forEach(item => {

const li =
document.createElement("li");

li.textContent =
"$" + item.amount +
" pledged on " +
item.date;

list.appendChild(li);

});

}

const amountInput = document.getElementById("customAmount");

if(amountInput){

amountInput.addEventListener("input", () => {

const amount = Number(amountInput.value) || 0;

document.getElementById(
"contributionPreview"
).textContent =
"Contribution Amount: $" +
amount.toLocaleString();

});

}
function loadNavbarProfile(){

const user =
JSON.parse(localStorage.getItem("user"));

if(!user) return;

const name =
document.getElementById("userNameDisplay");

const email =
document.getElementById("userEmailDisplay");

if(name) name.textContent = user.name;
if(email) email.textContent = user.email;

}

const profileBtn =
document.getElementById("profileBtn");

if(profileBtn){

profileBtn.addEventListener("click", () => {

const dropdown =
document.getElementById("profileDropdown");

if(dropdown.style.display === "block"){
dropdown.style.display = "none";
}else{
dropdown.style.display = "block";
}

});

}

function logout(){

localStorage.removeItem("user");

alert("Logged out successfully");

window.location.href = "index.html";

}