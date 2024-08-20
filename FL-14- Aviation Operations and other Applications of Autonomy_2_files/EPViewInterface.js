/* Copyright 2016 - ATIV Software - Web */
class EPViewInterface{

    constructor() {
        this.callbacks = [];
        this.resultCallback;
        this.resumeIdx = 0;
        this.pauseIdx = 0;
        this.timer;
        this.platform = 'web';
        this.DialogHandler = null;

        let loc = this;
        document.addEventListener("visibilitychange", function(){
            if(document.visibilityState == 'hidden'){
                loc.OnPause()
            } else if (document.visibilityState == 'visible'){
                loc.OnResume()
            }
        });
      }
	
    static GetInstance() {
        if (!EPViewInterface.instance) {
            EPViewInterface.instance = new EPViewInterface();
        }

        return EPViewInterface.instance;
    }
    
    RegisterForViewEvents(obj){
        // Do not reinsert the same object twice
        for (var i = 0; i < this.callbacks.length; i++) {
            if(this.callbacks[i] == obj){
                return;
            }
        }
        this.callbacks.push(obj);
    };
	
    OnResume(){
        var local = this;
        this.resumeIdx = 0;
        for (var i = 0; i < this.callbacks.length; i++) {
            setTimeout(function(){
                try {
                    if(typeof local.callbacks[local.resumeIdx].OnResume !== 'undefined'){
                        local.callbacks[local.resumeIdx].OnResume();
                    }
                  } catch (error) {
                    console.error(error);
                  }
                  
                
                local.resumeIdx++;
            }, 100*i);
        }
    };
    OnPause(){
        var local = this;
        this.pauseIdx = 0;
        for (var i = 0; i < this.callbacks.length; i++) {
            setTimeout(function(){
                try {
                    if(typeof local.callbacks[local.pauseIdx].OnPause !== 'undefined'){
                        local.callbacks[local.pauseIdx].OnPause();
                    }
                  } catch (error) {
                    console.error(error);
                  }
                
                local.pauseIdx++;
            }, 100*i);
        }
        return;
    };

    Log(msg){
        console.log(msg);
    };

    Close(urn){
        // No Implemented on WEB
        return;
    };
    CloseAndLaunch(urn){
        // No Implemented on WEB
        return;
    };
    Download(url){
        window.open(url, '_blank');
    };
    Launch(urn, confid){
         // No Implemented on WEB
         return;
    };
    Redraw(urn){
        // No Implemented on WEB
        return;
    };
    Login(){
        Login();
    };
    PostMessage(json){
        // No Implemented on WEB
        return;
    };
    
    LaunchURNForResult(urn, callback){
        // No Implemented on WEB
        return;
    }
    
    OnResult(success, data, err){
        // No Implemented on WEB
        return;
    }

    RegisterDialogHandler(obj){
        if(obj.OpenDialog !=='undefined'){
            this.DialogHandler = obj;
        }
    }

    ValidateURN(urn){
        urn = urn.replace(/\\:/g, "##COLON##"); // "\\:"
        var urn_arr = urn.split(":");
        if(urn_arr.length == 6 && urn_arr[0] == "urn" && urn_arr[1] == "eventpilot"){
            // Beyond this we need to make a server request to ensure the URN is valid
            return true;
        }else{
            //console.log("Invalid URN: " + urn);
            return false;
        }        
    }

    OpenDialog(url, params){
        console.log("EPView OpenDialog "+url);
        var local = this;
        if(url.length > 0){
            //console.log("EPView OpenDialog "+url);
            if(this.DialogHandler != null && typeof this.DialogHandler.OpenDialog !=='undefined'){
                if(local.ValidateURN(url)){
                    if(typeof params != 'undefined'){
                        if("confid" in params){
                            GetUrnToUrl(params['confid'], url, function(success, msg, data){
                                var json = JSON.parse(data);
                                if(success){
                                    local.DialogHandler.OpenDialog(json.url, params);
                                } else; {
                                    console.log(json);
                                    if(json.hasOwnProperty("loginrequired") && json.loginrequired == true){
                                        local.Login();
                                    }
                                }
                            });
                        }else{
                            alert("confid unknown");
                        }
                    }
                }else{
                    this.DialogHandler.OpenDialog(url, params);
                }
            } else {
                if(local.ValidateURN(url)){
                    if(typeof params != 'undefined'){
                        if("confid" in params){
                            
                            GetUrnToUrl(params['confid'], url, function(success, msg, data){
                                var json = JSON.parse(data);
                                if(success){
                                    if(("external" in params && params['external'] == 'true') || ("target" in params && params['target'] == '_blank')){
                                        window.open(json.url);
                                    } else {
                                        location.replace(json.url);
                                    } 
                                }else {
                                    console.log(data);
                                    if(json.hasOwnProperty("loginrequired" && json.loginrequired == true)){
                                        local.Login();
                                    }
                                }
                            });
                        }
                    }else{
                        alert("confid unknown");
                    }
                }else{
                    if(typeof params != 'undefined'){
                        if(("external" in params && params['external'] == 'true') || ("target" in params && params['target'] == '_blank')){
                            window.open(url);
                            return;
                        } else if("nohistory" in params && params['nohistory'] == 'true'){
                            url += '&nohistory=true';
                        }
                    }
                    if(IsExternalUrl(url) || url.startsWith("mailto:")){
                        window.open(url);
                    } else {
                        location.replace(url);
                    }
                }
            }
        }
    }
//# sourceURL=EPViewInterface.js
};
