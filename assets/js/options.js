// Saves options to chrome.storage
function save_options() { 
  var low = document.getElementById('low').checked;
  var normal = document.getElementById('normal').checked;
  var high = document.getElementById('high').checked;
  var urgent = document.getElementById('urgent').checked;
  var customCss = document.getElementById('cssInput').value;
  var customCssUrl = document.getElementById('cssUrlInput').value;


  chrome.storage.local.set({    
    lowPriority: low,
    normalPriority: normal,
    highPriority: high,
    urgentPriority: urgent,
    customCss: customCss,
    customCssUrl: customCssUrl,
    talkTitle: 'TALK TITLE FROM OPTIONS.JS',
    talkMessage: 'TALK Message FROM OPTIONS.JS',
    chatTitle: 'chat TITLE FROM OPTIONS.JS',
    chatMessage: 'CHAT MESSAGE FROM OPTIONS.JS'

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
    customCssUrl: ''
  }, function(items) {   
    document.getElementById('low').checked = items.lowPriority;
    document.getElementById('normal').checked = items.normalPriority;
    document.getElementById('high').checked = items.highPriority;
    document.getElementById('urgent').checked = items.urgentPriority;
    document.getElementById('cssInput').value = items.customCss;
    document.getElementById('cssUrlInput').value = items.customCssUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);