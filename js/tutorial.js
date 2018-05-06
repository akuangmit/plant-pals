$(".left").click(function() {
	var currentModal = $(".active-dot").get(0);
	if (!$(".active-dot").hasClass('1')) {
		$("#right-tut-arrow").css("display", "block");
		$(".active-dot").removeClass("active-dot");
		$(".active-page").removeClass("active-page");
		var id = parseInt(currentModal.id.slice(-1)) - 1;
		$("#dot-" + id).addClass("active-dot");
		$("#page-" + id).addClass("active-page");
	}

	if ($(".active-dot").hasClass('1')) {
		// get rid of left arrow
		$("#left-tut-arrow").css("display", "none");
	}
});

$(".right").click(function() {
	var currentModal = $(".active-dot").get(0);
	if (!$(".active-dot").hasClass('4')) {
		$("#left-tut-arrow").css("display", "block");
		$(".active-dot").removeClass("active-dot");
		$(".active-page").removeClass("active-page");
		var id = parseInt(currentModal.id.slice(-1)) + 1;
		$("#dot-" + id).addClass("active-dot");
		$("#page-" + id).addClass("active-page");
	}

	if ($(".active-dot").hasClass('4')) {
		// get rid of right arrow
		$("#right-tut-arrow").css("display", "none");
	}
});

$(".close").click(function(e) {
	$(".tutorial").css("display", "none");
});
