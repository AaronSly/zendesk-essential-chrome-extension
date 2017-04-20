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
 	chrome.storage.local.get('lowPriority', function (data) {
		if (data.lowPriority == true) {
			addStatusClass('Low')
		}
	});

	chrome.storage.local.get('normalPriority', function (data) {
		if (data.normalPriority == true) {
			addStatusClass('Normal')
		}
	});

	chrome.storage.local.get('highPriority', function (data) {
		if (data.highPriority == true) {
			addStatusClass('High')
		}
	});

	chrome.storage.local.get('urgentPriority', function (data) {
		if (data.urgentPriority == true) {
			addStatusClass('Urgent')
		}
	});
 }

 // Inject custom CSS styles into the page
function customCss() {
	// Check and create custom CSS from textarea
	chrome.storage.local.get('customCss', function (css){		
		if (css.customCss !== '') {			
			var StrippedString = css.customCss.replace(/(<([^>]+)>)/ig,"");
			var addCss = '<style type="text/css">' + StrippedString + '</style>';
			$("head").append(addCss);
		};
	});

	// Check and create custom CSS from textarea
	chrome.storage.local.get('customCssUrl', function (cssUrl){		
		if (cssUrl.customCssUrl !== '') {
			var addCssUrl = '<link rel="stylesheet "type="text/css" href="'+cssUrl.customCssUrl+'">';
			$("head").append(addCssUrl);
		};
	});
};

function notify(id, status, title, message){
		// turn all this section into a function to reuse
		chrome.runtime.sendMessage({notifyId: id, status: status, notifyTitle: title, notifyMessage: message}, function(response) {
			  console.log(response.responseStatus);
			});
	};

var onlinechecks = function() {
	// Talk Checks
	if($("#voice-control").hasClass("off") === true) {
		notify('id1','offline','TALK TITLE IN FUNCTION', 'TALK MESSAGE IN FUNCTION');		
	}

	// Chat checks
	notify('id2','offline','TALK TITLE IN FUNCTION 2', 'TALK MESSAGE IN FUNCTION 2');
	// Run the checks every 30 secs
	//setTimeout(onlinechecks, 30000);
}


// Make it so...
$(document).ready(function() {
    setTimeout(hideCustomField, 1700);
    setTimeout(highlights, 1600);
    customCss();
    setTimeout(onlinechecks, 2000);
}), $('*').click(function() {
    setTimeout(hideCustomField, 1300);
    setTimeout(highlights, 1300);
    setTimeout(onlinechecks, 500);// for debugging only remove in build.
}), $(window).focus(function() {
    setTimeout(hideCustomField, 1500);
    setTimeout(highlights, 1500);
});