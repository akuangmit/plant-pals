function postClicked(postID) {
  window.location.href = "index.html";
}

// set name
$("#name").html(username);

// set profile picture
$("#prof-picture").html('<p><img src="../img/profile-pictures/'+
	load('name_to_profile')[username]
	+'" align="center" class="image"></p>');

// set date joined
$("#joined-since").html("Member since " + load('member_since')[username])