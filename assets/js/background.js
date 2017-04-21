// Listen for message from content.js and create notification.
chrome.runtime.onMessage.addListener(function(notification,sender,sendResponse){	
	sendResponse({responseStatus: "Talk Status: "+notification.status});
		//Create Notification
		var opt = {
		  type: "basic",
		  title: notification.notifyTitle,
		  message: notification.notifyMessage,
		  iconUrl: notification.iconUrl,
		  requireInteraction: true
		};

		chrome.notifications.create(notification.notifyId, opt);	
		//console.log(sender);	
		// Notification on click activates and highlights chrome tab
		chrome.notifications.onClicked.addListener(function(id) {
		  chrome.tabs.update(sender.tab.id,{"active":true,"highlighted":true},function (tab){
			  //console.log("Completed updating tab .." + JSON.stringify(tab));
			});

		  var clearNotification = function() {chrome.notifications.clear(id)}
		  setTimeout(clearNotification,750);
		});
});
