// functions for saving into or loading from localStorage.
function save(name, object) {
	localStorage.setItem(name, JSON.stringify(object));
}
function load(name) {
	return JSON.parse(localStorage.getItem(name));
}

$("#searchbox").keypress(function(e) {
	if (e.which == 13) {
		window.location.replace("search.html");
		return false;
	};
});
