function sign_up(){
    var firstname = document.getElementById("firstNameInput");
    var lastname = document.getElementById("lastNameInput");
    var email = document.getElementById("email");
    var password = document.getElementById("passwordInput");
    var repeatPassword = document.getElementById("repeatPassword");
    var form = document.getElementById("signupForm");
    if (password.value!=repeatPassword.value){
    	form.action = "signup.html";
    	alert("Passwords do not match. Try signing up again.");
    }
    else if (localStorage.getItem(email.value)!=null){
    	form.action = "signup.html";
    	alert("Email account already exists. Try logging in.");
    }
    else{
    	localStorage.setItem(email.value, firstname.value+" "+lastname.value); 
    	form.action = "index.html";
    }
};
    