function log_in(){
    var email = $("#email");
    var form = $("#loginForm");
    var users = load('users');
    if (!(email.val() in users)){
    	form.attr("action", "login.html");
    	alert("Email account does not exist. Try logging in with a different email, or try signing up.");
    }
    else{
    	localStorage.setItem("email", email.val());
    	form.attr("action", "index.html");
    }
};
    