// how long a post can be before there's a "See More" button.
var max_post_length = 750;

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

function add_post(id, post, container) {
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
		var remaining = content.substring(max_post_length, content.length);
		var rest = content.substring(max_post_length,content.length);
		content = shortened + '<span class="remaining-text">' + remaining + '</span>... <div onclick="expandPost('+id+', true)" class="see-more">See More</div>';
	}

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
	container.prepend('<div class="post" id="'+id+'"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><a href="profile.html" onclick="set_profile(' + id + ')">' + author + '</a></div><div class="like-container">' + like_img_div + '</div></div><div class="content-container"><h1>' + title + '</h1><p>' + image_div + '<div class="content-text">' + content + '</div></p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-'+id+'"></div></div>');

	// load existing comments
	for(var i = 0; i < comments.length; i++) {
		add_comment(id, comments[i], false);
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

				add_comment(id, comment, true);
			}
		};
	});
}

function load_posts() {
	var feed = load('feed');
	for(var i=0; i<feed.length; i++) {
		add_post(i, feed[i], $("#feed"));
	}
}

function expandPost(id, expand) {
	var post = load('feed')[id];
	var content = post.content;
	var shortened = content.substring(0,max_post_length);
	var remaining = content.substring(max_post_length, content.length);
	var container = $("#" + id + " .content-text");
	if(expand) {
		$('.remaining-text').fadeIn('slow', function() {
			$("#" + id + " .content-text").html(shortened + '<span class="remaining-text-inline">' + remaining + '</span>' + '<div onclick="expandPost('+id+', false)" class="see-more"> See Less</div>');
		});
		//$("#" + id + " .content-text").html(content + '<div onclick="expandPost('+id+', false)" class="see-more">See Less</div>');
	} else {
		$("#" + id + " .content-text").html(shortened + '<span class="remaining-text">' + remaining + '</span>' + '... <div onclick="expandPost('+id+', true)" class="see-more">See More</div>');
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

function set_profile(id) {
	var post = load('feed')[id];
	set_profile_to_load(post.author);
}