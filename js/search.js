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

	// modify content based on images
	for(var i = 0; i < images.length; i++) {
		content = '<img src="../img/'+images[i]+'" align="left" class="image">'+ content;
	}

	// change the interface
	$("#search-results").prepend('<div class="post" id="'+id+'"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/'+pfpfilename+'"><p>' + author + '</p></div><div class="like-container"><img src="../img/heart-white.svg" onclick="likePost('+id+', true, '+likes+')"><p>Like</p><p class="number-likes">' + likes + ' likes</p></div></div><div class="content-container"><h1>' + title + '</h1><p>' + content + '</p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-'+id+'"></div></div>');

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
				var searchResults = load('search-results');
				searchResults[id].comments.push(comment);
				save('search-results',searchResults);

				add_comment(id, comment);
			}
		};
	});
}

function load_posts() {
	var searchResults = load('search-results');
	for(var i=0; i<searchResults.length; i++) {
		add_post(i, searchResults[i]);
	}
}

function likePost(id, like, currentLikes) {
	if (like) {
		$("#" + id + " .like-container").html("<img src='../img/heart-red.svg' onclick='likePost(" + id + ", false, " + (currentLikes + 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes + 1) + " likes</p>");
	} else {
		$("#" + id + " .like-container").html("<img src='../img/heart-white.svg' onclick='likePost(" + id + ", true, " + (currentLikes - 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes - 1) + " likes</p>");
	};
};

// data for populating search-results.
var searchResults_base = [
	{
		author: "Sally Jones",
		likes: 4051,
		title: "How to Care for Your Spider Plant",
		content: "As the proud owner of an award winning spider plant, I'm here to impart some of my knowledge onto y'all!",
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
	"Sally Jones": "jane-doe.png",
	"John Doe": "john-doe.png"
}

$( document ).ready(function() {
  console.log(localStorage.getItem('search-results'));

	if(!localStorage.getItem('search-results')) {
	  save('search-results', searchResults_base);
    console.log(searchResults_base);
	}
	if(!localStorage.getItem('name_to_profile')) {
	  save('name_to_profile', name_to_profile);
	}
    load_posts();
});
