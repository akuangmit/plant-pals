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

$("#searchbox").keypress(function(e) {
	if (e.which == 13) {
		window.location.replace("search.html");
		return false;
	};
});