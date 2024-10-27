/* Copyright 2019 - ATIV Software - iOS */
var EPEventInterface = function(){
    this.callback = '';
    this.getEventCallback = '';

    EPEventInterface.prototype.RegisterForStatus = function(confid, callback){
        return;
    };

    EPEventInterface.prototype.StatusUpdate = function(confid, data){
        return;
    };

    EPEventInterface.prototype.GetEventsByParentConfid = function(searchterm, confid, callback){
        let formdata = {'interface':'project', 'action':'get_events_by_parent_confid', 'confid':confid, 'searchterm':searchterm};
        EPPost('api.php', formdata, function(success, msg, data){
            if(success){
                success = 'true';
            }
            let json = JSON.parse(data);
            for (index = 0; index < json.length; index++) {
                let iconpath = "../doc/clients/"+json[index].orgid+"/"+json[index].confid+"/event_static_images/icon@2x.png";
                json[index].icon = iconpath;

                json[index].title = json[index].appname;

                json[index].dates = json[index].startdate + ' - ' + json[index].enddate;
            }            

            callback(success, json, msg);
        });
    }


    EPEventInterface.prototype.GetEvents = function(searchterm, orgid, callback){
        var messageToPost = {'interface':'project', 'action':'get_event_by_code', 'searchterm':searchterm, 'confid':'##CONFID##', 'username':'##APP_AUTH_1##', 'password':'##APP_AUTH_2##'};
		var local = this;
		this.getEventCallback = callback;
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
						//var data = JSON.parse(data[0]);
						local.getEventCallback(success[0], data[0]);
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

    EPEventInterface.prototype.Download = function(confid){
        return;
    };

    EPEventInterface.prototype.Cancel = function(confid){
        return;
    };

    EPEventInterface.prototype.Open = function(confid){
        location.replace = 'index.php?&project='+confid;
    };

    EPEventInterface.prototype.Delete = function(confid){
        return;
    };

};
