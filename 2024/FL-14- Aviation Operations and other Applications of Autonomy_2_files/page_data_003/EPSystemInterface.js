/* Copyright 2018 - ATIV Software - Server stub */
var EPSystemInterface = function(epSystemListener1){
    var epSystemListener = null;
    this.callback = '';
    this.callback_map = [];
    this.status_callbacks = [];

    EPSystemInterface.prototype.Init = function(epSystemListener1){
    };

    EPSystemInterface.prototype.Register = function(callback){
    };

    EPSystemInterface.prototype.Unregister = function(uid){
    };

    EPSystemInterface.prototype.GetStatus = function(callback){
    };

    EPSystemInterface.prototype.ReturnStatus = function(json, uid){
    };

    EPSystemInterface.prototype.SetStatus = function(val){
    };

    EPSystemInterface.prototype.GetData = function(callback){
        let formdata = {interface:'epsystem','action':'getdata'};
        EPPost('api.php',formdata, function(success, msg, data){
            let json = JSON.parse(data);
            if(success){
                callback(json);
            }
        });
    };

};
