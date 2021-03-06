var modal = $("#create-post");
var btn = document.getElementById("add-post");
var span = document.getElementsByClassName("close")[0];

if (localStorage.getItem('loadTutorial') === "true") {
	$(".tutorial").css("display", "block");
	localStorage.setItem('loadTutorial', false);
} else {
	$(".tutorial").css("display", "none");
}

$("#add-post").click(function(e) {
	modal.css("display", "block");
});

$(".close").click(function(e) {
	modal.css("display", "none");
});

$("#submit-post").click(function(e) {
	var title = $("#post-title").val();
	var content = $("#post-content").val();
	var imageName = $("#file-upload").val();

	if (title != "" && content != "") {

		// clear all content
		$("#post-title").val("");
		$("#post-content").val("");
		$("#file-upload").val("");
		hide_create_post();

		if (imageName !== "") {
			// User uploaded some sort of image

			post = {
				author: load('users')[localStorage.getItem('email')],
				likes: 0,
				title: title,
				content: content,
				images: ["fertilizer.jpg"],
				comments:[]
			};
		}

		else {
			post = {
				author: load('users')[localStorage.getItem('email')],
				likes: 0,
				title: title,
				content: content,
				images: [],
				comments:[]
			};
		}

		// save into local storage
		var feed = load('feed');
		feed.push(post);
		save('feed',feed);

		// change interface
		add_post(feed.length-1, feed.length-1, post, $("#feed"));
	}
	else {
		alert("Your post must contain a title and body text.");
	}
});

$("#add-post")
.mouseover(function() {
	$("#add-post-descriptor").fadeIn(100);
	$(".dot").css("box-shadow", "0px 8px 10px var(--border-grey, grey)");
})

.mouseout(function() {
	$("#add-post-descriptor").fadeOut(100);
	$(".dot").css("box-shadow", "0px 5px 5px var(--border-grey, grey)");
});

$("#signupButton").click(function() {
	$(".tutorial").css("display", "block");
	$('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
	});
});

/*
if (tutorialState == 0) {
	$(".tutorial").css("display", "block");
	$('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
	});
} else {
	$('html, body').css({
	    overflow: 'auto',
	    height: 'auto'
	});
}*/

// data for populating feed.
var feed_base = [
	{
		author: "Jane Doe",
		likes: 0,
		title: "Advice Regarding What Other Plants to Take Care Of?",
		content: "I am a novice plant owner and have been taking care of spider plants. I am wondering if any expert has advice regarding what plants I should take care of next!",
		images: [],
		comments: [
			{
				author: "Angela Leung",
				content: "I am also in the same boat, and am interested!",
				time: "1 minute ago"
			}
		],
		search_only: false
	},
	{
		author: "Sally Planter",
		likes: 101,
		title: "How to water plants",
		content: "Watering your plants can be hard, but you can do it! Tilt the watering can to about a 45 degree angle, and make sure that you stand up straight. Since you will likely be watering other plants in addition to this one, maintaining good posture is important to prevent back injuries and other problems that may arise due to bad posture. You do not want the process of plant-care to hinder your everyday activities!",
		images: ["watering_can.jpeg"],
		comments: [
			{
				author: "Jake Smith",
				content: "Thanks so much Sally! That really helped me with taking care of my flowers.",
				time: "3 hours ago"
			},
			{
				author: "Catherine Chen",
				content: "Yeah, this was super informative. Thanks so much!",
				time: "2 hours ago"
			},
			{
				author: "John Doe",
				content: "Oh man Sally, I shoulda read your post earlier, I strained my back watering my plants :(",
				time: "1 hour ago"
			},
			{
				author: "Sally Planter",
				content: "Thanks for reading my article guys! I hope you find it helpful.",
				time: "30 minutes ago"
			}
		],
		search_only: false
	},
	{
		author: "John Doe",
		likes: 15,
		title: "Take a look at my new awesome spider plant!",
		content: "Today is a nice sunny day and I thought it was a good time to take a picture of my spider plant! It has been with me for 6 months and I'm proud of it :D The main challenge that I had in taking care of this spider plant was that in San Francisco, there was not that much sunlight in the past few months.\n In the future, I am planning to expand my collection of plants and try to grow other plants that are edible and can be used in cooking. These include various vegetables such as carrots and cabbage, and basic fruits such as apples, oranges, and lemons. Hopefully I am successful in this journey and can show more posts in the future :D If any experienced plant owners have any advice to offer in taking care of these plants, please feel free to share in the comments below! I am open to hearing your experiences in taking care of these plants, especially if there are common pitfalls to be aware of.",
		images: ["sample-image.jpeg"],
		comments: [
			{
				author: "Jenny Li",
				content: "OMG that looks so nice <3 Hopefully my plant can look like that someday!",
				time: "1 day ago"
			}
		],
		search_only: false
	},
	{
		author: "Jane Doe",
		likes: 601,
		title: "How to Care for Your Spider Plant",
		content: "Hi everyone! I'm super excited to show everyone my new spider plant! She's a real beauty, and I can't wait to watch her grow",
		images: ["sample-image.jpeg"],
		comments: [
			{
				author: "Bobby Patterson",
				content: "Keep us updated on your new plant's growing progress!",
				time: "2 hours ago"
			},
			{
				author: "Angela Leung",
				content: "Looks beautiful!",
				time: "1 minute ago"
			}
		],
		search_only: true
	},
	{
		author: "Sally Planter",
		likes: 3215,
		title: "An Expert Guide on How to Take Care of Your Spider Plant",
		content: "My name is Sally Planter and I'm an award winning gardener and spider plant enthusiast. Spider plants are one of my favorite plants to take care of because of their low maintenance needs, but high utility. You can use them as a great way to green up a place in any room, outside in a garden to complement flowers, or even hung from a sky pot.<br> <br>Here are some of my favorite tips for how to take care of your spider plant:<br>- Give it just enough water. About two times per week is just about perfect. Any more, and you could overwater this native desert plant. Any less, and it won't be as green as it could be.<br><br>- On the other hand, spider plants love sunlight, so be sure to give your plant plenty of sunshine. If you're growing your plant indoors, try to rotate the pot outside at least once a week so it can get it's weekly fix of sunshine.",
		images: [],
		comments: [
			{
				author: "George Wick",
				content: "Thanks for these helpful tips Sally! Love seeing pictures of your spider plants",
				time: "2 days ago"
			}
		],
		search_only: true
	}
];

var name_to_liked_posts = {
	"Jane Doe": {},
	"John Doe": {},
	"Sally Planter": {}
}

$( document ).ready(function() {
	if(!localStorage.getItem('feed')) {
	  save('feed', feed_base);
	}
	if(!localStorage.getItem('name_to_liked_posts')) {
	  save('name_to_liked_posts', name_to_liked_posts);
	}
	load_posts('feed');
});

var local_storage_name_to_img = {
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function saveImage(input) {
	var file = document.querySelector('input[type=file]').files[0];

	var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

	imgCanvas.width = file.width;
	imgCanvas.height = file.height;

	var reader = new FileReader();
	/*reader.onload = function (e) {
		$('#file-upload')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
	};
	reader.readAsDataURL(input.files[0]);
	*/
}
