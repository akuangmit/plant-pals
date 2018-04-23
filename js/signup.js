function sign_up(){
    var firstname = document.getElementById("firstNameInput");
    var lastname = document.getElementById("lastNameInput");
    var email = document.getElementById("email");
    var password = document.getElementById("passwordInput");
    var repeatPassword = document.getElementById("repeatPassword");
    var users = load('users');
    if (password.value!=repeatPassword.value){
    	alert("Passwords do not match. Try signing up again.");
        window.location.href="signup.html";
    }
    else if (email.value in users){
    	alert("Email account already exists. Try logging in.");
        window.location.href="signup.html";
    }
    else{
        var name = firstname.value+" "+lastname.value;

        // add user to database
        users[email.value] = name;
        save('users',users);

        // add set user as logged in
        localStorage.setItem('email',email.value);

        // add default pfp
        var name_to_profile = load('name_to_profile');
        name_to_profile[name] = "profile-grey.svg";
        save('name_to_profile', name_to_profile);

        // add date of registration
        var member_since = load('member_since');
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        }
        if(mm<10) {
            mm = '0'+mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        member_since[name] = today;
        save('member_since',member_since);

        // say that the user hasn't seen the homepage yet
        localStorage.setItem('loadTutorial', true);

        // redirect to home page
    	window.location.href="index.html";
    }
};
    