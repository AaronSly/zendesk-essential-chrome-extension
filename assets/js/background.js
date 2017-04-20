
chrome.runtime.onMessage.addListener(function(notification,sender,sendResponse){
	
	sendResponse({responseStatus: "Talk Status: "+notification.status});
var opt = {
  type: "basic",
  title: notification.notifyTitle,
  message: notification.notifyMessage,
  iconUrl: "../assets/img/icon.png",
  requireInteraction: true
};

chrome.notifications.create(notification.notifyId, opt);
	
});

