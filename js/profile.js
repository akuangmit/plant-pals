function postClicked(postID) {
  window.location.href = "index.html";
}

$("#name").html(username);

$("#prof-picture").html('<p><img src="../img/profile-pictures/'+
	load('name_to_profile')[username]
	+'" align="center" class="image"></p>');