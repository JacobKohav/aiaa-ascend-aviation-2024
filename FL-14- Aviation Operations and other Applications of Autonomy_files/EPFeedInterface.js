/* Copyright 2016 - ATIV Software */
var EPFeedInterface = function(){
	this.update_callback_arr = [];
	this.fetching = false;
    var get_callback        = null;
    var local = this;
    var repeater = setInterval(function(){
    	local.Updater();
    }, 25000);

    
    EPFeedInterface.prototype.Updater = function(){
        this.Update();
    }

	EPFeedInterface.prototype.Get = function(confid, feedtype, ts, limit, callback){
		if(local.fetching){return;}
		var messageToPost = {'interface':'feed','action':'get', 'confid':confid, 'feedtype':feedtype, 'ts':ts, 'limit':limit};
		get_callback = callback;
		this.fetching = true;
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
						var get = JSON.parse(data[0]);
						get_callback.GetEPFeedResponse(get['confid'], get['feedtype'], get['ts'], get['limit'], data[0], get['success']);
					} else {
						console.log("Get Failed: "+responseMsg[0]);
					}
				} else {
					console.log("Get Failed - ReadResponseXML failed: "+response);
				}
			},
			async:false
		}).done(function(){
			local.fetching = false;
		});
	};

	EPFeedInterface.prototype.Update = function(){
		// Update all of our listeners
	    var count=this.update_callback_arr.length;
	    for(var i=0;i<count;i++){
	        this.update_callback_arr[i].Update();
	    }
	}

	EPFeedInterface.prototype.RegisterUpdateCallback = function(obj){
		if(jQuery.inArray(obj, this.update_callback_arr) === -1){
			this.update_callback_arr.push(obj);
		}
	}
};