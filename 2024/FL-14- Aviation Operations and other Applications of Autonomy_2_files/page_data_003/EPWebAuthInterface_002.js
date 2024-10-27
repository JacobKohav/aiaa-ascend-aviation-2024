/* Copyright 2016 - ATIV Software */
var EPWebAuthInterface = function(){

    EPWebAuthInterface.prototype.ClearAuthCredentials = function(){
        // Implemented to support native calls
        return;
    }

    

	EPWebAuthInterface.prototype.EPWebPost = function(url, formdata, callback){
		$.post(url, formdata, function(res){
            var data        = new Array(1);
            var success     = new Array(1);
            var responseMsg = new Array(1);
            if(ReadResponseXML(res, success, responseMsg, data)){
                if(success[0]){	
                    callback({'success':true, 'message':responseMsg}, data);
                }else{
                    callback({'success':false, 'message':responseMsg}, data);
                }
            }else{
                callback({'success':false, 'message':responseMsg}, res);
            }
        });
	};

	EPWebAuthInterface.prototype.EPWebPost2 = function(url, formdata, callback){
		$.post(url, formdata, function(res){
            var data        = new Array(1);
            var success     = new Array(1);
            var responseMsg = new Array(1);
            if(ReadResponseXML(res, success, responseMsg, data)){
                if(success[0]){	
                    callback(true, responseMsg[0], data[0]);
                }else{
                    callback(false, responseMsg[0], data[0]);
                }
            }else{
                callback(false, responseMsg[0], res[0]);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            var obj = {"console": "Connection Failure "+textStatus, "status": jqXHR.status};
            callback(false, "Connection Failure: "+textStatus, JSON.stringify(obj));
        });
	};


    EPWebAuthInterface.prototype.ReadResponseXML = function(response, success, responseMsg, data, debug){
        debug = typeof debug !== 'undefined' ? debug : true;

        try{
        $item = $(response).find('Item');
        if($item.length){
            itemSuccess = $item.attr('success');
            itemMsg = $item.attr('msg');
            itemData = $item.text();
            if(itemSuccess.length){
                success[0] = (itemSuccess == 'true' ? true:false);
            }else{
                if(debug){alert("could not retrieve success attribute");}
                return false;
            }
            if(itemMsg != null){
                responseMsg[0] = itemMsg;
            }else{
                if(debug){alert("could not retrieve item message attribute");}
                return false;
            }
            if(itemData.length > 0){
                data[0] = itemData;
            } else {
                data[0] = '';
            }
        }
        else{
            if(debug){alert("couldn't parse XML response");}
            return false;
        }
        }catch(err){
            if(typeof epView != 'undefined'){
                epView.Log(err);
            }
            return false;
        }
        return true;
    }
};