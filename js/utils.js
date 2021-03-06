// this file is placed in HEAD, so anything here must not deal with DOM.

// functions for saving into or loading from localStorage.
function save(name, object) {
	localStorage.setItem(name, JSON.stringify(object));
}
function load(name) {
	return JSON.parse(localStorage.getItem(name));
}

function logout() {
	localStorage.removeItem("email");
}

var users = {
	"jane@gmail.com": "Jane Doe",
	"john@gmail.com": "John Doe",
	"sally@gmail.com": "Sally Planter"
};
var name_to_profile = {
	"Jane Doe": "jane-doe.png",
	"John Doe": "john-doe.png",
	"Sally Planter": "sally-planter.jpg"
}
var member_since = {
	"Jane Doe": "11/18/2016",
	"John Doe": "02/14/2018",
	"Sally Planter": "03/28/2015"
}

if(!localStorage.getItem('users')) {
  save('users', users);
}
if(!localStorage.getItem('name_to_profile')) {
  save('name_to_profile', name_to_profile);
}
if(!localStorage.getItem('member_since')) {
  save('member_since', member_since);
}

var email = localStorage.getItem('email');
var username = load('users')[email];
