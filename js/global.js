$("#searchbox").keypress(function(e) {
	if (e.which === 13) {
		var term = $("#searchbox").val();

		if (term !== "") {
			localStorage.setItem('searchTerm', term);
			window.location.replace("search.html");
			return false;
		}
	};
});

$(document).ready(function() {
    $(".query").text(localStorage.getItem('searchTerm'));
});

function set_profile_to_load() {
	localStorage.setItem('profileToLoad',username);
}