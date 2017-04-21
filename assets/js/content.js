// Get locally stored options (object) and save to variable
	var storedSettings;
	chrome.storage.local.get(null , function(items){		
			storedSettings = items;
		});

// Hide custom field based on group name 
/************************************
* TO ADD:
	*option to select what fields show and hide per ticket group - options.html
*/
	var hideCustomField = function(){

		var openTickSidebars = $('#main_panes .ember-view.workspace .ticket .ticket-sidebar');
		//text to match searchText
       var orderText = 'Order Pro';
       var postDisText = 'Post-Disp';
       var purchaseText = 'Purchase';

       //custom field classes
       var orderCustField = ' .custom_field_36281429';
       var purCustField = ' .custom_field_36996065';
       var postDisCustField = ' .custom_field_37202905';

		$(openTickSidebars).each(function() {

            var sidebarID = '#'+$(this).attr('id');
            var ticketPropID = '#'+$(sidebarID+' .ticket_properties').attr('id');
			var searchText = $(sidebarID+" .property_box_container .assignee_widget .zd-combo-selectmenu .zd-selectmenu-base-content").text();

				if (searchText.toLowerCase().includes(orderText.toLowerCase())) {
					$(ticketPropID+purCustField).css('display','none');
					$(ticketPropID+postDisCustField).css('display','none');
					$(ticketPropID+orderCustField).css('display','block');
				}
				else if (searchText.toLowerCase().includes(postDisText.toLowerCase())) {
					$(ticketPropID+purCustField).css('display','none');
					$(ticketPropID+postDisCustField).css('display','block');
					$(ticketPropID+orderCustField).css('display','none');
				}
				else if (searchText.toLowerCase().includes(purchaseText.toLowerCase())) {
					$(ticketPropID+purCustField).css('display','block');
					$(ticketPropID+postDisCustField).css('display','none');
					$(ticketPropID+orderCustField).css('display','none');
				}
				else {
					$(ticketPropID+purCustField).css('display','none');
					$(ticketPropID+postDisCustField).css('display','none');
					$(ticketPropID+orderCustField).css('display','none');
				}
		});
	};

// Add Status class to ticket row for styling
	function addStatusClass(priority) {
	    if (0 < window.location.href.indexOf('agent/filters')) {
	        var ticketRow = $('.filter_tickets tbody tr');
	        var classStr = priority+'-ticket';
	        var ticketClass = classStr.toLowerCase();
	        ticketRow.each(function() {
	            var $_this = $(this),
	                td = $('td.priority'),
	                leading = $('.leading'),
	                trailing = $('.trailing'),
	                priorityCell = $_this.find(td).text(),
	                currentleading = $_this.find(leading),
	                currentTrailing = $_this.find(trailing);
	            priority == priorityCell && ($_this.addClass(ticketClass), currentleading.addClass(ticketClass), currentTrailing.addClass(ticketClass))
	        })
	    }
	};

// Check local data options and call addStatusClass() as needed.
	var highlights = function() {
		if (storedSettings.lowPriority == true) {
			addStatusClass('Low')
		};
		if (storedSettings.normalPriority == true) {
			addStatusClass('Normal')
		};
		if (storedSettings.highPriority == true) {
			addStatusClass('High')
		};
		if (storedSettings.urgentPriority == true) {
			addStatusClass('Urgent')
		};
	 }

 // Inject custom CSS styles into the page
	function customCss() {
		// Check and create custom CSS from textarea
		if (storedSettings.customCss !== '') {			
			var StrippedString = storedSettings.customCss.replace(/(<([^>]+)>)/ig,"");
			var addCss = '<style type="text/css">' + StrippedString + '</style>';
			$("head").append(addCss);
		};
		// Check and add custom CSS from url	
		if (storedSettings.customCssUrl !== '') {
			var addCssUrl = '<link rel="stylesheet "type="text/css" href="'+storedSettings.customCssUrl+'">';
			$("head").append(addCssUrl);
		};
	};

// send message to background.js to trigger notification
	function notify(id, status, title, message, iconUrl){
		chrome.runtime.sendMessage({notifyId: id, status: status, notifyTitle: title, notifyMessage: message, iconUrl: iconUrl }, function(response) {
			  console.log(response.responseStatus);			  
			});
	};	

	var onlinechecks = function() {
		// Add audio element to page to be triggered by notifications
		var audioUrl = chrome.runtime.getURL('/assets/audio/alert1.wav');
		$("body").append('<audio id="alert1" src="'+audioUrl+'" type="audio/mpeg"></audio>');		

		// Talk Checks
		if($("#voice-control").hasClass("off") === true) {
			notify('talk','offline',storedSettings.talkTitle, storedSettings.talkMessage, "../assets/img/phone-icon.png");
			document.getElementById('alert1').play();			
		}
		// Chat checks
		if ($("img[src*='offline']").length > 0 ) {
		notify('chat','offline',storedSettings.chatTitle, storedSettings.chatMessage, "../assets/img/chat-icon.png");
			document.getElementById('alert1').play();	
		}
		// Run the checks every x secs
		//setTimeout(onlinechecks, storedSettings.offlineAlertInt);
	}


// Make it so....
$(document).ready(function() {
    setTimeout(hideCustomField, 1700);
    setTimeout(highlights, 1600);
    customCss();
    if (storedSettings.offlineAlerts === true){setTimeout(onlinechecks, 5000);}
}), $('*').click(function() {
    setTimeout(hideCustomField, 1300);
    setTimeout(highlights, 1300);
    setTimeout(onlinechecks, 2000);// for debugging only remove in build.
}), $(window).focus(function() {
    setTimeout(hideCustomField, 1500);
    setTimeout(highlights, 1500);
});