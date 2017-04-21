// Saves options to chrome.storage
function save_options() { 
  var low = document.getElementById('low').checked;
  var normal = document.getElementById('normal').checked;
  var high = document.getElementById('high').checked;
  var urgent = document.getElementById('urgent').checked;
  var customCss = document.getElementById('cssInput').value;
  var customCssUrl = document.getElementById('cssUrlInput').value;
  //var offlineAlerts = document.getElementById('offlineAlerts').checked;
  //var offlineAlertInt = document.getElementById('offlineAlertInt').value;
  //var offlineAlerts = document.getElementById('offlineAlerts').checked;


  chrome.storage.local.set({    
    lowPriority: low,
    normalPriority: normal,
    highPriority: high,
    urgentPriority: urgent,
    customCss: customCss,
    customCssUrl: customCssUrl,
    talkTitle: document.getElementById('talkTitle').value,
    talkMessage: document.getElementById('talkMessage').value,
    chatTitle: document.getElementById('chatTitle').value,
    chatMessage: document.getElementById('chatMessage').value,
    offlineAlerts: document.getElementById('offlineAlerts').checked,
    offlineAlertInt: document.getElementById('offlineAlertInt').value,
    newTicketAlerts: document.getElementById('newTicketAlerts').checked


  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options Saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {  
  chrome.storage.local.get({   
    lowPriority: true,
    normalPriority: true,
    highPriority: true,
    urgentPriority: true,
    customCss: '',
    customCssUrl: '',
    talkTitle: 'TALK IS CURRENTLY SET TO OFFLINE!',
    talkMessage: 'You are currently set as offline for Zendesk Talk and will not receive any calls.',
    chatTitle: 'CHAT IS CURRENTLY SET TO OFFLINE!',
    chatMessage: 'You are currently set as offline for Zendesk Chat and will not receive any incoming chats.',
    offlineAlerts: true,
    offlineAlertInt: 30000,
    newTicketAlerts: true
  }, function(items) {   
    document.getElementById('low').checked = items.lowPriority;
    document.getElementById('normal').checked = items.normalPriority;
    document.getElementById('high').checked = items.highPriority;
    document.getElementById('urgent').checked = items.urgentPriority;
    document.getElementById('cssInput').value = items.customCss;
    document.getElementById('cssUrlInput').value = items.customCssUrl;
    document.getElementById('talkTitle').value = items.talkTitle;
    document.getElementById('talkMessage').value = items.talkMessage
    document.getElementById('chatTitle').value = items.chatTitle;
    document.getElementById('chatMessage').value = items.chatMessage;
    document.getElementById('offlineAlerts').checked = items.offlineAlerts;
    document.getElementById('offlineAlertInt').value = items.offlineAlertInt;
    document.getElementById('newTicketAlerts').checked = items.newTicketAlerts;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);