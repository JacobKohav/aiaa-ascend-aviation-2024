/* Copyright 2016 - ATIV Software */
var EPTableInterface = function(){
    this.callback      = null;

    this.callback_map  = [];

	EPTableInterface.prototype.Get = function(confid, table, tid, callback){
		var messageToPost = {'interface':'eptable','action':'gettabledata', 'confid':confid, 'table':table, 'tid': tid};
		var local = this;
		this.callback = callback;
		$.ajax({
			type: 'POST',
			url: 'api.php',
			data: messageToPost,
			success: function (response) {
				var success     = new Array(1);
				var responseMsg = new Array(1);
				var data        = new Array(1);									
				if(ReadResponseXML(response, success, responseMsg, data)){
					if(success[0]){
						local.callback.GetTableResponse(data[0]);
					} else {
						console.log("Get Failed: "+responseMsg[0]);
					}
				} else {
					console.log("Get Failed - ReadResponseXML failed: "+response);
				}
			},
			async:false
		});
	};

	EPTableInterface.prototype.GetTableData = function(confid, table, tid, callback){
		// Insert callback into a map, this is sent along with the request and also returned from the response
		// we then lookup the callback using the identifier. In this way we can store multiple callbacks and 
		// respond to each one in kind
		var uid = Math.random().toString(36).substr(2, 9);
		this.callback_map[uid] = callback;

		var messageToPost = {'interface':'eptable','action':'gettabledata', 'confid':confid, 'table':table, 'tid': tid, 'uid':uid};

		var local = this;
		$.ajax({
			type: 'POST',
			url: 'api.php',
			data: messageToPost,
			success: function (response) {
				var success     = new Array(1);
				var responseMsg = new Array(1);
				var data        = new Array(1);									
				if(ReadResponseXML(response, success, responseMsg, data)){
					if(success[0]){
						// Parse the data response
						var tableArr = JSON.parse(data[0]);

						// Make the callback
						local.callback_map[tableArr.uid]({'success':true}, table, tid, tableArr);

						// Cleanup the callback map
						delete local.callback_map[tableArr.uid];
					} else {
						var tableArr = JSON.parse(data[0]);
						local.callback_map[tableArr.uid]({'success':false,'msg':"Get Failed: "+responseMsg[0]}, '', '');
					}
				} else {
					local.callback_map[uid]({'success':false,'msg':"Get Failed - ReadResponseXML failed: "+response}, '', '');
				}
			},
      		error: function() {
				local.callback_map[uid]({'success':false,'msg':"Connection Failed"}, '', '');
      		},
			async:true
		});
	};		
	
};