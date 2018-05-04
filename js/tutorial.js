$(".left").click(function() {
	var currentModal = $(".active-dot").get(0);
	if (!$(".active-dot").hasClass('1')) {
		$(".active-dot").removeClass("active-dot");
		$(".active-page").removeClass("active-page");
		var id = parseInt(currentModal.id.slice(-1)) - 1;
		$("#dot-" + id).addClass("active-dot");
		$("#page-" + id).addClass("active-page");
	}
});

$(".right").click(function() {
	var currentModal = $(".active-dot").get(0);
	if (!$(".active-dot").hasClass('4')) {
		$(".active-dot").removeClass("active-dot");
		$(".active-page").removeClass("active-page");
		var id = parseInt(currentModal.id.slice(-1)) + 1;
		$("#dot-" + id).addClass("active-dot");
		$("#page-" + id).addClass("active-page");
	}
});

$(".close").click(function(e) {
	$(".tutorial").css("display", "none");
});