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

	EPFeedInterface.prototype.Get = function(confid, feedtype, ts, limit, callback, eptable, type, typeid, idx, start, stop, rank){
		if(local.fetching){return;}
		var messageToPost = {'interface':'feed','action':'get', 'confid':confid, 'feedtype':feedtype};
		if(ts != null){     messageToPost['ts']      = ts;}
		if(eptable != null){messageToPost['eptable'] = eptable;}
		if(type != null){   messageToPost['type']    = type;}
		if(typeid != null){ messageToPost['typeid']  = typeid;}
		if(idx != null){    messageToPost['idx']     = idx;}
		if(start != null){  messageToPost['start']   = start;}
		if(stop != null){   messageToPost['stop']    = stop;}
		if(rank != null){   messageToPost['rank']    = rank;}
		if(limit != null){   messageToPost['limit']  = limit;}
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
						var get = JSON.parse(data);
						//                             confid,        feedtype,        ts,        limit,        data1,       success,        eptable,        type,        typeid,        idx,        start,        stop,        rank,        offset
						get_callback.GetEPFeedResponse(get['confid'], get['feedtype'], get['ts'], get['limit'], get['data'], get['success'], get['eptable'], get['type'], get['typeid'], get['idx'], get['start'], get['stop'], get['rank'], get['offset']);
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