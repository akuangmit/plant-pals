function add_comment(postid, comment) {
	var author = comment.author;
	var content = comment.content;
	var time = comment.time;

	// change the interface
	var container = $("#" + postid + " .bottom-container .comment-container");
	container.append("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>");
	$(".add-comment").val("");
}

// how long a post can be before there's a "See More" button.
var max_post_length = 750;

function add_post(id, post) {
	var author = post.author;
	var content = post.content;
	var title = post.title;
	var likes = post.likes;
	var comments = post.comments;
	var images = post.images;
	var pfpfilename = load('name_to_profile')[author];

	// make "See More" if the post is too long
	if (content.length > max_post_length) {
		var shortened = content.substring(0,max_post_length);
		var rest = content.substring(max_post_length,content.length);
		content = shortened + '... <div onclick="expandPost('+id+', true)">See More</div>';
	}

	//console.log(images);

	var image_div = ''
	// modify content based on images
	for(var i = 0; i < images.length; i++) {
		image_div = '<img src="../img/'+images[i]+'" align="left" class="image">';
	}

	var like_img_div = '<img src="../img/heart-white.svg" onclick="likePost('+id+', true, '+likes+')"><p>Like</p><p class="number-likes">' + likes + ' likes</p>';
	// check to see if I already like this post
	var name_to_liked_posts = load('name_to_liked_posts');
	// initialize for new users
	if (!(username in name_to_liked_posts)) {
		name_to_liked_posts[username] = {};
		save('name_to_liked_posts',name_to_liked_posts);
	}
	if (id in name_to_liked_posts[username]) {
		like_img_div = "<img src='../img/heart-red.svg' onclick='likePost(" + id + ", false, " + (likes + 1) + ")'><p>Like</p><p class='number-likes'>" + (likes + 1) + " likes</p>";
	}

	// change the interface
	$("#feed").prepend('<div class="post" id="'+id+'"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><p>' + author + '</p></div><div class="like-container">' + like_img_div + '</div></div><div class="content-container"><h1>' + title + '</h1><p>' + image_div + '<div class="content-text">' + content + '</div></p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-'+id+'"></div></div>');

	// load existing comments
	for(var i = 0; i < comments.length; i++) {
		add_comment(id, comments[i]);
	}

	// add listener for adding new comments
	$(".add-comment").keypress(function(e) {
		if (e.which == 13) {
			var content = $("#" + id + " .add-comment").val();

			if (content != "") {
				comment = {
					author: username,
					content: content,
					time: "Just now"
				}
				// save into local storage
				var feed = load('feed');
				feed[id].comments.push(comment);
				save('feed',feed);

				add_comment(id, comment);
			}
		};
	});
}

function load_posts() {
	var feed = load('feed');
	for(var i=0; i<feed.length; i++) {
		add_post(i, feed[i]);
	}
}

function expandPost(id, expand) {
	var post = load('feed')[id];
	var content = post.content;
	var shortened = content.substring(0,200);
	if(expand) {
		$("#" + id + " .content-text").html(content + '<div onclick="expandPost('+id+', false)">See Less</div>');
	} else {
		$("#" + id + " .content-text").html(shortened + '... <div onclick="expandPost('+id+', true)">See More</div>');
	}
}

function likePost(id, like, currentLikes) {
	var name_to_liked_posts = load('name_to_liked_posts');
	if (!(id in name_to_liked_posts[username])) {
		$("#" + id + " .like-container").html("<img src='../img/heart-red.svg' onclick='likePost(" + id + ", false, " + (currentLikes + 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes + 1) + " likes</p>");
		name_to_liked_posts[username][id] = true;
	} else {
		$("#" + id + " .like-container").html("<img src='../img/heart-white.svg' onclick='likePost(" + id + ", true, " + (currentLikes - 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes - 1) + " likes</p>");
		delete name_to_liked_posts[username][id];
	};
	save('name_to_liked_posts', name_to_liked_posts);
};

var modal = $("#create-post");
var btn = document.getElementById("add-post");
var span = document.getElementsByClassName("close")[0];

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
		author: "Arnold",
		likes: 0,
		title: "Please help! What kind of pesticide should I use for this bug on my spider plant?",
		content: "Out of nowhere, this bug showed up on my spider plant and I don't know what kind of pesticide to use to save my spider plant!! Please help! :(",
		images: [],
		comments: [
			{
				author: "Angela",
				content: "That is a good question. I am also interested in the answer in case I encounter this in the future",
				time: "1 minute ago"
			}
		]
	},
	{
		author: "Sally Planter",
		likes: 101,
		title: "How to water plants",
		content: "Watering your plants can be hard, but you can do it! Try holding the watering can like in this picture, and you should be all set.",
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
		content: "Today is a nice sunny day and I thought it was a good time to take a picture of my spider plant! It has been with me for 6 months and I'm proud of it :D",
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
