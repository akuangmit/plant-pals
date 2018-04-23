function log_in(){
    var email = $("#email");
    var users = load('users');
    if (!(email.val() in users)){
    	alert("Email account does not exist. Try logging in with a different email, or try signing up.");
        window.location.href="login.html";
    }
    else{
    	localStorage.setItem("email", email.val());
    	window.location.href="index.html";
    }
};
    