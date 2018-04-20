$("#searchbox").keypress(function(e) {
	if (e.which == 13) {
		var term = $("#searchbox").val();
		localStorage.setItem('searchTerm', term);
		window.location.replace("search.html");
		return false;
	};
});

$(document).ready(function() {
    $(".query").text(localStorage.getItem('searchTerm'));
});