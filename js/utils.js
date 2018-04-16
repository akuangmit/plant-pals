// functions for saving into or loading from localStorage.
function save(name, object) {
	localStorage.setItem(name, JSON.stringify(object));
}
function load(name) {
	return JSON.parse(localStorage.getItem(name));
}