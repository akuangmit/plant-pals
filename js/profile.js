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

// set name on top of profile
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

// When the user clicks on <span> (x), close the modal
$("#add-plant .close")[0].onclick = function() {
    modal.css("display", "none");
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.css("display", "none");
//     }
//     console.log("ok")
// }

// load posts, after the user clicks on My Posts.
function load_my_posts() {
	$("#plant-infobox").empty();
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

  $("#post-tab").addClass("active");
  $("#plant-tab").removeClass("active");
}

function load_plant() {
	$("#plant-infobox").empty();
    $("#feed").empty();

    // initialize for new members
	var user_plant_data = load('user_plant_data');
	if (!(profileToLoad in user_plant_data)){
		user_plant_data[profileToLoad] = []
		save('user_plant_data',user_plant_data);
	}

	var plants = user_plant_data[profileToLoad];

    // load infobox container on the left
    var plant_infobox_left = 
        '<div id="plant-info" class="left-container"></div>';

    // load infobox on right
    var plant_infobox_right = 
        '<div id="plant-list" class="right-container"></div>';

    $("#plant-infobox").html(plant_infobox_left + plant_infobox_right);

    // load default plant
    if(plants.length === 0) {
		$("#plant-profile-container").html("<div class='no-plants'> " + hasnotString + " added any plants yet. </div>");
	} else {
		var selected_plant_ind = 0;
		
		for (var i = 0; i < plants.length; i++) {
	    	var plant_item = '<div id="plant' + i + '" class="mini-plant" onclick="show_plant('+ i +')">'+
	                '<img src="../img/sprout.svg">'+
	                '<span>' + plants[i].name + '</span>'+
	              '</div>';
	        $("#plant-list").append(plant_item);
	    }

	    show_plant(selected_plant_ind);
	}

	$("#post-tab").removeClass("active");
	$("#plant-tab").addClass("active");

}

// Adds a plant onto our profile page.
// This function only deals with the interface and does not modify the database.
function show_plant(plantnum) {
	var user_plant_data = load('user_plant_data');
	var plants = user_plant_data[profileToLoad]
	var plant = plants[plantnum];

	// remove active plant for everyone else
	for (var i = 0; i < plants.length; i++) {
    	$("#plant"+i).removeClass("active-plant");
    }

	$("#plant"+plantnum).addClass("active-plant");

	var name = plant.name;
	var image = plant.image;
	var owned_since = plant.owned_since;
	var related_posts = plant.related_posts;
	var water = plant.water;
	var sunlight = plant.sunlight;
	var plant_during = plant.plant_during;
	var blooming_season = plant.blooming_season;

	// set up default
	var img_div = '<img src="../img/sprout.svg">';
	// change to what user uploaded if it is valid
	if (image !== undefined) { img_div = '<img class="plant-img" src="../img/'+ image + '">'};

	// change to unknown if undefined
	if (owned_since === "") { owned_since = "unknown"; }

	var plant_div ='<div class="plant-profile-container">'+
                  img_div +
                    '<div id="profile-top">'+
                      '<div id="plant-name">'+
                        '<span class="plant-title">' + name + '</span>'+
                        '<button id="edit-button">&#9998;</button>'+
                      '</div>'+
                      '<div id="owned-by-date"> Owned since ' + owned_since + ' </div>'+
                    '</div>'+
                '</div>'+
                  '<div class="content-container">'+
                    '<div id="info">'+
                      '<div>'+
                        '<p><img src="../img/drop.svg" align="left" class="image"> <span style="font-weight:bold"> Water: </span> ' + water + ' </p>'+
                        '<p><img src="../img/sun.svg" align="left" class="image"> <span style="font-weight:bold"> Sunlight: </span> ' + sunlight + ' </p>'+
                      '</div>'+
                      '<div>'+
                        '<p><img src="../img/plant.svg" align="left" class="image"> <span style="font-weight:bold"> Plant During: </span> ' + plant_during + ' </p>'+
                        '<p><img src="../img/flower.svg" align="left" class="image"> <span style="font-weight:bold"> Blooming Season: </span> ' + blooming_season + ' </p>'+
                      '</div>'+
                    '</div>'+
                  '</div>';

	$("#plant-info").html(plant_div);
}

// Add listener for adding a plant to our database
$("#add-plant-submit").click(function(e) {
	var plantType = $("#plant-type").val();
	var picture = $("#pic").val();
	var dateAcquired = $("#date-acquired").val();

	if (plantType !== "") {
		modal.css("display", "none");
		var dateString = "";

		if (dateAcquired != "") {
			var date = new Date(dateAcquired);
		    var dd = date.getDate()+1;
		    var mm = date.getMonth()+1; //January is 0!
		    var yyyy = date.getFullYear();
		    if(dd<10) {
		        dd = '0'+dd
		    }
		    if(mm<10) {
		        mm = '0'+mm
		    }
		    dateString = mm + '/' + dd + '/' + yyyy;
		}

		plant_data = {
			name: plantType,
			image: picture,
			owned_since: dateString,
			related_posts: [],
			water: $("#water-amount").val(),
			sunlight: $("#sunlight-amount").val(),
			plant_during: $("#plant-season").val(),
			blooming_season: $("#bloom-season").val(),
		};

		// save into local storage
		var user_plant_data = load('user_plant_data');
		user_plant_data[username].push(plant_data);
		save('user_plant_data', user_plant_data);
	} else {
		alert("To add a plant, you must specify the plant's species name.");
	}
});

// this is the database that maps from user -> plants owned
var user_plant_data = {
	"Sally Planter" : [
		{
			name: "Spider Plant",
			image: "sample-image.jpeg",
			owned_since: "4/10/18",
			related_posts: [],
			water: "2x / week",
			sunlight: "Medium",
			plant_during: "February",
			blooming_season: "April - June"
		},
		{
			name: "Rose Bush",
			image: "sample-image.jpeg",
			owned_since: "3/12/17",
			related_posts: [],
			water: "4x / week",
			sunlight: "Low",
			plant_during: "June",
			blooming_season: "May - August"
		},
	],
	"Jane Doe" : []
}

// this is our internal database of default information for plants
var plant_info_all = {
	"spider plant" : {
		water: "2x / week",
		sunlight: "Medium",
		plant_during: "February",
		blooming_season: "April - June"
	},
	"rose bush" : {
		water: "4x / week",
		sunlight: "Low",
		plant_during: "June",
		blooming_season: "May - August"
	},
	//TODO remove default!!!
	"default" : {
		water: "unknown",
		sunlight: "unknown",
		plant_during: "unknown",
		blooming_season: "unknown"
	}
}

// autocomplete for adding plants
$("#plant-type").autocomplete({
	source: Object.keys(plant_info_all),
	appendTo: "#plant-type-div"
});

$( document ).ready(function() {
	if(!localStorage.getItem('plant_info_all')) {
	  save('plant_info_all', plant_info_all);
	}
	if(!localStorage.getItem('user_plant_data')) {
	  save('user_plant_data', user_plant_data);
	}
	load_plant();
});
