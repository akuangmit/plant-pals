function postClicked(postID) {
  window.location.href = "index.html";
}

// set name to be loaded
var profileToLoad = localStorage.getItem('profileToLoad');

var hasnotString = "You haven't";

// if profileToLoad is not me, remove the add plant button
// also say "their plants" and "their posts" instead of "my"
if(profileToLoad != username) {
	var firstname = profileToLoad.split(" ")[0];
	$("#add-button-div").css("display", "none");
	$("#plant-tab").html(firstname +"'s plants");
	$("#post-tab").html(firstname + "'s posts");
	hasnotString = firstname + " hasn't";
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

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.css("display", "none");
//     }
//     console.log("ok")
// }

function load_my_posts() {
	$("#plant-list").empty();
	$("#feed").empty();
	var feed = load('feed');
	var count = 0;
	for(var i=0; i<feed.length; i++) {
		if (feed[i].author == profileToLoad) {
			add_post(count, i, feed[i], $("#feed"));
			count += 1;
		}
	}

  if (count === 0) {
    $("#feed").html("<div class='no-posts'> " + hasnotString + " written any posts yet. </div>");
  }

  var postTab = document.getElementById("post-tab");
  postTab.className = "tablinks active";

  var plantTab = document.getElementById("plant-tab");
  plantTab.className = "tabLinks";
}

function load_plants() {
	$("#plant-list").empty();
    $("#feed").empty();

	// initialize for new members
	var user_plant_data = load('user_plant_data');
	if (!(profileToLoad in user_plant_data)){
		user_plant_data[profileToLoad] = []
		save('user_plant_data',user_plant_data);
	}

	var plants = user_plant_data[profileToLoad];
	for(var i=0; i<plants.length; i++) {
		add_plant(i, plants[i]);
	}

	if(plants.length === 0) {
		$("#plant-list").html("<div class='no-plants'> " + hasnotString + " added any plants yet. </div>");
	}

	var postTab = document.getElementById("post-tab");
	postTab.className = "tablinks";

	var plantTab = document.getElementById("plant-tab");
	plantTab.className = "tabLinks active";

}