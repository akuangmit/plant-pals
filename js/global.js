$("#searchbox").keypress(function(e) {
	if (e.which == 13) {
		window.location.replace("search.html");
		return false;
	};
});
