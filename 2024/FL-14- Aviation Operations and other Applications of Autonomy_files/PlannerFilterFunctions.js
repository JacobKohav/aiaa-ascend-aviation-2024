/*
 *      ATIV Solutions LLC - Copyright 2020 - Confidential
 *      
 *      The following source code is property of ATIV Solutions LLC any unauthorized use
 *      is prohibited.
 *    
 *      Contact support@ativsolutions.com if you have any questions regarding licensing
 *      or general availibility of this code.
 *
 *      PlannerFilterFunctions.js - This file provides functions to Add/Remove and retrieve filters from local store
 *      Relies on FilterFunctions.js
 *
 */

// This function depends on an array of UI input elements with a name = to the array.val
function RestoreFilterState(tableName, filter_data){	
	if (filter_data != null){		
		var i = 0;
		for (var item in filter_data) {		
			var filterField = filter_data[i].field;
			var filterName = filter_data[i].val;
			$('.filterListItem[data-table="'+tableName+'"][data-filterfield="'+filterField+'"][data-filterval="'+filterName+'"]').addClass('filterselected');
			HighlightFilterCategory(tableName, filterField)
			i++
		} 
	} else {
		console.log('filter_data is null');
	}
}

// This function checks to see if any filters are applied and if so, it shows the filter action bar at the top of the list view
function ShowFilterActionBar(tableName, filter_data) {
	if ($('.filters_container[data-table="'+tableName+'"]').find('.filterselected').length == 1 && InArray(filter_data,'int/html')){
		$('#'+tableName+'_filter_action_bar').hide();
	}else {
		var dateHeader = 0;
		if(tableName == 'agenda'){
			dateHeader = wp_agenda_date_header_height;
		}
		//var containerHeight = wp_list_no_action_bar_height - dateHeader;
		//var actionBarHeight = wp_list_actionbar_height;
		if(filter_data == ''){
			$('#'+tableName+'_filter_action_bar').hide();
			//$('.'+tableName+'_list_container').css({height: containerHeight+'px'});
		}else if ($('.filters_container[data-table='+tableName+']').find('.filterselected').length > 0){
			//$('.filter_action_bar').slideDown(200);
			$('#'+tableName+'_filter_action_bar').show();
			//$('.'+tableName+'_list_container').css({height: containerHeight - actionBarHeight +'px'});
		}else {
			//$('.filter_action_bar').slideUp(200);
			$('#'+tableName+'_filter_action_bar').hide();
			//$('.'+tableName+'_list_container').css({height: containerHeight+'px'});
		}
	}
}

function InArray(array,value){
	for(index in array){
		if(array[index].field == value){
			return true;
		}
	}	
	return false;	
}

// Adds a filter to a filter object already created (does not modify global setting)
function AddFilterWithObj(filterObj, field, val){
	//console.log('AddFilterWithObj - field: ' + field + ' val: '+ val);		
	var found = false;	
	var filter_array = [];	
	if(filterObj != undefined && filterObj != null && filterObj.length > 0){
		var filter_array = filterObj;//JSON.parse(filterObj);
		for (var i = 0; i < filter_array.length; i++) {
			if(filter_array[i].field == field && filter_array[i].val == val){
				// if filter is already there, do nothing
				found = true;						
			}
		}
	}
	if(!found){
		filter_array.push({"field":field, "val":val});
	}	
	return filter_array;
}

function FilterIsSet(filterObj, field){
	
	var filter_array = [];	

	if(filterObj != undefined && filterObj != null && filterObj.length > 0){
		var filter_array = filterObj;//JSON.parse(filterObj);
		
		for (var i = 0; i < filter_array.length; i++) {
			if(filter_array[i].field == field){
				return true;
			}
		}
	}	
	return false;
}

function GetFilterVal(filterObj, field){
	var filter_array = [];	

	if(filterObj != undefined && filterObj != null && filterObj.length > 0){
		var filter_array = filterObj;//JSON.parse(filterObj);
		
		for (var i = 0; i < filter_array.length; i++) {
			if(filter_array[i].field == field){
				return filter_array[i].val;
			}
		}
	}	
	return false;
}


// Removes all filters for a particular field
function RemoveAllFromFilterObj(filterObj, field){
	//console.log('RemoveAllFromFilterObj - field: ' + field);			
	
	filter_array = filterObj;//JSON.parse(filterObj);
	var found = false;
	for (var i = 0; i < filter_array.length; i++) {
		if(filter_array[i].field == field){
			// if found, remove the item
			filter_array.splice(i,1);
			i--;
			found = true;	
		}
	}
}


function AddFilter(table, field, val){
	//if(debug){console.log('AddFilter - table: ' + table + ' field: ' + field + ' val: '+ val);}
	var filterstor = plannerStorage.getItem(table +'_filter_array');
	if(filterstor == null){
		filter_array = [];
		filter_array.push({"field":field, "val":val});
		plannerStorage.setItem(table +'_filter_array', JSON.stringify(filter_array));
		return;
	}else{
		filter_array = JSON.parse(filterstor);
		var found = false;
		for (var i = 0; i < filter_array.length; i++) {
			if(filter_array[i].field == field && filter_array[i].val == val){
				// if filter is already there, do nothing
				found = true;						
			}
		}
		if(!found){
			filter_array.push({"field":field, "val":val});
			plannerStorage.setItem(table +'_filter_array', JSON.stringify(filter_array));
		}
	}
}

function RemoveAllFromFilter(table, field){
	//if(debug){console.log('RemoveAllFromFilter - table: ' + table + ' field: ' + field);}	
	var filterstor = plannerStorage.getItem(table +'_filter_array');

	if(filterstor == null){
		// if said filters are not set, do nothing
		return;
	}
	else{
		filter_array = JSON.parse(filterstor);
		var found = false;
		var filterLen = filter_array.length -1; // -1 for zero indexed array
		// This is kind strange. we are going to iterate backwards to pop elements off the array in reverse, 
		//so our array indexes dont get messed up inside the loop
		for (var i = filterLen; i >= 0 ; i--) {
			if(filter_array[i].field == field){
				// if found, remove the item
				filter_array.splice(i,1);
				found = true;
			}
		}
		if(found){
			// if the item was found/removed, resave the filters
			plannerStorage.setItem(table +'_filter_array', JSON.stringify(filter_array));
		}
	}
}

function RemoveFilter(table, field, val){
	//if(debug){console.log('RemoveFilter - table: ' + table + ' field: ' + field + ' val: '+ val);}
	var filterstor = plannerStorage.getItem(table +'_filter_array');
	if(filterstor == null){
		// if said filters are not set, do nothing
		return;
	}
	else{
		filter_array = JSON.parse(filterstor);
		var found = false;
		for (var i = 0; i < filter_array.length; i++) {
			if(filter_array[i].field == field && filter_array[i].val == val){
				// if found, remove the item
				filter_array.splice(i,1);
				found = true;				
			}
		}
		if(found){
			// if the item was found/removed, resave the filters
			plannerStorage.setItem(table +'_filter_array', JSON.stringify(filter_array));
		}
	}
}

// GetUrnHash(table)
function GetUrnHash(tableName){
	// This code fetches the URN prefilter, creates a hash so we can uniquely identify the cached list view
	var hash = '';
	if(typeof wp !== 'undefined'){
		var urn = '';
		var key = tableName+'_filter_urn';
		if(key in wp){
			urn = wp[key]; // Store urn
			hash = '_'+HashCode(urn);
		}	
		//console.log("GetUrnHash("+tableName+","+urn+")");
	}
	return hash;
}

function GetFilters(table){
	var filter_array = [];
	var filterstor = plannerStorage.getItem(table +'_filter_array');
	if(filterstor == null){
		return filter_array;
	}
	else{
		filter_array = JSON.parse(filterstor);
		return filter_array;
	}
}

function ClearFilters(table){
	plannerStorage.removeItem(table +'_filter_array');
	$('.filterListItem.filterselected').removeClass('filterselected');
	HighlightFilterItemIcons(table)
}


function CreateFilterString(filter_data){
	var filter 		= '';
	var filterTitle = '';
	var filterCount = 0;
	var i = 0;

	for (var item in filter_data) {
		// Create string of active filters except in the case of 'date', 'parent', '_search' and 'int/html'
		if((filter_data[item].field != 'date') && (filter_data[item].field != 'parent') && (filter_data[item].field != '_search') && (filter_data[item].field != 'mediatype')){
			// Added case where if excluded term make sure not to pre-insert comma, won't be needed
			if(i != 0 ){
				filter += ', ';
				filterTitle += ', ';
			}				
			filter += GetFilterName(filter_data[item].field, filter_data[item].val);
			filterTitle += filter_data[item].val;
			filterCount ++;
			i++;
		}
	}
	return {filter:filter, filterCount:filterCount, filterTitle:filterTitle};	
}

function GetFilterName(field, val){
	var alias = '';
	
	if(field == 'day'){
		if (val.length == 0) {	// check for OnDemand
			alias = "On Demand";
		} else {
			// parse day string
			var monthNames = [
			  	"Jan", "Feb", "Mar", "Apr", 
			  	"May", "Jun", "Jul", "Aug", 
			  	"Sep", "Oct", "Nov", "Dec"
			];
			
			var dayNames = [
				"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
			]
			var parts = val.match(/(\d+)/g);
			var date = new Date(parts[0], parts[1]-1, parts[2]);
			var dayIndex = date.getDay();
			var day = date.getDate();
			var monthIndex = date.getMonth();

		 	alias = dayNames[dayIndex] + ' ' + day + ' '+ monthNames[monthIndex];
		 }
	} else {
		switch(val){
			case 'like':
				alias = 'Bookmarked';
				break;
			case 'note':
				alias = 'Noted';
				break;
			case 'schedule':
				alias = 'Scheduled';
				break;
			case 'credit':
				alias = 'Credit';
				break;
			case 'now':
				alias = 'Now';
				break;
			case 'future':
				alias = 'Future';
				break;
			case 'ondemand':
				alias = 'On Demand';
				break;
			case '00:00-11:59:59':
				alias = 'Morning';
				break;
			case '12:00-16:59:59':
				alias = 'Afternoon';
				break;
			case '17:00-23:59:59':
				alias = 'Evening';
				break;
			default:
				if(field == 'time'){
					if((val.match(/-/g) || []).length == 1){
						timeArr = val.split('-');
						
						var start = timeArr[0].replace('_', ':').replace(/^0/, '').slice(0,-3);
						var stop = timeArr[1].replace('_', ':').replace(/^0/, '').slice(0,-3);
						
						val = start + '-' + stop;
					}
				}
				alias = val;
		}
		
	}
	return alias;
}

/**************************
* FILTER DRAWER FUNCTIONS
**************************/

function AttachSrollToFilterContainer(){
	$('.filteritems_list_container').scroll(function(){
		var container = this;
		$(container).find('.filterListItem').not('.count_added').each(function(){
			if(ElementIsVisibleInContainer(this, container)){	
				GetNumItemIdsFromSelector(this);
			} else {
				// exit the loop if we hit a div that is below the visible area
				return false;
			}
		})
	})
}

function ElementIsVisibleInContainer(element, container){
	var areaHeight = $(container).innerHeight();
    var top = $(element).position().top;
    var height = $(element).height();

    if (top > areaHeight){
		return false;
	} else {
		$(element).addClass('count_added')
	}
    return true;
}

function ToggleFilterItemsDrawer(table, id){
	// Collapse filter list
	// HideFilterItemsDrawer and ShowFilterItemsDrawer are defined in CommonWeb and PlannerSearchView 
	// as the two platforms have slightly different drawer behavior
	var profileSectionHeight = $('.user_profile_container:visible').outerHeight();

	$('.filter_options').css({'height':'calc(100% - ' + profileSectionHeight + 'px)'});
	if ($('.filter_options[data-filterid="'+id+'"]').is(":visible")){
		HideFilterItemsDrawer($('.filter_options[data-filterid="'+id+'"][data-table="'+table+'"]'));
	} else {
		ShowFilterItemsDrawer($('.filter_options[data-filterid="'+id+'"][data-table="'+table+'"]'));
	}
}

function GetNumItemIdsFromSelector(filterItem){
	var table = $(filterItem).attr('data-table');
	var filters = GetFilters(table);			
	var field = $(filterItem).attr('data-filterfield');
	var val = $(filterItem).attr('data-filterval');
	
	// Remove all fiters of this type, search filters and date filters to fetch across all items
	RemoveAllFromFilterObj(filters, field);
	RemoveAllFromFilterObj(filters, '_search');
	RemoveAllFromFilterObj(filters, 'date');

	// Apply this filter to get count of items as if this is the only filter of this type applied to results
	filters.push({"field":field, "val":val});
	// Ensure we are only showing parent sessions
	if(table == 'agenda'){
		filters.push({"field":"parent", "val":""});
	}

	var postdata = {'interface':'filter', 'confid':project, 'action':'count', 'table': table, 'filterfield':field, 'filters':filters, 'adapter':null};

	// Filter URN
	var urn = '';
	var key = table+'_filter_urn';
	if(key in wp){
		urn = wp[key]; // Store urn
		postdata["urn"] = urn; // Insert the URN if we have one
	}	

	$.post('api.php', postdata, function(res){
		if(res){
			var success     = new Array(1);
			var responseMsg = new Array(1);
			var data        = new Array(1);				
		    if(ReadResponseXML(res, success, responseMsg, data)){
                let json = JSON.parse(data[0]);
		    	let count = json.data;
				$(filterItem).find('.smart_filter_count').text(count);
				if(count == 0){
					$(filterItem).addClass('no_results');
				}
			}else{
				alert("Unable to read response getcategoryinfo: " + catid);
			}	
		}else{
			alert("Invalid response from getcategoryinfo: "+catid);
		}

	});
}

function HighlightCurrentFilters(tableName){
	var current_set_filters = GetFilters(tableName);
	$('.filterselected').removeClass('filterselected');
	
	for(var i = 0; i<current_set_filters.length; i++){
		field = current_set_filters[i]['field'];
		val = current_set_filters[i]['val'];
		
		//since each filter item is tagged with it's filter field & val, we just go through and make sure they have the 'filterselected' class
		$('.filterListItem[data-filterfield="'+field+'"][data-filterval="'+val+'"]').addClass('filterselected');
		
		$('.filter_options').each(function(){
			if( $(this).find('.filterselected').length > 0){
				var id = $(this).attr('data-filterid');
				$('.'+id+'_filter_header').addClass('filterselected');
			}
		})
	}
	HighlightFilterItemIcons(tableName)
}

function HighlightFilterCategory(tableName, filterId){
	if($('.filter_options[data-filterid='+filterId+'][data-table='+tableName+']').find(".filterselected").length > 0){
		$('.filters_list[data-table="'+tableName+'"] .'+filterId+'_filter_header').addClass('filterselected');
	} else {
		$('.filters_list[data-table="'+tableName+'"] .'+filterId+'_filter_header').removeClass('filterselected');
	}
	
	HighlightFilterItemIcons(tableName)
}


function HighlightFilterItemIcons(tableName){
	if ($(".filters_list")[0]){
		$('.filters_list[data-table='+tableName+']').children().each(function(){
			if($(this).find('img').length > 0){
				var src = $(this).find('img').attr('src');
				if( $(this).hasClass('filterselected') ){
					var newSrc = src.replace('_b.png', '_sel.png');
					$(this).find('img').attr('src', newSrc)
				} else {
					var newSrc = src.replace('_sel.png', '_b.png');
					$(this).find('img').attr('src', newSrc)
				}
			}
		});
	}
}

