// Show / Hide input fields for offline notifications
  var displayOfflineNotifications = function() {
    var offlineAlerts = $('#offlineAlerts'),
        offlineMessages = $('#offlineMessages'),
        offlineInt = $('#offline-int-wrapper');
        offlineAudio = $('#offlineAudioAlertsWrap');

    if(offlineAlerts.prop("checked") == true) {
        offlineMessages.css({"display":"block"});
        offlineInt.css({"display":"table-row"});
        offlineAudio.css({"display":"table-row"});

    }
    else{
         offlineMessages.css({"display":"none"});
        offlineInt.css({"display":"none"});
        offlineAudio.css({"display":"none"});
    }
  };
  $('#offlineAlerts').change(displayOfflineNotifications);

// Show / Hide Login input fields for new ticket notifications
  var $ticketAlertsCheck = $('#newTicketAlerts');
  var $apiCreds = $('#newTickCred');
  var $newTickaudio = $('#newTickAudioAlertsWrap');
  var $newTickInt = $('#newTickIntWrapper');
  var displayApiCreds = function() {
    if($ticketAlertsCheck.prop("checked") == true) {
        $apiCreds.css({"display":"block"});
        $newTickaudio.css({"display":"table-row"});
        $newTickInt.css({"display":"table-row"});
    }
    else{
        $apiCreds.css({"display":"none"});
        $newTickaudio.css({"display":"none"});
        $newTickInt.css({"display":"none"});
    }
  };
  $('#newTicketAlerts').change(displayApiCreds);

// Saves options to chrome.storage
  function save_options() { 
    chrome.storage.local.set({    
      lowPriority: document.getElementById('low').checked,
      normalPriority: document.getElementById('normal').checked,
      highPriority: document.getElementById('high').checked,
      urgentPriority: document.getElementById('urgent').checked,
      customCss: document.getElementById('cssInput').value,
      customCssUrl: document.getElementById('cssUrlInput').value,
      talkTitle: document.getElementById('talkTitle').value,
      talkMessage: document.getElementById('talkMessage').value,
      chatTitle: document.getElementById('chatTitle').value,
      chatMessage: document.getElementById('chatMessage').value,
      offlineAlerts: document.getElementById('offlineAlerts').checked,
      offlineAlertInt: document.getElementById('offlineAlertInt').value,
      offlineAudioAlerts: document.getElementById('offlineAudioAlerts').checked,
      newTicketAlerts: document.getElementById('newTicketAlerts').checked,
      subdomain: document.getElementById('subdomain').value,
      newTickAudioAlerts: document.getElementById('newTickAudioAlerts').checked,
      newTickAlertInt: document.getElementById('newTickAlertInt').value
      

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
      newTicketAlerts: true,
      subdomain: '',
      newTickAudioAlerts: true,
      newTickAlertInt: 300000,
      offlineAudioAlerts: true
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
      document.getElementById('subdomain').value = items.subdomain;
      document.getElementById('newTickAudioAlerts').checked = items.newTickAudioAlerts;
      document.getElementById('newTickAlertInt').value = items.newTickAlertInt;
      document.getElementById('offlineAudioAlerts').checked = items.offlineAudioAlerts;
    });
  }

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// Make it so ...
$(document).ready(function() {
  displayApiCreds();
  displayOfflineNotifications();
});