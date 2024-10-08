/*
 *      ATIV Solutions LLC - Copyright 2024 - Confidential
 *
 *      The following source code is property of ATIV Solutions LLC any unauthorized use
 *      is prohibited.
 *
 *      Contact support@ativsolutions.com if you have any questions regarding licensing
 *      or general availibility of this code.
 *
 *      WebEPConnectInterface - Generated interface code, DO NOT EDIT (use tools/format.php to create)
 *      ******************** DO NOT EDIT THIS FILE, AUTO GENERATED **************************
 */
class EPFormatWebEPConnectInterface extends EPFormat{
    constructor(baseurl){
        super();

        this.url = null;
        if(typeof baseurl != 'undefined'){
            this.url = baseurl+'web/api.php';
        }
    }//constructor
    
    
    // Auto Generated - Do not edit
    GetQuickaddState(_url, table, tid, type, callback){
        if(_url == null || _url.length == 0){
            EPToast("Invalid URL");
            return;
        }
        let formdata = {interface:'epconnect','action':'list','table':table,'tid':tid,'type':type};
        this.EPPost(_url, formdata, callback);
    }

    // Auto Generated - Do not edit
    _GetQuickaddState(table, tid, type, callback){
        if(this.url == null || this.url.length == 0){
            EPToast("Invalid URL");
            return;
        }
        let formdata = {interface:'epconnect','action':'list','table':table,'tid':tid,'type':type};
        this.EPPost(this.url, formdata, callback);
    }
} // End class
//# sourceURL=EPFormatWebEPConnectInterface.js