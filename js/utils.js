// this file is placed in HEAD, so anything here must not deal with DOM.

// functions for saving into or loading from localStorage.
function save(name, object) {
	localStorage.setItem(name, JSON.stringify(object));
}
function load(name) {
	return JSON.parse(localStorage.getItem(name));
}

var users = {
	"jane@gmail.com": "Jane Doe",
	"john@gmail.com": "John Doe"
};
var name_to_profile = {
	"Jane Doe": "jane-doe.png",
	"John Doe": "john-doe.png"
}

if(!localStorage.getItem('users')) {
  save('users', users);
}
if(!localStorage.getItem('name_to_profile')) {
  save('name_to_profile', name_to_profile);
}

var email = localStorage.getItem('email');
var username = load('users')[email];