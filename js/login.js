function log_in(){
    var email = document.getElementById("email");
    var form = document.getElementById("loginForm");
    if (localStorage.getItem(email.value)==null){
    	form.action = "login.html";
    	alert("Email account does not exist. Try logging in with a different email, or try signing up.");
    }
    else{
    	form.action = "index.html";
    }
};
    