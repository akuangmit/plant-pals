function add_comment(postid, comment) {
	var author = comment.author;
	var content = comment.content;
	var time = comment.time;

	// change the interface
	var container = $("#" + postid + " .bottom-container .comment-container");
	container.append("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>");
	$(".add-comment").val("");
}

function add_post(id, post) {
	var author = post.author;
	var content = post.content;
	var title = post.title;
	var likes = post.likes;
	var comments = post.comments;
	var images = post.images;
	var pfpfilename = load('name_to_profile')[author];

	// make "See More" if the post is too long
	if (content.length > 200) {
		var shortened = content.substring(0,200);
		var rest = content.substring(200,content.length);
		content = shortened + '... <div onclick="expandPost('+id+', true)">See More</div>';
	}

	var image_div = ''
	// modify content based on images
	for(var i = 0; i < images.length; i++) {
		image_div = '<img src="../img/'+images[i]+'" align="left" class="image">';
	}

	var like_img_div = '<img src="../img/heart-white.svg" onclick="likePost('+id+', true, '+likes+')"><p>Like</p><p class="number-likes">' + likes + ' likes</p>';
	// check to see if I already like this post
	if (id in load('name_to_liked_posts')["Jane Doe"]) {
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
					author: "Jane Doe",
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
	if (!(id in name_to_liked_posts["Jane Doe"])) {
		$("#" + id + " .like-container").html("<img src='../img/heart-red.svg' onclick='likePost(" + id + ", false, " + (currentLikes + 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes + 1) + " likes</p>");
		name_to_liked_posts["Jane Doe"][id] = true;
	} else {
		$("#" + id + " .like-container").html("<img src='../img/heart-white.svg' onclick='likePost(" + id + ", true, " + (currentLikes - 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes - 1) + " likes</p>");
		delete name_to_liked_posts["Jane Doe"][id];
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

	post = {
		author: "Jane Doe",
		likes: 0,
		title: title,
		content: content,
		images: [],
		comments:[]
	};
	// save into local storage
	var feed = load('feed');
	feed.push(post);
	save('feed',feed);

	// change interface
	add_post(feed.length, post);
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
		likes: 201,
		title: "Maecenas eu consequat justo",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at ante dictum, bibendum dolor eget, ullamcorper eros. Sed quis justo eu purus varius suscipit. Curabitur vel blandit orci, a eleifend orci. Sed orci ex, egestas quis lectus ac, tempus luctus eros. Fusce nec posuere ligula. Nam finibus venenatis arcu, ac egestas felis tristique nec. Aliquam erat volutpat. Sed auctor nisl non urna dignissim congue. Etiam eget tellus ac ligula posuere venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam eget felis diam. Integer sagittis dui elit, eget luctus dui tincidunt id. Etiam lobortis magna tortor, et imperdiet dui blandit non. Aliquam vitae arcu et lacus euismod blandit. Vestibulum posuere velit id leo molestie laoreet.",
		images: [],
		comments: [
			{
				author: "Bobby",
				content: "Praesent quis malesuada libero. Cras varius nibh risus, eu sagittis augue maximus eu.",
				time: "2 hours ago"
			},
			{
				author: "Angela",
				content: "Vestibulum eget dolor quis nisi sollicitudin iaculis et aliquam ex. Quisque ornare turpis ac nulla convallis.",
				time: "1 minute ago"
			}
		]
	},
	{
		author: "John Doe",
		likes: 15,
		title: "Neque porro quisquam est qui dolorem",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at ante dictum, bibendum dolor eget, ullamcorper eros. Sed quis justo eu purus varius suscipit. Curabitur vel blandit orci, a eleifend orci. Sed orci ex, egestas quis lectus ac, tempus luctus eros. Fusce nec posuere ligula. Nam finibus venenatis arcu, ac egestas felis tristique nec. Aliquam erat volutpat. Sed auctor nisl non urna dignissim congue. Etiam eget tellus ac ligula posuere venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam eget felis diam. Integer sagittis dui elit, eget luctus dui tincidunt id. Etiam lobortis magna tortor, et imperdiet dui blandit non. Aliquam vitae arcu et lacus euismod blandit. Vestibulum posuere velit id leo molestie laoreet.\n\nPhasellus aliquet efficitur lorem, consequat efficitur elit aliquet non. Maecenas aliquam viverra magna, a venenatis leo suscipit eu. Duis vulputate ipsum in risus sollicitudin rutrum. Proin auctor porttitor efficitur. Nam elit nisi, varius at ante non, tincidunt congue turpis. Vestibulum dictum, nunc ut bibendum semper, dolor augue dictum massa, quis maximus elit nisl in metus. In hac habitasse platea dictumst. Integer a condimentum justo. Fusce sapien libero, semper quis justo sit amet, venenatis sagittis lectus. Curabitur ullamcorper nibh massa, eu placerat nisi suscipit sit amet.",
		images: ["sample-image.jpeg"],
		comments: [
			{
				author: "George",
				content: "Sed metus lacus, iaculis id eros a, aliquet posuere est.",
				time: "1 day ago"
			}
		]
	}
];

var name_to_profile = {
	"Jane Doe": "jane-doe.png",
	"John Doe": "john-doe.png"
}

var name_to_liked_posts = {
	"Jane Doe": {},
	"John Doe": {}
}

$( document ).ready(function() {
	if(!localStorage.getItem('feed')) {
	  save('feed', feed_base);
	}
	if(!localStorage.getItem('name_to_profile')) {
	  save('name_to_profile', name_to_profile);
	}
	if(!localStorage.getItem('name_to_liked_posts')) {
	  save('name_to_liked_posts', name_to_liked_posts);
	}
    load_posts();
});
