/*
 *      ATIV Solutions LLC - Copyright 2023 - Confidential
 *      
 *      The following source code is property of ATIV Solutions LLC any unauthorized use
 *      is prohibited.
 *    
 *      Contact support@ativsolutions.com if you have any questions regarding licensing
 *      or general availibility of this code.
 *
 * EPUtility.js - This library is a general purpose utility 
 *                
 *
*/
function ucfirst(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str; // Return unchanged if not a string or empty string
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function GetMiniGif(){
    return "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}

// https://ativ.freshdesk.com/support/solutions/articles/6000158158-what-html-tags-are-supported-in-description-fields-
function StrHasOnlyValidTags(input) {
    const allowedTagsPattern = /<\/?(em|strong|sup|sub|u|hr|br|p|a|li|ul|span|del|ol)(\s[^>]*)?>/gi;

    // Remove allowed tags from the input string
    let sanitizedInput = input.replace(allowedTagsPattern, "");

    // Find any other tags in the sanitized string
    let invalidTags = sanitizedInput.match(/<[^>]*>/g);

    // Return a boolean indicating if there are any invalid tags and the list of invalid tags
    return [!invalidTags, invalidTags];
}

function EscapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;'; // Alternatively: &apos; (However, &apos; is not defined in HTML4, so &#39; is more widely compatible)
        default:
          return match;
      }
    });
  }

/**
 * Checks if a given string is a valid URN with the format "urn:eventpilot:..."
 * and consists of exactly six parts separated by colons. It also handles escaped
 * colons (represented as "\\:") by temporarily replacing them with a placeholder
 * string ("##COLON##") for accurate splitting.
 *
 * @param {string} urn - The URN string to be validated.
 * @returns {boolean} - Returns true if the string is a valid URN as per the defined format, false otherwise.
 */
function IsURN(urn) {
    // Encode escape colons first
    urn = urn.replace(/\\:/g, "##COLON##");

    if (urn.includes("urn:eventpilot:")) {
        let urnArray = urn.split(":");
        if (urnArray.length === 6) {
            return true;
        }
    }

    return false;
}


function IsValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (e) {
        return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function IsValidHttpsUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (e) {
        return false;  
    }

    return url.protocol === "https:";
}

function urlencode (str) {
    //       discuss at: https://locutus.io/php/urlencode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Kevin van Zonneveld (https://kvz.io)
    //      improved by: Brett Zamir (https://brett-zamir.me)
    //      improved by: Lars Fischer
    //      improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function
    //           note 1: expects to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: urlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin+van+Zonneveld%21'
    //        example 2: urlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: urlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    str = (str + '')
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/~/g, '%7E')
      .replace(/%20/g, '+')
  }

function GetEPShowDetails(msg){
    let html = `<!-- area that is able to be hidden and shown via a button -->
    <div id="epshowdetails_conttainer">
        <script>
            function epshowdetails() {
                var x = document.getElementById("epshowdetails_content");
                if (x.style.display === "none") {
                    $('#epshowdetails_content').fadeIn(1000);
                    $('#epshowdetails_button').html('Hide Details');
                } else {
                    $('#epshowdetails_content').fadeOut(1000);
                    $('#epshowdetails_button').html('Show Details');
                }
            }
        </script>
        <div id="epshowdetails_button" style="cursor:pointer;border:1px solid #555;padding:5px;border-radius:3px;max-width:100px;text-align:center;" onclick="epshowdetails()">Show Details</div>
        <div id="epshowdetails_content" style="display:none;margin-top:20px;">
            ${msg}
        </div>
    </div>`;
    return html;
}

async function EPAlertWithDetails(msg, details, blocking=false){
    await EPAlert(msg+'<br><br>'+GetEPShowDetails(details), blocking);
}

async function EPAlert(msg, blocking=false){
    await EPConfirm('Alert', msg, function(){}, '#555', false, blocking);
}

function IsLocalhost(val){
    if(val.indexOf(".local") >= 0){
        return true;
    }
    return false;
}

function IsStage(val){
    if(val.indexOf("stage") >= 0){
        return true;
    }
    return false;
}

function GetMatIcon(name, size, color){
    let html = '<i class="material-symbols-outlined" style="font-size:'+size+';color:'+color+';">'+name+'</i>';
    return html;
}

function GetActivityIcon(width, fill){
    return '<svg style="fill:'+fill+'" width="'+width+'" height="'+width+'" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring" style="background: none;"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="4" stroke="'+fill+'" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(34.6018 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>';
}

function GetPortalRedirectURL(confid, page, id){
    let idClause = '';
    if(typeof id != 'undefined'){
        idClause = "&id="+id;
    }
    let url = location.protocol + '//' + location.host + "/++SERVER++/?confid="+confid+"&page="+page+idClause;
    let portalurl = 'https://portal.ativ.me/';
    if(IsLocalhost(location.host)){
        portalurl = 'http://portal.local:8888/';
    }else if(IsStage(location.host)){
        portalurl = 'https://portalstage.ativ.me/';
    }
    return portalurl + '?url=' + encodeURIComponent(url);
}

function GetWebAppUrl(confid, page, id){
    let idClause = '';
    if(typeof id != 'undefined'){
        idClause = "&id="+id;
    }
    let pageClause = '';
    if(typeof page != 'undefined'){
        pageClause = "&page="+page;
    }
    let url = location.protocol + '//' + location.host + "/web/index.php?project="+confid+pageClause+idClause;
    return url;
}

function GetPlannerUrl(confid, page, id){
    let idClause = '';
    if(typeof id != 'undefined'){
        idClause = "&id="+id;
    }
    let pageClause = '';
    if(typeof page != 'undefined'){
        pageClause = "&page="+page;
    }
    let url = location.protocol + '//' + location.host + "/web/planner.php?id="+confid+pageClause+idClause;
    return url;
}

// If version 1 > version 2 = 1
// If version 1 = version 2 = 0
// If version 1 < version 2 = -1
// If invalid comparison = -2
// Versions should be in the form of
//   7.0.4 or 6.0.10
function CompareVersions(version1, version2){
    let arr1 = version1.split('.');
    let arr2 = version2.split('.');
    if(arr1.length == 3 && arr1.length == arr2.length){
        let param1 =  1000000*arr1[0]+1000*arr1[1]+arr1[2];
        let param2 =  1000000*arr2[0]+1000*arr2[1]+arr2[2];
        if(param1 > param2){
            return 1;
        }else if(param1 == param2){
            return 0;
        }else if(param1 < param2){
            return -1;
        }
    }

    return -2;   
}

/**
 * Returns the name of the mobile browser if the user agent is from a mobile device, otherwise returns an empty string.
 * @returns {string} - The name of the mobile browser if the user agent is from a mobile device, otherwise an empty string.
 */
// Function returns Android or iOS if mobile browser, otherwise returns empty string
function GetMobileBrowser(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/(android)/)){
        if(/Android [2-3]\.[0-3](\.[0-2])?/i.test(navigator.userAgent)) {
            // do nothing
        } else {
            return 'Android';
        }
    } else if(ua.match(/(iphone|ipod|ipad)/)){
        if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            if(/OS [2-4]_[0-2](_\d)? like Mac OS X/i.test(navigator.userAgent)) {
                // iOS 2-4 so Do Something
            } else if(/CPU like Mac OS X/i.test(navigator.userAgent)) {
                // iOS 1 so Do Something
            } else {
                if(ua.match(/(iphone)/)){
                    return 'iPhone';
                }else if(ua.match(/(ipod)/)){
                    return 'iPod';
                }else if(ua.match(/(ipad)/)){
                    return 'iPad';
                }
            }
        }
    }
    return '';
}

function IsSupportedBrowser(){
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");
    var isSafari = winNav.userAgent.indexOf("AppleWebKit") > -1;

    if (isIOSChrome || isSafari) {
        // is Google Chrome on IOS
        //console.log("Is iOS Google Chrome");
        return true;
    } else if(isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false) {
        // is Google Chrome
        //console.log("Is Google Chrome");
        return true;
    } else { 
        // not Google Chrome 
        //console.log("Is NOT Google Chrome");
        return false;
    } 
}

function md5 ( str ) {
    if(typeof str == 'undefined'){
        console.log("EPUtility::md5 - Invalid input string undefined");
    }

    var RotateLeft = function(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        };

    var AddUnsigned = function(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        };

    var F = function(x,y,z) { return (x & y) | ((~x) & z); };
    var G = function(x,y,z) { return (x & z) | (y & (~z)); };
    var H = function(x,y,z) { return (x ^ y ^ z); };
    var I = function(x,y,z) { return (y ^ (x | (~z))); };

    var FF = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var GG = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var HH = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var II = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var ConvertToWordArray = function(str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

    var WordToHex = function(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    //str = this.utf8_encode(str);
    x = ConvertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

function NumberToHex(input) {
    var hash = "",
      alphabet = "0123456789ABCDEF",
      alphabetLength = alphabet.length;
    do {
      hash = alphabet[input % alphabetLength] + hash;
      input = parseInt(input / alphabetLength, 10);
    } while (input);
  
    return hash;  
}

function HashCode(str){
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    if(hash < 0){
        hash = -hash;
    }
    return NumberToHex(hash);
}

/**
 * Creates a temporary download link and programmatically clicks it to trigger the download, then removes the link element.
 *
 * @function
 * @name ClickDownloadLink
 * @param {string} url - The URL of the file to download.
 * 
 * A brief link appears,
 * Dancing click, the download nears,
 * Then it disappears.
 */
function ClickDownloadLink(url){
    let aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = url.replace(/^.*[\\\/]/, '');
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
}

/**
 * @function
 * @name CopyValueToClipboard
 * @param {string} value - The value to be copied to the clipboard.
 * 
 * Value to be copied,
 * Invisible scribe at work,
 * "Copied" echoes back.
 */
function CopyValueToClipboard(value) {
    console.log("CopyValueToClipboard: "+value);
    // Switching to the new Clipboard API if available
    // Only functional on secure contexts (HTTPS), not localhost
    if(typeof navigator.clipboard != 'undefined'){
        navigator.clipboard.writeText(value).then(
            () => {
                console.log('Copied');
                EPToast("Copied");
            },
            err => console.error('Failed to copy', err)
        );
    }else{
        const txt = document.createElement('textarea');
        txt.value = value;
        document.body.appendChild(txt);
        txt.select();
        try {
            var successful = document.execCommand('copy'); // Deprecated
            var msg = successful ? 'Copied' : 'Copy failed';
            console.log(msg);
            setTimeout(EPToast('Copied'), 1000);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(txt);
    }
}

function EPConfirm(title, msg, callback, color, showcancel, blocking=false){
    return new Promise((resolve, reject)=>{
        let colorStyle = '#555';
        if(typeof color != 'undefined'){
            colorStyle = color;
        }
    
        let cancel = '<button class="epconfirm_button_cancel" style="display:inline-block;margin:.5em 1em;background: 0 0;border:none;border-radius: 4px;color:#555;position: relative;margin-left: 20px;min-width: 64px;padding: 0 16px;display: inline-block;font-size: 14px;font-weight: 500;text-transform: uppercase;letter-spacing: 0;overflow: hidden;will-change: box-shadow;transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);cursor: pointer;text-decoration: none;text-align: center;vertical-align: middle;">Cancel</button>';
        if(typeof showcancel != 'undefined' && !showcancel){
            cancel = '';       
        }    
        var dialog = '<div style="position:fixed;width:50%;min-width: 320px;top: 50%;left: 50%;transform: translate(-50%, -50%);display:flex;flex-direction:column;text-align: left;padding:1em;background:white;border: none;box-shadow: 0 9px 46px 8px rgba(0,0,0,.14), 0 11px 15px -7px rgba(0,0,0,.12), 0 24px 38px 3px rgba(0,0,0,.2);z-index:1010;" class="epconfirm_dialog" aria-live="polite">';
        dialog += '<h2 style="font-size:1.2em;padding: 24px 24px 0;margin: 0;">'+title+'</h2>';
        dialog += '<div style="padding: 20px 24px 24px;color:rgba(0,0,0,.54);font-size:1.0em;max-height:60vh;overflow:auto;">'+msg+'</div>';
        dialog += '<div style="padding: 8px 8px 8px 24px;display:flex;justify-content: flex-end;flex-wrap: wrap;">';
        dialog += cancel;
        dialog += '<button autofocus class="epconfirm_button_confirm" style="display:inline-block;margin:.5em 1em;background: 0 0;border:1px solid '+colorStyle+';border-radius: 4px;color:'+colorStyle+';position: relative;height: 36px;margin-left: 20px;min-width: 64px;padding: 0 16px;display: inline-block;font-size: 14px;font-weight: 500;text-transform: uppercase;letter-spacing: 0;overflow: hidden;will-change: box-shadow;transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);cursor: pointer;text-decoration: none;text-align: center;vertical-align: middle;">OK</button>';
        dialog += '</div>';
        dialog += '</div>';
        $('body').append(dialog);
    
        if(typeof showcancel != 'undefined' && !showcancel){
            // Only show cancel button if not showcancel
            $(document).bind("keypress.epconfirm_dialog", function(event) {
                if (event.keyCode == 13){
                    callback(true);
                    $('.epconfirm_dialog').remove();
                    $(document).unbind("keypress.epconfirm_dialog");
                }
            });
        }
        $('.epconfirm_button_cancel').on('click', function(){
            reject();
            if(typeof callback != 'undefined'){
                callback(false);
            }
            $('.epconfirm_dialog').remove();
            $(document).unbind("keypress.epconfirm_dialog");
        })
        $('.epconfirm_button_confirm').on('click', function(){
            resolve();
            if(typeof callback != 'undefined'){
                callback(true);
            }
            $('.epconfirm_dialog').remove();
            $(document).unbind("keypress.epconfirm_dialog");
        })

        if (!blocking) {
            resolve();
        }
    })
}

function ShowToast(str){
    $("#cms_toast").remove();
    var toastHtml = '<div id="cms_toast" aria-live="polite" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background: rgba(255,255,255,.9);padding: 1em;border: thin solid #AAA;border-radius: 4px;font-size: 1.2em;box-shadow: 3px 3px 3px rgba(0,0,0,.3);z-index:2000;">'+str+'</div>';
    $('body').append(toastHtml);
    $("#cms_toast").delay(2000).fadeOut("slow", function(){
        $(this).remove();
    });
}

function ShowPopup(str){
    $("#cms_popup").remove();
    var popupHtml = `<div onclick='HidePopup()' id='cms_popup' style='position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background: rgba(255,255,255,.9);padding: 1em;border: thin solid #AAA;border-radius: 2px;font-size: 1.2em;box-shadow: 1px 1px 1px rgba(0,0,0,.3);z-index:200;'>
                        <div style='max-width:600px;max-height:600px;overflow:hidden;overflow-y:auto;'>
                            <div style='float:right;cursor:pointer;margin-right:20px;' onclick='HidePopup()'>
                            <svg style="fill:#777;" width="15px" height="15px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"><path d="M52.627,10.201c0.781,0.781,0.781,2.047,0,2.828L13.029,52.627c-0.781,0.781-2.047,0.781-2.828,0l-2.829-2.829c-0.781-0.781-0.781-2.047,0-2.828L46.971,7.373c0.781-0.781,2.047-0.781,2.828,0L52.627,10.201z"/><path d="M49.799,52.627c-0.781,0.781-2.047,0.781-2.828,0L7.373,13.029c-0.781-0.781-0.781-2.047,0-2.828l2.829-2.829c0.781-0.781,2.047-0.781,2.828,0l39.598,39.598c0.781,0.781,0.781,2.047,0,2.828L49.799,52.627z"/></svg>
                            </div>
                            <div style='margin:40px;padding-right:20px;'>
                                ${str}
                            </div>
                        </div>
                     </div>`;
    $('body').append(popupHtml);
}

function HidePopup(){
    $("#cms_popup").remove();
}

function EPToast(str){
    ShowToast(str);
}

function HandleEPPostError(msg, data){
    if(Array.isArray(data)){
        data = data.join("");
    }
    if(data.startsWith("{")){
        try {
            var json = JSON.parse(data); // Parse the json (if possible)
            if(json != null){
                if(typeof json.msg !== 'undefined'){
                    EPAlert(json.msg);
                }
                if(typeof json.alert !== 'undefined'){
                    EPAlert(json.alert);
                }
                if(typeof json.url !== 'undefined'){
                    window.top.location.href = json.url;
                }
                if(typeof json.toast !== 'undefined'){
                    ShowToast(json.toast);
                }
                if(typeof json.console !== 'undefined'){
                    console.log(json.console);
                }
                console.log(msg);
                return json;
            }else{
                // Not a json object
                console.log(msg);
            }
        } catch(e) {
            console.log(e); // error in the above string (in this case, yes)!
            console.log(msg); // Error message
        }
    }else{
        // Not json data
        //console.log("Non-json error response("+msg+"):" + data);
    }
    return {};
}

function HandleEPPostReponse(res, callback){
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
        callback(false, res, "");
    }
}

function EPPostAjax(url, formdata, callback){
    var data = new FormData();
    for (var key in formdata) {
        data.append(key, formdata[key]);
    }
    $.ajax({
        url: url, 
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function(res) {
            HandleEPPostReponse(res, callback);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            var obj = {"console": "Connection Failure "+textStatus, "status": jqXHR.status};
            callback(false, "Connection Failure: "+textStatus, JSON.stringify(obj));
        }
    });
}

function EPPost(url, formdata, callback){
    $.post(url, formdata, function(res){
        HandleEPPostReponse(res, callback);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        var obj = {"console": "Connection Failure "+textStatus, "status": jqXHR.status};
        callback(false, "Connection Failure: "+textStatus, JSON.stringify(obj));
    });
}

function ReadResponseXML(response, success, responseMsg, data, debug){
	debug = typeof debug !== 'undefined' ? debug : false;	
    
    response = response.split('<?xml version="1.0" encoding="utf-8"?>').pop();
	$item = $(response).find('Item');
	if($item.length){
		itemSuccess = $item.attr('success');
		itemMsg = $item.attr('msg');
		itemData = $item.text();
		if(itemSuccess.length){
			success[0] = (itemSuccess == 'true' ? true:false);
		}else{
			if(debug){EPAlert("could not retrieve success attribute");}
			return false;
		}
		if(itemMsg != null){
			responseMsg[0] = itemMsg;
		}else{
			if(debug){EPAlert("could not retrieve item message attribute");}
			return false;
		}
		if(itemData.length > 0){
			data[0] = itemData;
		} else {
			data[0] = '';
		}
	}
	else{
		if(debug){EPAlert("couldn't parse XML response");}
		return false;
	}
	return true;
}

function AjaxPostRequest(url, data, async, callback_good, callback_bad){
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataCopy: data,
        dataType: null,
        async: async,
        success: function(res){
            if(res){
                var success     = new Array(1);
                var responseMsg = new Array(1);
                var data        = new Array(1);
                if(ReadResponseXML(res, success, responseMsg, data)){
                    if(success[0]){
                        callback_good(responseMsg[0], data[0]);
                    }else{
                        console.log("Response xml indicates failure: " + responseMsg);
                        if(callback_bad != null){
                            callback_bad("Response xml indicates failure: " + responseMsg);
                        }
                    }
                }else{
                    EPAlert("Response xml failed to parse: ");
                    if(callback_bad != null){								
                        callback_bad('Bad Response XML');
                    }
                }
            }else{
                EPAlert("Unable to fetch response");
                if(callback_bad != null){							
                    callback_bad('unable to fetch response');
                }
            }
        },
        failure: function(res){
            console.log("Connection failure");
            if(callback_bad != null){						
                callback_bad('connection failure');
            }
        },
        beforeSend: function(){

           },
           complete: function(){

           }					
    });	
}

function ConvertTimeHMS(timesec){
    var timesec = Math.round(timesec);
    var timemin = Math.round(timesec / 60);
    var timehr = Math.round(timemin / 60);    
    if(timemin > 0){
        timesec = timesec % 60;
    }
    if(timehr > 0){
        timemin = timesec % 60;
    }
    if(timesec < 10){
        timesec = "0"+timesec;
    }    
    if(timemin < 10){
        timemin = "0"+timemin;
    }    
    if(timehr < 10){
        timehr = "0"+timehr;
    }

    return timehr+":"+timemin+":"+timesec;
}

// Set the text color for the input box based on the selected bg color
function SetTextColor(rgb){
	var c = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';

    //http://www.w3.org/TR/AERT#color-contrast

    var o = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) /1000);

    if(o > 125) {
        $('.banner_bg_colorPicker').css('color', 'black');
    }else{ 
        $('.banner_bg_colorPicker').css('color', 'white');
    }
}

function SessionIdValid(confid, sessionid, user_data, callback)
{
    var success     = new Array(1);
    var responseMsg = new Array(1);
    var data        = new Array(1);             
    var formdata    = new FormData();
    formdata.append('confid', confid);  
    formdata.append('interface', 'agenda');
    formdata.append('action', 'validate_sessionid');  
    formdata.append('sessionid', sessionid);    
    
    $.ajax({
        url: "data/api.php",
        type: "POST",
        data: formdata,
        async: false,                   
        processData: false,
        contentType: false,
        success: function (res) {
            if(ReadResponseXML(res, success, responseMsg, data)){
                if(success[0]){ 
                    callback(true, user_data, responseMsg);
                }else{
                    callback(false, user_data, responseMsg);
                }
            }else{
                callback(false, user_data, 'Invalid response from server');
            }
        }
    });
    
    return true;
}

// Session storage
function SessionStoreSetItem(namespace, key, value){
    let storeKey = namespace + ':' + key;
    sessionStorage.setItem(storeKey, value);
}

function SessionStoreGetItem(namespace, key){
    let storeKey = namespace + ':' + key;
    return sessionStorage.getItem(storeKey);
}

function SessionStoreClearItem(namespace, key){
    let storeKey = namespace + ':' + key;
    sessionStorage.removeItem(storeKey);
}

// Local storage
function LocalStoreSetItem(namespace, key, value){
    let storeKey = namespace + ':' + key;
    localStorage.setItem(storeKey, value);
}

function LocalStoreGetItem(namespace, key){
    let storeKey = namespace + ':' + key;
    return localStorage.getItem(storeKey);
}

function LocalStoreClearItem(namespace, key){
    let storeKey = namespace + ':' + key;
    localStorage.removeItem(storeKey);
}

// Cookie storage
function SetCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function GetCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function DeleteCookie(name){
    setCookie(name,"",-1);
}

function IsExternalUrl(url) {
    let external = GetUrlParameter('external', url);
    if( (typeof target !== 'undefined' && target == 'external') || (typeof external !== 'undefined' && external == 'true') ){
        // target=external is set in the url query string
        return true;
    } else if(url != null && url != 'undefined' && url != ''){
        if(url.startsWith("http")){
            var domain = function(url) {
                return url.replace('http://','').replace('https://','').split('/')[0];
            };
            return domain(location.href) !== domain(url);
        }
    }
    // Assume a relative URL
    return false;
}

function BGStatusCheck(url, interface, action, arr, callback){
    var formdata = {'interface':interface,'action':action};
    // append arr items
    for (var key in arr) {
        if (arr.hasOwnProperty(key)){
            formdata[key] = arr[key];
        }
    }        
    EPPost(url, formdata, function(success, msg, data){
        if(success){
            var json = JSON.parse(data);
            if(json.continue == true){
                var tmp = null;
                try{
                    callback('continue', json);
                }catch(e){
                    console.log(e);
                }
                setTimeout(function(){BGStatusCheck(url, interface, action, arr, callback);}, 500);
            }else{
                console.log('GetComplete');
                var tmp = null;
                try{
                    callback('complete', json);
                }catch(e){
                    console.log(e);
                }
            }
        }else{
            callback('failure', msg);
        }
    });
}   

function IsPlannerIframe(){
    var sameOrigin;
    try
    {
        sameOrigin = window.parent.location.host == window.location.host;
    }
    catch (e)
    {
        sameOrigin = false;
    }
    if(sameOrigin){
        if(window.self != window.top){
            if(window.frameElement !== null){
                var frameID = window.frameElement.id;
                if(frameID.indexOf("_detail_iframe") >= 0){
                    return true;
                }
            }
        }
    }
        
    return false;
}

/**
 * Retrieves the value of a specified URL parameter from either the current
 * page's URL or a given URL.
 *
 * @param {string} sParam - The name of the URL parameter to retrieve.
 * @param {string} [url] - Optional. A full URL from which to retrieve the parameter.
 * 
 * @returns {(string|boolean|undefined)} 
 *  - The value of the parameter if it exists.
 *  - `true` if the parameter exists but has no value.
 *  - `undefined` if the parameter does not exist.
 *
 * @example
 * // Given URL: http://example.com/?name=John&age=30
 * GetUrlParameter('name');  // Returns 'John'
 * GetUrlParameter('age');   // Returns '30'
 * GetUrlParameter('gender');// Returns undefined
 */
function GetUrlParameter(sParam, url) {
    var temp =  window.location.search.substring(1);
    if(typeof url !== 'undefined'){
        temp = url.split('?')[1];
    }
    var sPageURL = decodeURIComponent(temp);
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// Get a lighter or darker version of a RGB, RGBA, or Hex color. Blend two colors, or convert a color from Hex to RGB or RGB to Hex
/*
    p  = percent lighter/darker/blend (1 = 100% lighter, -1 = 100% Darker, 0 = no change)
    c0 = color (RGB or HEX)
    c1 (optional for blending or converting) =  color (RGB or HEX) OR "c" to convert c0 to different color notation
    l (optional for liniear blending) = change from default log blending to linear blending
*/
function TransformColor(p,c0,c1,l){
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function IsLightColor(hexcolor) {
    // Convert hex color to RGB
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);
  
    // Calculate luminance of the color
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    // Calculate contrast ratio between the color and #555
    var contrastRatio = (luminance + 0.05) / (0.555 + 0.05);
  
    // Check if the contrast ratio is sufficient (greater than 4.5)
    return contrastRatio > 4.5;
  }
  

function isSuitableForWhiteText(hexcolor) {
    hexcolor = hexcolor.replace(/^#/, '');

    if (hexcolor.length === 3) {
        hexcolor = hexcolor[0] + hexcolor[0] + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2];
    } else if (hexcolor.length === 8) {
        let trans = hexcolor.substr(6, 2);
        if (parseInt(trans, 16) === 0) {
            return false; // Fully transparent color is not suitable for white text
        }
        hexcolor = hexcolor.substr(0, 6);
    } else if (hexcolor.length !== 6) {
        console.error("Invalid color format");
        return false;
    }

    var r = parseInt(hexcolor.substr(0, 2), 16) / 255;
    var g = parseInt(hexcolor.substr(2, 2), 16) / 255;
    var b = parseInt(hexcolor.substr(4, 2), 16) / 255;

    var luminance = 0.2126 * Math.pow(r, 2.2) + 0.7152 * Math.pow(g, 2.2) + 0.0722 * Math.pow(b, 2.2);

    // Contrast ratio with white, using the formula (L1 + 0.05) / (L2 + 0.05)
    var whiteContrastRatio = (1 + 0.05) / (luminance + 0.05);

    // Check if the contrast ratio meets the WCAG recommendation for normal-sized text (should be 4.5)
    return whiteContrastRatio >= 3;
}

function isLightColor(hexcolor){
    hexcolor = hexcolor.replace(/^#/, '');

    if(hexcolor.length == 3){
        hexcolor = hexcolor[0] + hexcolor[0] + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2];
    } else if(hexcolor.length == 8){
        let trans = hexcolor.substr(6,2);
        if(parseInt(trans,16) == 0){
            return true;
        }
        hexcolor = hexcolor.substr(0,6);
    } else if(hexcolor.length != 6){
        console.error("Invalid color format");
        return false;
    }
    
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);

    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    var contrastRatio = (luminance + 0.05) / (0.555 + 0.05);

    return contrastRatio > 4.5;
}

function SetDefineValue(table, name, val){
    var local = this;
    var messageToPost = {'interface':'settings','action':'set', 'table':table, 'define':name, 'value':val};
    EPPost('data/api.php', messageToPost, function(success, msg, data){
        if(success){
            return true;
        }else{
            console.log(msg);
        }
    });
    return false;
}

function GetDefineValue(table, name, val){
    var local = this;
    var messageToPost = {'interface':'settings','action':'set', 'table':table, 'define':name, 'value':val};
    EPPost('data/api.php', messageToPost, function(success, msg, data){
        if(success){
            $json = JSON.parse(data);
            return true;
        }else{
            console.log(msg);
        }
    });
    return '';
}

function SendReturnPostMessage(event, action, eptable, type, tid, data){
    if(typeof action != 'undefined'){
        if(typeof eptable == 'undefined'){
            eptable = '';
        }
        if(typeof type == 'undefined'){
            type = '';
        }
        if(typeof tid == 'undefined'){
            tid = '';
        }                
        if(typeof data == 'undefined'){
            data = '';
        }                        

        var arr = {'action':action, 'eptable':eptable, 'type':type, 'tid':tid, 'data':data};

        if(event.source && event.source[0] && typeof event.source[0].postMessage === 'function'){
            event.source[0].postMessage(JSON.stringify(arr), event.origin);
        }else if(event.source && typeof event.source[0] == 'undefined'){
            event.source.postMessage(JSON.stringify(arr), event.origin);
        }
    }else{
        console.log('action invalid');
    }
}

function SendParentPostMessage(action, eptable, type, tid, data){
    if(typeof action != 'undefined'){
        if(typeof eptable == 'undefined'){
            eptable = '';
        }
        if(typeof type == 'undefined'){
            type = '';
        }
        if(typeof tid == 'undefined'){
            tid = '';
        }                
        if(typeof data == 'undefined'){
            data = '';
        }                        

        var arr = {'action':action, 'eptable':eptable, 'type':type, 'tid':tid, 'data':data};
        parent.postMessage(JSON.stringify(arr), window.parent.origin); //  `*` on any domainoplann, use window.parent.origin
    }else{
        console.log('action invalid');
    }
}

function BaseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
   return base;
}

jQuery.fn.Center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

// This function checks if string is base64 encoded
function isBase64(str) {
    try {
        // Try to decode and re-encode the string
        // If it's not a valid base64, an exception will be thrown
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

// These functions are used to base64 encode/decode  unicode strings
// Standard atob() function does not work with some UTF8 strings
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function btoa_utf8(str) {
    const utf8Encoder = new TextEncoder();
    const utf8Bytes = utf8Encoder.encode(str);
    const latin1String = String.fromCharCode(...utf8Bytes);
    return btoa(latin1String);
}

function atob_utf8(base64) {
    const latin1String = atob(base64);
    const utf8Bytes = new Uint8Array(latin1String.length);
    for (let i = 0; i < latin1String.length; i++) {
      utf8Bytes[i] = latin1String.charCodeAt(i);
    }
    const utf8Decoder = new TextDecoder();
    return utf8Decoder.decode(utf8Bytes);
}

function RequireOnce(url) {
    if (!$("script[src='" + url + "']").length) {
        let str = 'script';
        let tmp = "<"+str+" type='text/javascript' src='" + url + "'/>";
        $('head').append(tmp);
    }
}

function RequireOnce2(url, callback) {
    // Check if the script is already included
    if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Success: Script loaded
        script.onload = () => {
            if(typeof callback == 'function'){
                callback(true, `Script loaded successfully: ${url}`, '');
            }
        };

        // Error: Script failed to load
        script.onerror = () => {
            if(typeof callback == 'function'){
                callback(false, `Failed to load script: ${url}`, '');
            }
        };

        // Append the script to the <head>
        document.head.appendChild(script);
    } else {
        if(typeof callback == 'function'){
            callback(true, `Script already loaded: ${url}`, '');
        }
    }
}

function RequireOnceCss(url) {
    if (!$("link[href='" + url + "']").length) {
        let tmp = "<link rel='stylesheet' href='" + url + "' type='text/css' media='screen'/>";
        $('head').append(tmp);
    }
}

// Chat GPT Generated functions
// Input of 0-255
function BlueToRed(value) {
    var red = value > 127 ? 255 : value * 2;
    var green = 0;
    var blue = value < 127 ? 255 : (255 - (value - 127) * 2);

    return rgbToHex(red, green, blue);
  }

  // Convert input to hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Convert RGBA of the form rgba(26,128,182,0.4)
function rgbaStrToHex(rgbaColor) {
    // Extract the numeric values from the RGBA color string
    const colorValues = rgbaColor.substring(rgbaColor.indexOf('(') + 1, rgbaColor.lastIndexOf(')')).split(',');

    // Convert the RGB values to hexadecimal
    const red = parseInt(colorValues[0]);
    const green = parseInt(colorValues[1]);
    const blue = parseInt(colorValues[2]);

    const rgbHex = ((red << 16) | (green << 8) | blue).toString(16).padStart(6, '0');

    // Extract the alpha value and convert it to hexadecimal
    const alpha = Math.round(parseFloat(colorValues[3]) * 255).toString(16).padStart(2, '0');

    // Combine the RGB hexadecimal and alpha values
    const hexColor = `#${rgbHex}${alpha}`;

    return hexColor;
}

// Convert RGBA to hex
function rgbaToHex(r, g, b, a) {
    return (
      "#" +
      componentToHex(r) +
      componentToHex(g) +
      componentToHex(b) +
      componentToHex(Math.round(a * 255))
    );
}

// Convert hex to rgba
function hex2rgba(hex, opacity) {
    var bigint;
    var r, g, b, a;
  
    if (hex.length === 4) {
      // Convert 3-digit shorthand hex (#FFF) to 6-digit hex (#FFFFFF)
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (_, r, g, b) {
        return '#' + r + r + g + g + b + b;
      });
    }
  
    if (hex.length === 7) {
      // Convert 6-digit hex (#FFFFFF) to RGBA
      bigint = parseInt(hex.replace(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, '$1$2$3'), 16);
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
      a = opacity;
    } else if (hex.length === 9) {
      // Convert 8-digit hex (#FFFFFFFF) to RGBA
      bigint = parseInt(hex.replace(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, '$1$2$3$4'), 16);
      r = (bigint >> 24) & 255;
      g = (bigint >> 16) & 255;
      b = (bigint >> 8) & 255;
      a = (bigint & 255) / 255;
    } else {
      throw new Error('Invalid hex format. Expected either 3-digit, 6-digit, or 8-digit hex value.');
    }
  
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function GetFilterName(field, val){
    var alias = '';
    
    if(field == 'day'){
        // parse day string
        var monthNames = [
            "Jan", "Feb", "Mar", "Apr", 
            "May", "Jun", "Jul", "Aug", 
            "Sep", "Oct", "Nov", "Dec"
        ];
        
        var dayNames = [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ]
        var parts = val.match(/(\d+)/g);
        var date = new Date(parts[0], parts[1]-1, parts[2]);
        var dayIndex = date.getDay();
        var day = date.getDate();
        var monthIndex = date.getMonth();

        alias = dayNames[dayIndex] + ' ' + day + ' '+ monthNames[monthIndex];
    } else {
        switch(val){
            case 'like':
                alias = 'Bookmarked';
                break;
            case 'note':
                alias = 'Noted';
                break;
            case 'schedule':
                alias = 'Scheduled';
                break;
            case 'credit':
                alias = 'Credit';
                break;
            case 'now':
                alias = 'Now';
                break;
            case 'future':
                alias = 'Future';
                break;
            case 'ondemand':
                alias = 'On Demand';
                break;
            case '00:00-11:59:59':
                alias = 'Morning';
                break;
            case '12:00-16:59:59':
                alias = 'Afternoon';
                break;
            case '17:00-23:59:59':
                alias = 'Evening';
                break;
            default:
                if(field == 'time'){
                    if((val.match(/-/g) || []).length == 1){
                        let timeArr = val.split('-');
                        
                        var start = timeArr[0].replace('_', ':').replace(/^0/, '').slice(0,-3);
                        var stop = timeArr[1].replace('_', ':').replace(/^0/, '').slice(0,-3);
                        
                        val = start + '-' + stop;
                    }
                }
                alias = val;
        }
    }
    return alias;
}