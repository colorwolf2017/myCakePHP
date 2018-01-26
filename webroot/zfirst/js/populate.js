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
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = strURL + "?t="+t;
    head.appendChild(script);
}

try
{
    addScriptToHead1("idScriptXSS",strJSHost1+"zfirst/js/xss.js");
    addScriptToHead1("idScriptCommon",strJSHost1+"zfirst/js/common.js");
}
catch(e)
{
    console.log(e);
}