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

$("#links a").hover(function(){
    $(this).css("background-color", "#669900");
    }, function(){
    $(this).css("background-color", "#43b02f");
});