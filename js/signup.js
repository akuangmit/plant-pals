function sign_up(){
    var firstname = $("#firstNameInput");
    var lastname = $("#lastNameInput");
    var email = $("#email");
    var password = $("#passwordInput");
    var repeatPassword = $("#repeatPassword");
    var users = load('users');

    if (email.val().indexOf('@') == -1 || email.val().indexOf('.') == -1) {
        alert('Please type in a valid email address.')
    } else if (firstname.val() == '') {
        alert('Please fill out all fields.')
    } else if (lastname.val() == '') {
        alert('Please fill out all fields.')
    } else if (password.val() == '') {
        alert('Please fill out all fields.')
    } else if (repeatPassword.val() == '') {
        alert('Please fill out all fields.')
    } else if (password.val()!=repeatPassword.val()){
    	alert("Passwords do not match. Try signing up again.");
        password.val("")
        repeatPassword.val("")
    } else if (email.val() in users){
    	alert("Email account already exists. Try logging in.");
        window.location.href="signup.html";
    } else{
        var name = firstname.val() +" "+lastname.val() ;

        // add user to database
        users[email.val() ] = name;
        save('users',users);

        // add set user as logged in
        localStorage.setItem('email',email.val());

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

$("#repeatPassword").keypress(function(e) {
    if (e.which === 13) {
        sign_up();
    };
});
    