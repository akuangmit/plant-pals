function postClicked(postID) {
  window.location.href = "index.html";
}

// set name to be loaded
var profileToLoad = localStorage.getItem('profileToLoad');
var hasnotString = "You haven't";

// set default plant to be first plant
if (localStorage.getItem("setting_plant") === null) {
	localStorage.setItem("setting_plant", 0);
} else {
	var last = localStorage.getItem("setting_plant");
	var num_plants = load('user_plant_data')[profileToLoad].length;
	if(num_plants <= last) {
		localStorage.setItem("setting_plant", 0);
	}
}

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
if (profileToLoad != username) {
  $("#prof-picture").html('<p><img src="../img/profile-pictures/'+
  	load('name_to_profile')[profileToLoad]
  	+'" align="center" class="image"></p>');
}
else {
  $("#prof-picture").html('<p><div class="tooltip"><label for="prof-image-upload"> <img src="../img/profile-pictures/'+
  	load('name_to_profile')[profileToLoad]
  	+'" align="center" class="prof-image tooltip"><span class="tooltiptext"> Click me to change your profile picture </span></label></div><input type="file" id="prof-image-upload" name="prof-pic" accept="image/*"></p>');
}


// set date joined
$("#joined-since").html("Member since " + load('member_since')[profileToLoad])

// if true, open modal; if false, close modal
function open_add_plant_modal(open) {
	$("#add-plant").css("display", open ? "block" : "none");
}

// Define the button that opens the modal
$("#add-button").click(function(e) {
	open_add_plant_modal(true);
});

// When the user clicks on <span> (x), close the modal
$("#add-plant .close")[0].onclick = function() {
    open_add_plant_modal(false);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
 if (event.target.className === "modal") {
     open_add_plant_modal(false);
 }
}

function show_plants() {
	$("#plant-infobox").css("display","");
	$("#feed").css("display","none");

	$("#post-tab").removeClass("active");
	$("#plant-tab").addClass("active");
}

function show_posts() {
	$("#plant-infobox").css("display","none");
	$("#feed").css("display","block");
	$("#post-tab").addClass("active");
  	$("#plant-tab").removeClass("active");
}

// load everything
function load_content() {
	// feed stuff
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

  //plant stuff
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
		$("#plant-infobox").html("<div class='no-plants' style='margin-top: 0px;'> " + hasnotString + " added any plants yet. </div>");
	}

  else {
		var selected_plant_ind = localStorage.getItem("setting_plant");
		for (var i = 0; i < plants.length; i++) {
	    	var plant_item = '<div id="plant' + i + '" class="mini-plant" onclick="show_plant('+ i +')">'+
	                '<img src="../img/sprout.svg">'+
	                '<span>' + plants[i].name + '</span>'+
	              '</div>';
	       $("#plant-list").append(plant_item);
	    }
	  show_plant(selected_plant_ind);
	}

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
	var description = plant.description;
	var related_posts = plant.related_posts;
	var water = plant.water;
	var sunlight = plant.sunlight;
	var plant_during = plant.plant_during;
	var blooming_season = plant.blooming_season;

	// set up default
	var img_div = '<img class="plant-img" src="../img/sprout.svg">';
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
                      '<div id="plant-description">' + description + ' </div>'+
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

	// remove edit button if someone else's profile
	if (profileToLoad != username) {
		$("#edit-button").css("display", "none");
	} else {
		// prefill for edit button
		$("#edit-button").click(function() {
			open_add_plant_modal(true);
			check_plant_type(name);
			$("#add-plant-submit").html("Save Plant");

			$("#plant-type").val(name);
			var date = owned_since.split("/");
			$("#date-acquired").val(date[2] + '-' + date[0] + '-' + date[1]);
			$("#description").val(description);
			$("#water-amount").val(water);
			$("#sunlight-amount").val(sunlight);
			$("#plant-season").val(plant_during);
			$("#bloom-season").val(blooming_season);
		});
	}
	localStorage.setItem("setting_plant", plantnum);
}

var saved = {}

// based on plant name, fill out rest of form
function fill_default() {
	var plantType = $("#plant-type").val();

	var checked = $("#default-checkbox").is(":checked");
	if(checked) {
		var plant_info_all = load('plant_info_all');
		var plant = plant_info_all[plantType];
		saved = {
			water: $("#water-amount").val(),
			sunlight: $("#sunlight-amount").val(),
			plant_during: $("#plant-season").val(),
			blooming_season: $("#bloom-season").val()
		}

		if(plant !== undefined) {
			fill_default_show(plant);
		}
	} else {
		fill_default_show(saved);
	}
}

// given plant information, we fill in the defaults.
function fill_default_show(plant) {
	$("#water-amount").val(plant.water);
	$("#sunlight-amount").val(plant.sunlight);
	$("#plant-season").val(plant.plant_during);
	$("#bloom-season").val(plant.blooming_season);
}

// Add listener for adding a plant to our database
$("#add-plant-submit").click(function(e) {
	var plantType = $("#plant-type").val();
	var picture = $("#pic").val();
	var dateAcquired = $("#date-acquired").val();
	var description = $("#description").val();

	if (plantType !== "") {
		open_add_plant_modal(false);
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
			description: description,
			related_posts: [],
			water: $("#water-amount").val(),
			sunlight: $("#sunlight-amount").val(),
			plant_during: $("#plant-season").val(),
			blooming_season: $("#bloom-season").val(),
		};

		if($("#add-plant-submit").text().includes("Save")) {
			// replace previously existing plant
			// when we click "save plant", this will add a new plant
			// so we delete the old one
			var user_plant_data = load('user_plant_data');
			var plantnum = localStorage.getItem("setting_plant");
			user_plant_data[username][plantnum] = plant_data;
			save('user_plant_data', user_plant_data);
		} else {
			// save new plant into local storage
			var user_plant_data = load('user_plant_data');
			user_plant_data[username].push(plant_data);
			save('user_plant_data', user_plant_data);
		}
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
			owned_since: "04/10/2018",
			description: "This is my most recent spider plant.",
			related_posts: [],
			water: "2x / week",
			sunlight: "Medium",
			plant_during: "February",
			blooming_season: "April - June"
		},
		{
			name: "Rose Bush",
			image: "sample-image.jpeg",
			owned_since: "03/12/2017",
			description: "Hard to care for, but super rewarding!",
			related_posts: [],
			water: "4x / week",
			sunlight: "Low",
			plant_during: "June",
			blooming_season: "May - August"
		},
	],
	"Jane Doe" : [],
	"John Doe" : [
		{
			name: "Daisy",
			image: "sample-image.jpeg",
			owned_since: "05/08/2018",
			description: "Hoping to give it to Mom on mother's day.",
			related_posts: [],
			water: "4x / week??",
			sunlight: "Shady",
			plant_during: "Late Spring",
			blooming_season: "Mid Summer - Early Fall"
		},
		{
			name: "Glory of the Snow",
			image: "sample-image.jpeg",
			owned_since: "01/04/2018",
			description: "Got this plant because of its cool name!",
			related_posts: [],
			water: "2x / Week",
		    sunlight: "All Sun Types",
		    plant_during: "Fall",
		    blooming_season: "Early Spring"
		}
	]
}

// this is our internal database of default information for plants
var plant_info_all = {
	"Spider Plant" : {
		water: "2x / week",
		sunlight: "Medium",
		plant_during: "February",
		blooming_season: "April - June"
	},
	"Rose Bush" : {
		water: "4x / week",
		sunlight: "Low",
		plant_during: "June",
		blooming_season: "May - August"
	},
  "Aster" : {
    water: "4x / week",
    sunlight: "Full sun",
    plant_during: "Early Spring",
    blooming_season: "Late Spring - Early Fall"
  },
  "Buttercup" : {
    water: "5x / week",
    sunlight: "Partial Shade",
    plant_during: "Early Spring",
    blooming_season: "Late Spring - Early Summer"
  },
  "Carnation" : {
    water: "Daily",
    sunlight: "Full Sun",
    plant_during: "Late Spring",
    blooming_season: "Mid Summer - Late Summer"
  },
  "Cosmos" : {
    water: "3x / Week",
    sunlight: "Partial Shade",
    plant_during: "Late Spring",
    blooming_season: "Mid Summer - Mid Fall"
  },
  "Daisy" : {
    water: "Daily",
    sunlight: "Partial Shade",
    plant_during: "Late Spring",
    blooming_season: "Mid Summer - Early Fall"
  },
  "Glory of the Snow" : {
    water: "2x / Week",
    sunlight: "All Sun Types",
    plant_during: "Fall",
    blooming_season: "Early Spring"
  },
  "Hyacinth" : {
    water: "4x / Week",
    sunlight: "Full Sun",
    plant_during: "Spring",
    blooming_season: "Mid Summer"
  },
  "Jacob's Ladder" : {
    water: "6x / Week",
    sunlight: "All Sun Types",
    plant_during: "Late Spring",
    blooming_season: "Mid Summer"
  },
  "Spring Snowflake" : {
    water: "3x / Week",
    sunlight: "Full Sun / Partial Shade",
    plant_during: "Fall",
    blooming_season: "Early Spring"
  },
  "Violet" : {
    water: "6x / Week",
    sunlight: "Full Sun / Partial Shade",
    plant_during: "Any Time",
    blooming_season: "All Seasons"
  },
  "Zinnia" : {
    water: "6x / Week",
    sunlight: "Full Sun ",
    plant_during: "Spring",
    blooming_season: "Mid Summer - Fall"
  },
}

// if disabled, show why
$("#default-checkbox-container").click(function() {
	if($("#default-checkbox").prop("disabled")) {
		if($("#plant-type").val() == "") {
			alert("Fill in a plant type to autofill care information.");
		} else {
			alert("Sorry, but we don't have information about plant type " + $("#plant-type").val() + " yet.")
		}
	}
});

function check_plant_type(val) {
	if(Object.keys(plant_info_all).includes(val)) {
  		$("#default-checkbox").prop("disabled", false);
  		$("#default-checkbox-container").removeClass("disabled");
	} else {
		$("#default-checkbox").prop("disabled", true);
		$("#default-checkbox-container").addClass("disabled");
	}
}

// autocomplete for adding plants
$("#plant-type").autocomplete({
	source: Object.keys(plant_info_all),
	appendTo: "#plant-type-div",
	select: function(event, ui) {
		check_plant_type(ui.item.label);
	}
});

$("#plant-type").keyup(function(e) {
	check_plant_type($("#plant-type").val());
});

$( document ).ready(function() {
	if(!localStorage.getItem('plant_info_all')) {
	  save('plant_info_all', plant_info_all);
	}
	if(!localStorage.getItem('user_plant_data')) {
	  save('user_plant_data', user_plant_data);
	}
	load_content();
	show_plants();
});
