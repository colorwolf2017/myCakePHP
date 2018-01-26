



function MainJSFunctionEntryXSSIndex()
{
    console.log("this is xss_index talking:"+typeof($));
    //console.log($("#page").length);
    //console.log(typeof(Common.callBackAfterJSLoad));
    var body=document.getElementsByTagName("body");
    body=body[0];

    var input=document.createElement("input");
    input.type="button";
    input.value="aaaaaaaaaaaaaaaaaa";
    input.onclik="alert(\"aa\");";
    input.width="500px";
    input.height="500px";
    //body.appendChild(input);

    window.setTimeout
    (
        function()
        {
            alert(typeof($));
            alert(window.location.href);
        },3000
    );
}
MainJSFunctionEntryXSSIndex();