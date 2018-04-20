function password_reset(){
	alert("Password reset email has been sent to your email address. Now returning to login page.");
	var form = document.getElementById("forgotForm");
	form.action = "login.html";
}

function back(){
	var form = document.getElementById("cancelForm");
	form.action = "login.html";
}