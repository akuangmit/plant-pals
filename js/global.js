$("#searchbox").keypress(function(e) {
	if (e.which === 13) {
		var term = $("#searchbox").val();

		if (term !== "") {
			localStorage.setItem('searchTerm', term);
			window.location.href = "search.html";
		}
	};
});

$(document).ready(function() {
    $(".query").text(localStorage.getItem('searchTerm'));
});

function set_profile_to_load(name) {
	if (name === undefined) {
		localStorage.setItem('profileToLoad',username);
	} else {
		localStorage.setItem('profileToLoad',name);
	}
}
