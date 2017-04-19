var opt = {
  type: "basic",
  title: "NEW NOTIFICATION",
  message: 'HELLO WORLD! THIS IS A NEW NOTIFICATION',
  iconUrl: "../assets/img/icon.png",
  requireInteraction: true
};

chrome.notifications.create('id1', opt);
chrome.notifications.create('id2', opt);
chrome.notifications.create('id3', opt);
