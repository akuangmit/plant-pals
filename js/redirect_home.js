// this file is placed in HEAD, so anything here must not deal with DOM.

if(localStorage.getItem("email") in load('users')) {
    window.location.href="index.html";
}