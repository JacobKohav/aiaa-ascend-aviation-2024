/* Copyright 2016 - ATIV Software */
var EPConnectInterface = function(){
	this.set_callback      = null;
	this.get_callback      = null;
	this.callback_map = [];

	EPConnectInterface.prototype.Set = function(confid, table, type, tid, idx, val, callback, oper){
		var local = this;
		if(typeof oper === "undefined") {
            oper = "store";
        }
		var messageToPost = {'interface':'epconnect', 'action':'set', 'confid':confid, 'table':table, 'type':type, 'tid':tid, 'idx':idx, 'val':val, 'oper':oper};
		this.set_callback = callback;
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
						var set = JSON.parse(data[0]);
						if(local.set_callback != null){
							local.set_callback.SetResponse(set['confid'], set['table'], set['type'], set['tid'], set['idx'], set['val'], set['success']);
						}
						return true;
					} else {
						console.log("Set Failed: "+responseMsg[0]);
					}
				} else {
					console.log("Set Failed - ReadResponseXML failed: "+response);
				}
				return false;
			},
			async:false
		});
	};

	EPConnectInterface.prototype.Get = function(confid, table, type, tid, idx, callback){
		var local = this;
		var messageToPost = {'interface':'epconnect','action':'get', 'confid':confid, 'table':table, 'type':type, 'tid':tid, 'idx':idx};
		this.get_callback = callback;
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
						var get = JSON.parse(data[0])
						local.get_callback.GetEPConnectResponse(get['confid'], get['table'], get['type'], get['tid'], get['idx'], get['val'], get['success']);
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

	EPConnectInterface.prototype.GetLastItem = function(confid, table, type, callback){
		// Not  implemented on Web as photo sharing is not yet supported
		return;
		var messageToPost = {'interface':'epconnect','action':'getlastitem', 'confid':confid, 'table':table, 'type':type};
		get_callback = callback;
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
						var get = JSON.parse(data[0])
						get_callback.GetLastItemEPConnectResponse(get['confid'], get['table'], get['type'], get['tid'], get['idx'], get['ts'], get['val'], get['success']);
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

	EPConnectInterface.prototype.GetTime = function(confid, callback){
		var messageToPost = {'interface':'epconnect','action':'getconferencetime', 'confid':confid};
		get_callback = callback;
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
						var get = JSON.parse(data[0])
						var confTime = get['conftime'];
						var unixTs = get['ts'];
						get_callback.GetTimeResponse(confTime, unixTs);
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

	EPConnectInterface.prototype.GetUserId = function(confid, callback){
		var messageToPost = {'interface':'epconnect','action':'getuserid', 'confid': confid};
		get_callback = callback;
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
						var upid = data[0];
						get_callback.GetUserIdResponse(upid, 'true');
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

	EPConnectInterface.prototype.Login = function(){
		//Login();
        var plannerSession = GetUrlParameter('plannersession');
        var confid = GetUrlParameter('project');
        if(plannerSession != 'true' && typeof confid != 'undefined'){
            let forwardUrl = encodeURIComponent(location.href);
            epView.OpenDialog("page.php?page=Login&project="+confid+"&url="+forwardUrl+"&error=error_logintoaccess&nohistory=true");
            return;
        }else{
            if(self!=top){
                parent.postMessage("Login","*");  //  `*` on any domainoplann
                return;
            }
        }
        // legacy login
        Login();
	};

	EPConnectInterface.prototype.GetLoggedIn = function(confid, callback){
		callback.GetLoggedInResponse(confid, callback.loggedin);
	};

	EPConnectInterface.prototype.IsUserBlocked = function(confid, callback){
		var messageToPost = {'interface':'epconnect','action':'isuserblocked', 'confid':confid, 'table':'user', 'type':'profile', 'tid':'name', 'idx':0};
		isuserblocked_callback = callback;
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
						var blockedStatus = data[0]
						isuserblocked_callback.IsUserBlockedResponse(blockedStatus);
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

	EPConnectInterface.prototype.GetUserType = function(confid, callback){
		var uid = Math.random().toString(36).substr(2, 9);
		this.callback_map[uid] = callback;

		var local = this;

		var messageToPost = {'interface':'epconnect','action':'get','confid':confid,'table':'user','type':'profile','tid':'type','idx':0,'uid':uid};

		$.ajax({
			type: 'POST',
			url: 'api.php',
			data: messageToPost,
			success: function (response) {
				var success     = new Array(1);
				var responseMsg = new Array(1);
				var data        = new Array(1);
				if (ReadResponseXML(response, success, responseMsg, data)) {
					if (success[0]) {
						var jsonobj = JSON.parse(data);
						local.callback_map[jsonobj.uid](jsonobj.val, true);
						delete local.callback_map[jsonobj.uid];
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

	EPConnectInterface.prototype.GetUserName = function(confid, callback){
		var uid = Math.random().toString(36).substr(2,9);
		this.callback_map[uid] = callback;

		var local = this;

		var messageToPost = {'interface':'epconnect','action':'get','confid':confid,'table':'user','type':'profile','tid':'username','idx':0,'uid':uid};

		$.ajax({
			type: 'POST',
			url: 'api.php',
			data: messageToPost,
			success: function (response) {
				var success = new Array(1);
				var responseMsg = new Array(1);
				var data = new Array(1);
				if (ReadResponseXML(response, success, responseMsg, data)) {
					if (success[0]) {
						var jsonobj = JSON.parse(data);
						local.callback_map[jsonobj.uid].GetUserNameResponse(jsonobj.val, true);
						delete local.callback_map[jsonobj.uid];
					} else {
						console.log("Get failed: "+responseMsg[0]);
					}
				} else {
					console.log("Get failed - ReadResponseXML failed: "+response);
				}
			},
			async:false
		});
	};

    EPConnectInterface.prototype.GetQuickaddButton = function(table, type, tid, callback){
        var local = this;

		var messageToPost = {'interface':'epconnect','action':'getquickadd','table':table,'type':type,'tid':tid};
        EPPost('api.php',messageToPost, function(success, msg, data){
            let json = JSON.parse(data);
            if(success){
                callback(json);
            }
        });
    }
};