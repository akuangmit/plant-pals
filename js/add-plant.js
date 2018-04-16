// JS File for adding plant modal

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("add-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$("#sadd-plant-submit").click(function(e) {
	modal.css("display", "none");
	var plantType = $("#plant-type").val();
	var picture = $("#pic").val();
  var dateAcquired = $("#date-acquired").val();
  $("#plant-list").prepend('<div class="post" id="3"><div class="top-container"><div class="info-container"><div class="profile-container"><img src="../img/profile-pictures/jane-doe.png"><p>Su Yang</p></div><div class="like-container"><img src="../img/heart-white.svg" onclick="likePost(3, true, 0)"><p>Like</p><p class="number-likes">0 likes</p></div></div><div class="content-container"><h1>' + title + '</h1><p>' + content + '</p></div></div><div class="bottom-container"><div class="comment-container"></div><input class="add-comment" type="text" placeholder="Add a comment..." id="post-3"></div></div>');
	$(".add-comment").keypress(function(e) {
		var postID = $(this).attr("id").split("-")[1];
		if (e.which == 13) {
			var container = $("#" + postID + " .bottom-container .comment-container");
			var content = $("#" + postID + " .add-comment").val();
			container.prepend("<p class='comment'><span class='commenter'>Lucy</span>" + content + "<span class='time-ago'>Just now</span></p>");
			$(".add-comment").val("");
		};
	});
});
