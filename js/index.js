function likePost(id, like, currentLikes) {
	if (like) {
		$("#" + id + " .like-container").html("<img src='../img/heart-red.svg' onclick='likePost(" + id + ", false, " + (currentLikes + 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes + 1) + " likes</p>");
	} else {
		$("#" + id + " .like-container").html("<img src='../img/heart-white.svg' onclick='likePost(" + id + ", true, " + (currentLikes - 1) + ")'><p>Like</p><p class='number-likes'>" + (currentLikes - 1) + " likes</p>");
	};
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
	$("#feed").prepend('<div class="post" id="3"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/jane-doe.png"><p>Su Yang</p></div><div class="like-container"><img src="../img/heart-white.svg" onclick="likePost(3, true, 0)"><p>Like</p><p class="number-likes">0 likes</p></div></div><div class="content-container"><h1>' + title + '</h1><p>' + content + '</p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-3"></div></div>');
});

$("#searchbox").keypress(function(e) {
	if (e.which == 13) {
		window.location.replace("search.html");
		return false;
	};
});

$("#add-post")
.mouseover(function() {
	$("#add-post-descriptor").fadeIn(100);
})
.mouseout(function() {
	$("#add-post-descriptor").fadeOut(100);
});

$(".add-comment").keypress(function(e) {
	var postID = $(this).attr("id").split("-")[1];
	if (e.which == 13) {
		var container = $("#" + postID + " .bottom-container .comment-container");
		var content = $("#" + postID + " .add-comment").val();
		container.prepend("<p class='comment'><span class='commenter'>Lucy</span>" + content + "<span class='time-ago'>Just now</span></p>");
		$(".add-comment").val("");
	};
});