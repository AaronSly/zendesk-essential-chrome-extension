// Saves options to chrome.storage
function save_options() { 
  var low = document.getElementById('low').checked;
  var normal = document.getElementById('normal').checked;
  var high = document.getElementById('high').checked;
  var urgent = document.getElementById('urgent').checked;

  chrome.storage.local.set({    
    lowPriority: low,
    normalPriority: normal,
    highPriority: high,
    urgentPriority: urgent

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({   
    lowPriority: true,
    normalPriority: true,
    highPriority: true,
    urgentPriority: true
  }, function(items) {   
    document.getElementById('low').checked = items.lowPriority;
    document.getElementById('normal').checked = items.normalPriority;
    document.getElementById('high').checked = items.highPriority;
    document.getElementById('urgent').checked = items.urgentPriority;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);