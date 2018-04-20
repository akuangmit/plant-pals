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

// adding plant modal

// Get the modal
var modal = $("#add-plant");

// Define the button that opens the modal
$("#add-button").click(function(e) {
	modal.css("display", "block");
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.css("display", "none");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.css("display", "none");
    }
}

function load_my_posts() {
	$("#plant-list").empty();
	$("#feed").empty();
	var feed = load('feed');
	var count = 0;
	for(var i=0; i<feed.length; i++) {
		if (feed[i].author == username) {
			add_post(count, feed[i], $("#feed"));
			count += 1;
		}
	}

  var postTab = document.getElementById("post-tab");
  postTab.className = "tablinks active";

  var plantTab = document.getElementById("plant-tab");
  plantTab.className = "tabLinks";
}
