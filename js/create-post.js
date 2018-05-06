$("textarea").click(function() {
	$("textarea").animate({"height":"150px", "margin-top": "20px"}, 100);
	$(".create-post button").show(100);
	$(".create-post label").show(100);
	$(".create-post p").show(100);
	$(".create-post #post-title").show(100);
	$(".create-post .close").show(100);
	$(".create-post #upload-hint-container").show(100);
	$(".create-post").animate({"padding-bottom":"5px"}, 100);
	$("#create-post-bottom").animate({"padding":"10px 0"}, 100);
});

// $(".create-post .close").click(hide_create_post)
$("body").click(function(e) {
	if (e.target.id != "create-post" && e.target.id != "create-post-container" && e.target.id != "file-icon" && e.target.id != "photo-upload-container" && e.target.id != "upload-hint-container" && e.target.id != "submit-post-div" && e.target.id != "submit-post" && e.target.id != "create-post-bottom" && e.target.id != "upload-hint" && e.target.id != "file-upload" && e.target.id != "post-content" && e.target.id != "post-title") {
		hide_create_post();
	};
});


function hide_create_post() {
	$("textarea").animate({"height":"60px", "margin-top": "0px"}, 100);
	$(".create-post button").hide(100);
	$(".create-post label").hide(100);
	$(".create-post p").hide(100);
	$(".create-post #post-title").hide(100);
	$(".create-post .close").hide(100);
	$(".create-post #upload-hint-container").hide(100);
	$(".create-post").animate({"padding-bottom":"20px"}, 100);
	$("#create-post-bottom").animate({"padding":"0"}, 100);
}