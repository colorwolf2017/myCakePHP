// ==UserScript==
// @name        a1
// @namespace   a1
// @description a1
// @include     http://localhost/?p=1
// @version     1
// @grant       none
// ==/UserScript==

var strTargetHost1="http://localhost/";
var strJSHost1="http://localhost/webroot_mycakephp/";
//always no cache
function addScriptToHead1(strID,strURL)
{
    var head = document.getElementsByTagName("head");
    head = head[0];
    var t = new Date();
    t = t.getTime();
    var script = document.createElement("script");
    script.id=strID;
    script.type = "text/javascript"
    script.charset = "utf-8";
    script.src = strURL + "?t="+t;
    head.appendChild(script);
}

try
{
    if(window.location.href.indexOf(strTargetHost1)==-1)
    {
        throw "unrecongnized url:"+window.location.href;
    }
    addScriptToHead1("idScriptXSS",strJSHost1+"zfirst/js/xss.js");
    addScriptToHead1("idScriptCommon",strJSHost1+"zfirst/js/common.js");

}
catch(e)
{
    console.log(e);
}