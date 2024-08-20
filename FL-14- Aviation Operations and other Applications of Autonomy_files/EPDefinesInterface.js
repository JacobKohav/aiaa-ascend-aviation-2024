/* Copyright 2016 - ATIV Software */
var EPDefinesInterface = function(){
    this.callback      = null;

    this.callback_map  = [];

	EPDefinesInterface.prototype.Get = function(confid, define, callback){
		var messageToPost = {'interface':'epdefines','action':'getdefine', 'confid':confid, 'define':define};
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
						var defineArr = JSON.parse(data[0]);
						local.callback.GetDefineResponse(defineArr[0], defineArr[1]);
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

	EPDefinesInterface.prototype.GetDefine = function(confid, define, callback){
		// Insert callback into a map, this is sent along with the request and also returned from the response
		// we then lookup the callback using the identifier. In this way we can store multiple callbacks and 
		// respond to each one in kind
		var uid = Math.random().toString(36).substr(2, 9);
		this.callback_map[uid] = callback;

		var messageToPost = {'interface':'epdefines','action':'getdefine', 'confid':confid, 'define':define, 'uid':uid};

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
						var defineArr = JSON.parse(data[0]);

						// Make the callback
						local.callback_map[defineArr[2]]({'success':true}, defineArr[0], defineArr[1]);

						// Cleanup the callback map
						delete local.callback_map[defineArr[2]];
					} else {
						local.callback_map[defineArr[2]]({'success':false,'msg':"Get Failed: "+responseMsg[0]}, '', '');
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