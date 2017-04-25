// Get locally stored options (object) and save to variable
	var storedSettings;
	chrome.storage.local.get(null , function(items){		
			storedSettings = items;
		});
/*************************************
 Hide custom field based on group name 
/*************************************
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

/**************************************
* Add Custom CSS from Extension Options
***************************************/
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
	 };
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

/***************************
* Desktop Notifications
****************************/
// send message to background.js to trigger notification
	function notify(id, status, title, message, iconUrl){
		chrome.runtime.sendMessage({notifyId: id, status: status, notifyTitle: title, notifyMessage: message, iconUrl: iconUrl }, function(response) {
			  console.log(response.responseStatus);			  
			});
	};
// Checks to make sure agents are online
	var onlinechecks = function() {
		// Talk Checks
		if($("#voice-control").hasClass("off") === true) {
			if (storedSettings.talkTitle ==='') {
				var talkTitleOut = 'TALK IS CURRENTLY SET TO OFFLINE!';
			} 
			else {
				talkTitleOut = storedSettings.talkTitle;
			};
			if (storedSettings.talkMessage ==='') {
				var talkMessageOut = 'You are currently set as offline for Zendesk Talk and will not receive any calls.';
			} 
			else {
				talkMessageOut = storedSettings.talkMessage;
			};
			notify('talk','offline',talkTitleOut, talkMessageOut, "../assets/img/phone-icon.png");
			if(storedSettings.offlineAudioAlerts === true){document.getElementById('alert1').play()};			
		}
		// Chat checks
		if ($("img[src*='offline']").length > 0 ) {
			if (storedSettings.chatTitle ==='') {
				var chatTitleOut = 'CHAT IS CURRENTLY SET TO OFFLINE!';
			} 
			else {
				chatTitleOut = storedSettings.chatTitle;
			};
			if (storedSettings.chatMessage ==='') {
				var chatMessageOut = 'You are currently set as offline for Zendesk Chat and will not receive any incoming chats.';
			} 
			else {
				chatMessageOut = storedSettings.chatMessage;
			};
		notify('chat','offline',chatTitleOut, chatMessageOut, "../assets/img/chat-icon.png");
			if(storedSettings.offlineAudioAlerts === true){document.getElementById('alert1').play()};	
		}
		// Run the checks every x secs
		setTimeout(onlinechecks, storedSettings.offlineAlertInt);
	};
// Check for tickets with a staus of new and alert
	var newTicketChecks = function() {
		var searchUrl = 'https://'+storedSettings.subdomain+'.zendesk.com/api/v2/search.json?query=status:new';
		$.get(searchUrl, function(data){
			var newTickets = data.results;					
			if (data.count === 0) {
				return;
			}
			else if (data.count === 1) {					
				notify('1newticket','','You have a new ticket!', 'There is a new ticket to be processed.', "../assets/img/icon.png");
				if(storedSettings.newTickAudioAlerts === true){document.getElementById('alert1').play()};
			}
			else {
				var newTickStr = 'There are new tickets to be processed.';
				notify('newtickets','','YOU HAVE NEW TICKETS!',newTickStr, "../assets/img/icon.png");
				if(storedSettings.newTickAudioAlerts === true){document.getElementById('alert1').play()};
			}
		},"json");
		// Run the checks every x secs
		setTimeout(newTicketChecks, storedSettings.newTickAlertInt);
	};

/***************
* Make it so....
****************/
$(document).ready(function() {
	// Add audio element to page to be triggered by notifications
		var audioUrl = chrome.runtime.getURL('/assets/audio/alert1.wav');
		$("body").append('<audio id="alert1" src="'+audioUrl+'" type="audio/mpeg"></audio>');

    setTimeout(hideCustomField, 1700);
    setTimeout(highlights, 1600);
    customCss();
    if(storedSettings.newTicketAlerts === true){setTimeout(newTicketChecks,7000)};
    if (storedSettings.offlineAlerts === true){setTimeout(onlinechecks, 5000);}
}), $('*').click(function() {
    setTimeout(hideCustomField, 1300);
    setTimeout(highlights, 1300);    
}), $(window).focus(function() {
    setTimeout(hideCustomField, 1700);
    setTimeout(highlights, 1500);
});