function ValidateURN(urn){
	urn = urn.replace(/\\:/g, "##COLON##"); // "\\:"
	var urn_arr = urn.split(":");
	if(urn_arr.length == 6){
		// Beyond this we need to make a server request to ensure the URN is valid
		return true;
	}else{
		//console.log("Invalid URN: " + urn);
		return false;
	}
}

/// This functions create a URN, properly encodes colon and pipe symbols
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<value>|<name>=<value>|<name>=<value>
///
/// Arguments:
///    activity          - Activity field value
///    type              - Type field value
///    valArray (array)  - Value array (Use CreateURNValue function for each element)
///
/// Returns:
///   String - Resulting URN string
///
function CreateURN(activity, type, valArray){
	var urn = "urn:eventpilot:all:";
	urn += activity;
	urn += ":";
	urn += type;
	urn += ":";
	for (var i in valArray) {
		if(i > 0){
			urn += "|";
		}
		urn += valArray[i].replace(/:/g, "\\:").replace(/\|/g, "\\|");
	}

	return urn;
}
function CreateURNByPlatform(platform, activity, type, valArray){
	var urn = "urn:eventpilot:";
	urn += platform;
	urn += ":";
	urn += activity;
	urn += ":";
	urn += type;
	urn += ":";
	for (var i in valArray) {
		if(i > 0){
			urn += "|";
		}
		urn += valArray[i].replace(/:/g, "\\:").replace(/\|/g, "\\|");
	}

	return urn;
}

/// This functions create a value parameter (name/value pair) and properly
/// encodes it for equals sign
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<value>|<name>=<value>|<name>=<value>
///
/// Arguments:
///    name      - Name value
///    value     - Value
///
/// Returns:
///   String - Resulting value parameter
///
function CreateURNValue(name, val){
	return name + "=" + val.replace(/=/g, "\\=");
}

/// This functions parses an individual value from values
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<value>|<name>=<value>|<name>=<value>
///
/// Arguments:
///    value      - Value to parse
///    name (ref) - Name for the value
///    val  (ref) - Type name fetched from the URN
///
/// Returns:
///   true/false - Success or failure, see err (ref) for error message
///
function ParseURNValue(value, name, val){
	value = value.replace(/\\=/g, "##EQUAL##");
	var val_arr = value.split("=");
	if(val_arr.length == 2){
		name.push(val_arr[0]);
		val.push(val_arr[1].replace(/##EQUAL##/g, "="));
		return true;
	}

	return false;
}	

/// This function creates a value parameters from a sub value list properly encoded for semi-colon separators
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<subvalue1>;<subvalue2>|<name>=<subvalue1>;<subvalue2>|<name>=<subvalue1>;<subvalue2>
///
/// Arguments:
///    subValArr - Array of parameters that make up a single value as part of a name/value pair
///
/// Returns:
///   String - Resulting value string (made of subvalue parameters)
///
function CreateURNSubValue(subValArr){
	var value = "";
	for (var i in subValArr) {
		if(i > 0){
			value += ";";
		}
		value += subValArr[i].replace(/;/g, "\\;");
	}
	
	return value;
}

/// This functions parses sub values from a value parameter
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<value>|<name>=<value>
///     subvalues = <name>=<subvalue1>;<subvalue2>
///
/// Arguments:
///    value           - Value to parse
///    subValues (ref) - Resulting sub-values array
///
/// Returns:
///   true/false - Success or failure, see err (ref) for error message
///
function ParseURNSubValue(value, subValues){
	if(value.length > 0){
		value = value.replace(/\\;/g, "##SEMICOLON##");
		var vals = value.split(";");
		if(vals.length >= 1){
			for (var i in vals) {
				subValues.push(vals[i].replace(/##SEMICOLON##/g, ";"));
			}
			return true;
		}
	}

	return false;
}	

	
/// This functions parses a URN with the following format
/// 
///     urn:eventpilot:all:<activity>:<type>:<values>
///
///     values = <name>=<value>|<name>=<value>|<name>=<value>
///
/// Arguments:
///    urn            - URN to parse
///    activity       - Activity name fetched from the URN
///    type           - Type name fetched from the URN
///    valArray       - Value array returned
///
/// Returns:
///   true/false - Success or failure, see err (ref) for error message
///
function ParseURN(urn, activity, type, valArray){

	// Replace colon and pipe
	urn = urn.replace(/\\:/g, "##COLON##").replace(/\\\|/g, "##PIPE##");

	var urn_array = urn.split(":");
	if(urn_array.length == 6){
		activity.push(urn_array[3]);
		type.push(urn_array[4]);
		var arr  = urn_array[5].split("|");
		for (var i in arr) {
			valArray.push(arr[i].replace(/##COLON##/g, ':').replace(/##PIPE##/g, '|'));
		}// foreach
		return true;
	}else{
		//$err = 'Invalid field count: '.$urn;
	}
	
	return false;
}

function ValidateURL(url){
	var regexp = /^(http|https):\/\/[^ "]+$/;
	return regexp.test(url);
}

function ValidateURL_HTTPS(url){
	var regexp =/^(https):\/\/[^ "]+$/;
	return regexp.test(url);
}

function GetUrnToUrl(confid, urn, callback){
	var messageToPost = {'interface':'urn', 'action':'geturl', 'urn':urn, 'confid':confid};
	var local = this;
	$.ajax({
		type: 'POST',
		url: 'api.php',
		data: messageToPost,
		success: function (response) {
			HandleEPPostReponse(response, callback);
		},
		async:false
	});	
}

function URNStatus2(confid, urn, action, callback, elem, baseurl){

	var success     = new Array(1);
	var responseMsg = new Array(1);
	var data        = new Array(1);				
	var formdata = new FormData();
	formdata.append('confid', confid);	
	formdata.append('interface', 'urn');
	formdata.append('action', action);	
	formdata.append('urn', urn);	

	let url = 'data/api.php';
	if(typeof baseurl !== 'undefined'){
		url = baseurl + url;
	}

	$.ajax({
		url: url,
		type: "POST",
		data: formdata,
		async: false,					
		processData: false,
		contentType: false,
		success: function (res) {
		    if(ReadResponseXML(res, success, responseMsg, data)){
				if(success[0]){
					callback(true, data, responseMsg, urn, elem);
				}else{
					callback(false, data, responseMsg, urn, elem);
				}
			}else{
				callback(false, data, 'Invalid response from server', urn);
			}
		}
	});

	return true;
}

function URNStatus(confid, urn, user_data, callback){				
	
	var success     = new Array(1);
	var responseMsg = new Array(1);
	var data        = new Array(1);				
	var formdata = new FormData();
	formdata.append('confid', confid);	
	formdata.append('interface', 'urn');
	formdata.append('action', 'validate');	
	formdata.append('urn', urn);	
	
	$.ajax({
		url: "data/api.php",
		type: "POST",
		data: formdata,
		async: false,					
		processData: false,
		contentType: false,
		success: function (res) {
		    if(ReadResponseXML(res, success, responseMsg, data)){
				if(success[0]){	
					callback(true, user_data, responseMsg);
				}else{
					callback(false, user_data, responseMsg);
				}
			}else{
				callback(false, user_data, 'Invalid response from server');
			}
		}
	});
	
	return true;
}