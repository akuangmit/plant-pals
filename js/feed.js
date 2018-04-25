// how long a post can be before there's a "See More" button.
var max_post_length = 750;

function add_comment(divID, comment, animate) {
	var author = comment.author;
	var content = comment.content;
	var time = comment.time;

	// change the interface
	$(".add-comment").val("");
	var container = $("#" + divID + " .bottom-container .comment-container");
	if (animate) {
		var newComment = $("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>").hide();
		container.append(newComment);
		newComment.show('slow');
	} else {
		var newComment = $("<p class='comment'><span class='commenter'>"+ author + "</span>" + content + "<span class='time-ago'>"+time+"</span></p>");
		container.append(newComment);
	}
}

function add_post(divID, globalID, post, container) {
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
		content = shortened + '<span class="remaining-text">' + remaining + '</span>... <div onclick="expandPost('+divID+', '+globalID+', true)" class="see-more">See More</div>';
	}

	var image_div = ''
	// modify content based on images
	for(var i = 0; i < images.length; i++) {
		image_div = '<img src="../img/'+images[i]+'" align="left" class="image">';
	}

	var like_img_div = '<img src="../img/heart-white.svg" onclick="likePost('+divID+', '+globalID+', true, '+likes+')"><p>Like</p><p class="number-likes">' + likes + ' likes</p>';
	// check to see if I already like this post
	var name_to_liked_posts = load('name_to_liked_posts');
	// initialize for new users
	if (!(username in name_to_liked_posts)) {
		name_to_liked_posts[username] = {};
		save('name_to_liked_posts',name_to_liked_posts);
	}
	if (globalID in name_to_liked_posts[username]) {
		like_img_div = '<img src="../img/heart-red.svg" onclick="likePost('+divID+', '+globalID+', false, ' + (likes + 1) + ')"><p>Like</p><p class="number-likes">' + (likes + 1) + ' likes</p>';
	}

	// change the interface
	container.prepend('<div class="post" id="'+divID+'"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><a href="profile.html" class="author" onclick="set_profile(' + globalID + ')">' + author + '</a></div><div class="like-container">' + like_img_div + '</div></div><div class="content-container"><h1>' + title + '</h1><p>' + image_div + '<div class="content-text">' + content + '</div></p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-'+divID+'"></div></div>');

	// load existing comments
	for(var i = 0; i < comments.length; i++) {
		add_comment(globalID, comments[i], false);
	}

	// add listener for adding new comments
	$(".add-comment").keypress(function(e) {
		if (e.which == 13) {
			var content = $("#" + divID + " .add-comment").val();

			if (content != "") {
				comment = {
					author: username,
					content: content,
					time: "Just now"
				}
				// save into local storage
				var feed = load('feed');
				feed[globalID].comments.push(comment);
				save('feed',feed);

				add_comment(divID, comment, true);
			}
		};
	});
}

function load_posts(option) {
	var feed = load('feed');
	
	count = 0;
	for(var i=0; i<feed.length; i++) {
		if (option == 'search' && feed[i].search_only == true || option != 'search' && feed[i].search_only != true) {
			add_post(count, i, feed[i], $("#feed"));
			count += 1;
		}
	}
}

function expandPost(divID, globalID, expand) {
	var post = load('feed')[globalID];
	var content = post.content;
	var shortened = content.substring(0,max_post_length);
	var remaining = content.substring(max_post_length, content.length);
	var container = $("#" + divID + " .content-text");
	if(expand) {
		$('.remaining-text').fadeIn('slow', function() {
			$("#" + divID + " .content-text").html(shortened + '<span class="remaining-text-inline">' + remaining + '</span>' + '<div onclick="expandPost('+divID+', '+globalID+', false)" class="see-more"> See Less</div>');
		});
		//$("#" + id + " .content-text").html(content + '<div onclick="expandPost('+id+', false)" class="see-more">See Less</div>');
	} else {
		$("#" + divID + " .content-text").html(shortened + '<span class="remaining-text">' + remaining + '</span>' + '... <div onclick="expandPost('+divID+', '+globalID+', true)" class="see-more">See More</div>');
	}
}

function likePost(divID, globalID, like, currentLikes) {
	var name_to_liked_posts = load('name_to_liked_posts');
	if (!(globalID in name_to_liked_posts[username])) {
		$("#" + divID + " .like-container").html('<img src="../img/heart-red.svg" onclick="likePost('+divID+', '+globalID+', false, ' + (currentLikes + 1) + ')"><p>Like</p><p class="number-likes">' + (currentLikes + 1) + ' likes</p>');
		name_to_liked_posts[username][globalID] = true;
	} else {
		$("#" + divID + " .like-container").html('<img src="../img/heart-white.svg" onclick="likePost('+divID+', '+globalID+', true, ' + (currentLikes - 1) + ')"><p>Like</p><p class="number-likes">' + (currentLikes - 1) + ' likes</p>');
		delete name_to_liked_posts[username][globalID];
	};
	save('name_to_liked_posts', name_to_liked_posts);
};

function set_profile(globalID) {
	var author = load('feed')[globalID].author;
	set_profile_to_load(author);
}