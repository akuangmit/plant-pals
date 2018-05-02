$("textarea").click(function() {
	$("textarea").animate({"height":"150px"}, 100);
	$(".create-post button").show(100);
	$(".create-post #file-upload").show(100);
	$(".create-post p").show(100);
	$(".create-post input").show(100);
	$(".up").show(100);
	$(".create-post").animate({"padding-bottom":"50px"}, 100);
});

$(".up").click(hide_create_post)

function hide_create_post() {
	$("textarea").animate({"height":"100px"}, 100);
	$(".create-post button").hide(100);
	$(".create-post #file-upload").hide(100);
	$(".create-post p").hide(100);
	$(".create-post input").hide(100);
	$(".up").hide(100);
	$(".create-post").animate({"padding-bottom":"20px"}, 100);
}