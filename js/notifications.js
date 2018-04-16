var notificationsContainer = $("#notification-container");
var notificationsLink = $("#notifications-link");

$(document).mouseup(function(e) {
    if ((!notificationsContainer.is(e.target) && notificationsContainer.has(e.target).length === 0) && !notificationsLink.is(e.target)) {
        notificationsContainer.css("display", "none");
    }

    if (notificationsLink.is(e.target)) {
    	if (notificationsContainer.css("display") == "block") {
			notificationsContainer.css("display", "none");
		} else {
			notificationsContainer.css("display", "block");
		};
    }
});