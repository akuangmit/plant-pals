function postClicked(postID) {
  window.location.href = "index.html";
}

// set name
$("#name").html(username);

// set profile picture
$("#prof-picture").html('<p><img src="../img/profile-pictures/'+
	load('name_to_profile')[username]
	+'" align="center" class="image"></p>');

// set date joined
$("#joined-since").html("Member since " + load('member_since')[username])

function load_my_posts() {
	var feed = load('feed');
	var count = 0;
	for(var i=0; i<feed.length; i++) {
		if (feed[i].author == username) {
			add_post(count, feed[i], $("#plant-list"));
			count += 1;
		}
	}
}

function add_my_post(id, post) {
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
		content = shortened + '... <div onclick="expandPost('+id+', true)" class="see-more">See More</div>';
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