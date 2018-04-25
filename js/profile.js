function postClicked(postID) {
  window.location.href = "index.html";
}

// set name to be loaded
profileToLoad = localStorage.getItem('profileToLoad');

// if profileToLoad is not me, remove the add plant button
if(profileToLoad != username) {
	$("$add-button-div").css("display", "none");
}

$("#name").html(profileToLoad);

// set profile picture
$("#prof-picture").html('<p><img src="../img/profile-pictures/'+
	load('name_to_profile')[profileToLoad]
	+'" align="center" class="image"></p>');

// set date joined
$("#joined-since").html("Member since " + load('member_since')[profileToLoad])

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
		if (feed[i].author == profileToLoad) {
			add_post(count, feed[i], $("#feed"));
			count += 1;
		}
	}

  var postTab = document.getElementById("post-tab");
  postTab.className = "tablinks active";

  var plantTab = document.getElementById("plant-tab");
  plantTab.className = "tabLinks";
}
