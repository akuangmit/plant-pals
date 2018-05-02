// how long a post can be before there's a "See More" button.
var max_post_length = 750;
var max_comments = 3;

function add_comment(divID, globalID, commentIndex, comment, animate) {
	var author = comment.author;
	var content = comment.content;
	var time = comment.time;

	// change the interface
	$("#p" + divID + " .add-comment").val("");
	var container = $("#p" + divID + " .bottom-container .comment-container");
	var deleteDiv = author == username ? "<span class='delete-comment'>\u2715</span>" : "";
	var newComment = $("<p id='p" + divID + "c" + commentIndex + "' class='comment'><span class='commenter'>"+ author + "</span>" + content + deleteDiv + "</p>");

	if (animate) {
		newComment.hide();
		//<span class='time-ago'>"+time+"</span>
		container.append(newComment);
		newComment.show('slow');
	} else {
		container.append(newComment);
	}

	// add listener for deleting comment
	if (author == username) {
		$("#p" + divID + "c" + commentIndex + " .delete-comment").click(function() {
			var conf = confirm("Are you sure you want to delete this comment?");
			if (conf) {
				newComment.hide('fast', function() {
					newComment.remove();
				});

				// remove the comment from the database
				var feed = load('feed');
				var index = -1;
				for (var i = 0; i < feed[globalID].comments.length; i++) {
					if (feed[globalID].comments[i].content == content && feed[globalID].comments[i].author == author && feed[globalID].comments[i].time == time) {
						index = i;
					}
				}
				feed[globalID].comments.splice(index, 1);
				save('feed',feed);

				// update the number in "View All __ Comments"
				$("#p" + divID + " .show-all-comments").html("View All " + feed[globalID].comments.length + " Comments");
			}
		});
	}
}

function load_all_comments(divID, globalID, comments) {
	$("#p" + divID + " .bottom-container .comment-container").html("");
	for(var i = 0; i < comments.length; i++) {
		add_comment(divID, globalID, i, comments[i], false);
		$("#p" + divID + " .show-all-comments").css("display", "none");
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
		content = shortened + '<span class="remaining-text">' + remaining + '</span><span class="ellipse">...</span> <div onclick="expandPost('+divID+', '+globalID+', true)" class="see-more">See More</div>';
	}

	var image_div = ''
	// modify content based on images
	for(var i = 0; i < images.length; i++) {
		image_div = '<img src="../img/'+images[i]+'" align="left" class="image">';
	}

	var like_img_div = '<img src="../img/heart-white.svg" onclick="likePost('+divID+', '+globalID+', true, '+likes+')"><p class="number-likes">' + likes + ' likes</p>';
	// check to see if I already like this post
	var name_to_liked_posts = load('name_to_liked_posts');
	// initialize for new users
	if (!(username in name_to_liked_posts)) {
		name_to_liked_posts[username] = {};
		save('name_to_liked_posts',name_to_liked_posts);
	}
	if (globalID in name_to_liked_posts[username]) {
		like_img_div = '<img src="../img/heart-red.svg" onclick="likePost('+divID+', '+globalID+', false, ' + (likes + 1) + ')"><p class="number-likes">' + (likes + 1) + ' likes</p>';
	}

	// change the interface
	var showAllMessage = "";
	if (comments.length > max_comments){
		showAllMessage = "View All " + comments.length + " Comments";
	}
	// var showAllMessage = "View All "+comments.length + " Comments";
	//container.prepend('<div class="post" id="'+divID+'"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><a href="profile.html" class="author" onclick="set_profile(' + globalID + ')">' + author + '</a></div><div class="like-container">' + like_img_div + '</div></div><div class="content-container"><h1>' + title + '</h1><p>' + image_div + '<div class="content-text">' + content + '</div></p></div></div><div class="bottom-container"><div class="show-all-comments'+divID+'" id="show-comments">'+showAllMessage+'</div><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-'+divID+'"></div></div>');
	container.prepend('<div class="post" id=p' + divID + '><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><a href="profile.html" class="author" onclick="set_profile(' + globalID + ')">' + author + '</a></div><div class="content-container">' + image_div + '<span class="title">' + title + '</span><div class="content-text">' + content + '</div></div><div class="bottom-container"><div class="show-all-comments" id="show-comments">'+showAllMessage+'</div><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..."></div></div></div>');

	// if there are too many comments, make the show all comments button visible
	if (comments.length > max_comments) {
		var showAllCommentsDiv = $("#p" + divID + " .show-all-comments");
		showAllCommentsDiv.css("display", "block");

		// add listener for showing all comments
		showAllCommentsDiv.click(function() {
			var feed = load('feed');
			load_all_comments(divID, globalID, feed[globalID].comments);
		});
	}

	// load existing comments
	for(var i = 0; i < Math.min(comments.length, max_comments); i++) {
		var startIndex = comments.length-Math.min(comments.length, max_comments);
		add_comment(divID, globalID, startIndex+i, comments[startIndex+i], false);
	}

	// add listener for adding new comments
	$("#p" + divID + " .add-comment").keypress(function(e) {
		if (e.which == 13) {
			var content = $("#p" + divID + " .add-comment").val();

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

				add_comment(divID, globalID, feed[globalID].comments.length - 1, comment, true);

				// update the number in "View All __ Comments"
				$("#p" + divID + " .show-all-comments").html("View All " + feed[globalID].comments.length + " Comments");
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
	var contentContainer = $("#p" + divID + " .content-text");
	var remainingText = $("#p" + divID + " .remaining-text");
	var seeMore = $("#p" + divID + " .see-more");
	var ellipse = $("#p" + divID + " .ellipse");
	if(expand) {
		seeMore.remove();
		ellipse.css("display", "none");
		remainingText.fadeIn('slow', function() {
			contentContainer.append('<div onclick="expandPost('+divID+', '+globalID+', false)" class="see-more"> See Less</div>');
			remainingText.css("display", "inline");
		});
	} else {
		seeMore.remove();
		ellipse.css("display", "inline");
		contentContainer.append('<div onclick="expandPost('+divID+', '+globalID+', true)" class="see-more">See More</div>');
		remainingText.css("display", "none");
	}
}

function likePost(divID, globalID, like, currentLikes) {
	var name_to_liked_posts = load('name_to_liked_posts');
	var likeContainer = $("#p" + divID + " .like-container");
	if (!(globalID in name_to_liked_posts[username])) {
		likeContainer.html('<img src="../img/heart-red.svg" onclick="likePost('+divID+', '+globalID+', false, ' + (currentLikes + 1) + ')"><p>Like</p><p class="number-likes">' + (currentLikes + 1) + ' likes</p>');
		name_to_liked_posts[username][globalID] = true;
	} else {
		likeContainer.html('<img src="../img/heart-white.svg" onclick="likePost('+divID+', '+globalID+', true, ' + (currentLikes - 1) + ')"><p>Like</p><p class="number-likes">' + (currentLikes - 1) + ' likes</p>');
		delete name_to_liked_posts[username][globalID];
	};
	save('name_to_liked_posts', name_to_liked_posts);
};

function set_profile(globalID) {
	var author = load('feed')[globalID].author;
	set_profile_to_load(author);
}