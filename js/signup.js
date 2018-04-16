//Messing around with local storage stuff idk.
function sign_up(){
    var username = document.getElementById("usernameInput");
    var password = document.getElementById("passwordInput");
    var email = document.getElementById("email");
    localStorage.setItem("username", username.value); 
    localStorage.setItem("password", password.value);
    localStorage.setItem("email", email.value); 
    var storedValue = localStorage.getItem("username");
    console.log(localStorage);
};
    