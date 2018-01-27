// ==UserScript==
// @name        a1
// @namespace   a1
// @description a1
// @include     https://colorwolf2017.000webhostapp.com/2018/01/hello-world
// @version     1
// @grant       none
// ==/UserScript==


//include    http://localhost/?p=1
//var strTargetHost1="http://localhost/";
//var strJSHost1="http://localhost/webroot_mycakephp/";

//include     https://colorwolf2017.000webhostapp.com/2018/01/hello-world
var strTargetHost1="https://colorwolf2017.000webhostapp.com/";
var strJSHost1="https://localhost/";

//always no cache
function addScriptToHead1(strURL,strID)
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
    if(window.location.href.indexOf(strTargetHost1)===-1)
    {
        throw "unrecongnized url:"+window.location.href;
    }
    addScriptToHead1(strJSHost1+"zfirst/js/xss.js","idScriptXSS");
    addScriptToHead1(strJSHost1+"zfirst/js/common.js","idScriptCommon");
}
catch(e)
{
    console.log(e);
}
