// Adds a plant onto our profile page.
// This function only deals with the interface and does not modify the database.
function add_plant(id, plant) {
	var name = plant.name.toLowerCase();
	var image = plant.image;
	var owned_since = plant.owned_since;
	var related_posts = plant.related_posts;

	var plant_info;
	var plant_info_all = load('plant_info_all');
	if(name in plant_info_all) {
		plant_info = plant_info_all[name];
	} else {
		plant_info = plant_info_all["default"];
	}

	// set up default
	var img_div = '<img src="../img/sprout.svg">';
	// change to what user uploaded if it is valid
	if (image !== undefined) { img_div = '<img src="../img/'+ image + '">'};

	// change to unknown if undefined
	if (owned_since === undefined) { owned_since = "unknown"; }

	var plant_div = '<div class="plant-div">' +
	  '<div class="left-container">' +
	    '<div class="plant-profile-container">' +
          img_div +
          '<div id="profile-top">' +
            '<div id="plant-name">' +
              '<span class="plant-title">' + name +' </span>' +
              '<button id="edit-button"> ✎ </button>' +
            '</div>' +
            '<div id="owned-by-date"> Owned since ' + owned_since + ' </div>' +
          '</div>' +
        '</div>' +
        '<div class="posts-container empty">' +
                'No posts about this plant yet!' +
              '</div>' +
/*
        '<div class="posts-container">' +
          '<div class="post" id="first-post" onclick="postClicked(1)">' +
            '<div class="top">' +
              '<p class="title"> FIRST POST TITLE </p>' +
              '<div class="body">' +
                '<p>' +
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                '</p>' +
              '</div>' +
            '</div>' +
            '<div class="date">' +
              '4/3/18' +
            '</div>' +
          '</div>' +
          '<div class="post" id="second-post" onclick="postClicked(2)">' +
            '<div class="top">' +
              '<p class="title"> SECOND POST TITLE </p>' +
              '<div class="body">' +
                '<p>' +
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                '</p>' +
              '</div>' +
            '</div>' +
            '<div class="date">' +
              '3/18/18' +
            '</div>' +
          '</div>' +
          '<div class="post" id="third-post" onclick="postClicked(3)">' +
            '<div class="top">' +
              '<p class="title"> THIRD POST TITLE </p>' +
              '<div class="body">' +
                '<p>' +
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                '</p>' +
              '</div>' +
            '</div>' +
            '<div class="date">' +
              '2/13/18' +
            '</div>' +
          '</div>' +
        '</div>' +*/
      '</div>' +

      '<div class="content-container">' +
        '<div id="info">' +
          '<p><img src="../img/drop.svg" align="left" class="image"> <span style="font-weight:bold"> Water: </span> ' + plant_info.water + ' </p>' +
          '<p><img src="../img/sun.svg" align="left" class="image"> <span style="font-weight:bold"> Sunlight: </span> ' + plant_info.sunlight + ' </p>' +
          '<p><img src="../img/plant.svg" align="left" class="image"> <span style="font-weight:bold"> Plant During: </span> ' + plant_info.plant_during + ' </p>' +
          '<p><img src="../img/flower.svg" align="left" class="image"> <span style="font-weight:bold"> Blooming Season: </span> ' + plant_info.blooming_season + ' </p>' +
        '</div>' +
      '</div>' +
    '</div>';

	$("#plant-list").prepend(plant_div);
}

// Get the modal
var modal = $('#add-plant');

// Add plant to database
$("#add-plant-submit").click(function(e) {
	modal.css("display", "none");
	var plantType = $("#plant-type").val();
	var picture = $("#pic").val();
	var dateAcquired = $("#date-acquired").val();

	plant_data = {
		name: plantType,
		image: picture,
		owner_since: dateAcquired,
		related_posts: []
	};
	// save into local storage
	var user_plant_data = load('user_plant_data');
	user_plant_data[username].push(plant_data);
	console.log('type: ' + plantType);
	save('user_plant_data', user_plant_data);

	// change interface
	add_plant(user_plant_data[username].length, plant_data);
});

function load_plants() {
	$("#plant-list").empty();
    $("#feed").empty();

	// initialize for new members
	var user_plant_data = load('user_plant_data');
	if (!(username in user_plant_data)){
		user_plant_data[username] = []
		save('user_plant_data',user_plant_data);
	}

	var plants = user_plant_data[username];
	for(var i=0; i<plants.length; i++) {
		add_plant(i, plants[i]);
	}

	if(plants.length === 0) {
		$("#plant-list").html("<div class='no-plants'> You haven't added any plants yet. </div>");
	}

}

// this is the database that maps from user -> plants owned
var user_plant_data = {
	"Sally Planter" : [
		{
			name: "Spider Plant",
			image: "sample-image.jpeg",
			owned_since: "4/10/18",
			related_posts: []
		},
		{
			name: "Rose Bush",
			image: "sample-image.jpeg",
			owned_since: "3/12/17",
			related_posts: []
		},
	],
	"Jane Doe" : []
}

// this is our internal database of information for plants
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
	"default" : {
		water: "unknown",
		sunlight: "unknown",
		plant_during: "unknown",
		blooming_season: "unknown"
	}
}

$( document ).ready(function() {
	if(!localStorage.getItem('plant_info_all')) {
	  save('plant_info_all', plant_info_all);
	}
	if(!localStorage.getItem('user_plant_data')) {
	  save('user_plant_data', user_plant_data);
	}
	load_plants();
});
