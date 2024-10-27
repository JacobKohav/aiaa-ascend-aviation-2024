/*
 *      ATIV Solutions LLC - Copyright 2022 - Confidential
 *
 *      The following source code is property of ATIV Solutions LLC any unauthorized use
 *      is prohibited.
 *
 *      Contact support@ativsolutions.com if you have any questions regarding licensing
 *      or general availibility of this code.
 *
 *      EPFormat - Base class for EPFormat js classes
 */
class EPFormat{
    constructor(){
        this.confid     = null;
        this.apikey     = null;
        this.apikeytype = null;
    }//constructor

    SetApiKey(confid, apikeytype, apikey){
        this.confid     = confid;
        this.apikey     = apikey;
        this.apikeytype = apikeytype;
    }

    EPPost(url, formdata, callback){
        if(this.apikey != null){
            formdata['authapikeyconfid']   = this.confid;
            formdata['authapikeytype']     = this.apikeytype;
            formdata['authapikey']         = this.apikey;
        }
        EPPost(url, formdata, callback);
    }
} // End class