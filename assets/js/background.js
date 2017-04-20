
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	
	sendResponse({responseStatus: "Talk Status: "+message.status});
var opt = {
  type: "basic",
  title: message.talkTitle,
  message: message.talkMessage,
  iconUrl: "../assets/img/icon.png",
  requireInteraction: true
};

chrome.notifications.create('id1', opt);
chrome.notifications.create('id2', opt);
chrome.notifications.create('id3', opt);
	
});

