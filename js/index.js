function add_comment(postid, comment, animate) {
	var author = comment.author;
	var content = comment.content;
	var time = comment.time;

	// change the interface
	$(".add-comment").val("");
	var container = $("#" + postid + " .bottom-container .comment-container");
	if (animate) {
		var newComment = $("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>").hide();
		container.append(newComment);
		newComment.show('slow');
	} else {
		var newComment = $("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>");
		container.append(newComment);
	}
	
}

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
	modal.css("display", "none");
	var title = $("#post-title").val();
	var content = $("#post-content").val();
	var imageName = $("#file-upload").val();

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
	add_post(feed.length-1, post);
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
		title: "Anyone Interested In a Community Day Meetup?",
		content: "I am a novice plant owner and am wondering if there are others who are interested in a casual meetup this Saturday April 21st at 11am, with lunch at Golden Gate Park's Strawberry Hill location in San Francisco. Please comment if you are interested!",
		images: [],
		comments: [
			{
				author: "Angela",
				content: "Yes, I'm interested! I can also help organize the meetup :)",
				time: "1 minute ago"
			}
		]
	},
	{
		author: "Sally Planter",
		likes: 101,
		title: "How to water plants",
		content: "Watering your plants can be hard, but you can do it! Try holding the watering can like in this picture, and you should be all set. Specifically, tilt the watering can to about a 45 degree angle, and make sure that you stand up straight. Since you will likely be watering other plants in addition to this one, maintaining good posture is important to prevent back injuries and other problems that may arise due to bad posture. You do not want the process of plant-care to hinder your everyday activities!",
		images: ["watering_can.jpeg"],
		comments: [
			{
				author: "Jake",
				content: "Thanks so much Sally! That really helped me with taking care of my flowers.",
				time: "2 hours ago"
			}
		]
	},
	{
		author: "John Doe",
		likes: 15,
		title: "Take a look at my new awesome spider plant!",
		content: "Today is a nice sunny day and I thought it was a good time to take a picture of my spider plant! It has been with me for 6 months and I'm proud of it :D The main challenge that I had in taking care of this spider plant was that in San Francisco, there was not that much sunlight in the past few months.\n In the future, I am planning to expand my collection of plants and try to grow other plants that are edible and can be used in cooking. These include various vegetables such as carrots and cabbage, and basic fruits such as apples, oranges, and lemons. Hopefully I am successful in this journey and can show more posts in the future :D If any experienced plant owners have any advice to offer in taking care of these plants, please feel free to share in the comments below! I am open to hearing your experiences in taking care of these plants, especially if there are common pitfalls to be aware of.",
		images: ["sample-image.jpeg"],
		comments: [
			{
				author: "Jenny",
				content: "OMG that looks so nice <3 Hopefully my plant can look like that someday!",
				time: "1 day ago"
			}
		]
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
	load_posts();
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

	console.log(file);
}
