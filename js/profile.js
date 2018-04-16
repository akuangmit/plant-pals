function postClicked(postID) {
  window.location.replace("index.html");
}

// this is the database that maps from user -> plants owned
var user_plant_data = {
	"John Doe" : [
		{
			name: "Spider Plant",
			image: "sample_image.jpeg",
			owned_since: "4/10/18",
			related_posts: []
		},
		{
			name: "Rose Bush",
			image: "sample_image.jpeg",
			owned_since: "3/12/17",
			related_posts: []
		},
	],
	"Jane Doe" : []
}

// this is our internal database of information for plants
var plant_info = {
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
	}
}