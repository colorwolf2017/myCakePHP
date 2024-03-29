var Common=
{
    //strTargetHost:"https://www.mytest.com/",
    //strJSHost:"https://test1-mycakephp.1d35.starter-us-east-1.openshiftapps.com/",
    strJSHost:"http://uyghurhome.ml/",
	//strTargetHost:"https://localhost/",
    //strJSHost:"https://localhost/webroot_mycakephp/",
    strTargetHost:"http://www.hoylam.net/",
    //strJSHost:"https://localhost/",
	getTargetHost:function()
	{
		return this.strTargetHost;
	},
	getJSHost:function()
	{
		return this.strJSHost;
	},
	//input a long int timestamp,return 2017-10-05 00:00:00
	int2SQLTime:function(iTime)
	{
		if(isNaN(iTime))
		{
			throw "Common.int2SQLTime parameter error,not a int";
		}
		if(iTime<=0)
		{
			throw "Common.int2SQLTime parameter error,must be greater than 0";
		}
		var strReturn="";
		var time=new Date(iTime);
		var iYear=time.getFullYear();
		var iMonth=time.getMonth()+1;
		var iDate=time.getDate();
		var iHour=time.getHours();
		var iMinute=time.getMinutes();
		var iSecond=time.getSeconds();
		var arrayValue=[iYear,iMonth,iDate,iHour,iMinute,iSecond];
		var arrayMiddle=["-","-"," ",":",":",""];
		for(var i=0;i<arrayValue.length;++i)
		{
			if(arrayValue[i]<10)
			{
				strReturn+="0";
			}
			strReturn+=arrayValue[i];
			strReturn+=arrayMiddle[i];
		}
		return strReturn;
	},
	getCurrentHost:function()
	{
		var strReturn="";
		var strURL=window.location.href;
		var reg=/^https?:\/\/[^\/]+\//;
		var array=strURL.match(reg);
		if(array==null)
		{
			var strMsg="error in Common.getCurrentHost,can not match http(s) host,current url is:"+window.location.href;
			throw strMsg;
		}
		if(array.length!==1)
		{
			var strMsg="error in Common.getCurrentHost match regular expression matchd not equal 1,it is:"+array.length+",current url is:"+window.location.href;
			throw strMsg;
		}
		else
		{
			strReturn=array[0];
		}
		return strReturn;
	},
	//add script to head
	addScriptToHead:function(strURL,strID,bCache,documentWhich)
	{
		//check strURL has host name
		if(strURL.indexOf("http")==-1)
		{
			//url conm from local host
			strURL=this.getJSHost()+strURL;
		}
		var script=documentWhich.createElement("script");
		script.type="text/javascript";
		script.charset="utf-8";
		if(strID!=null&&strID!="")
		{
			script.id=strID;
		}
		script.src=strURL;
		if(!bCache)
		{
            var t = new Date();
            t = t.getTime();
            script.src += "?t=" + t;
        }
		var head=documentWhich.getElementsByTagName("head");
		head=head[0];
		head.appendChild(script);
	},
	//load js,and callback given function
	callBackAfterJSLoad:function(strFilePath,strID,testFunction,callBackFunction,bCache,documentWhich)
	{
		if(strFilePath==null||strFilePath==="")
		{
			throw "function callBackAfterJSLoad parameter strFilePath can not be null！";
		}
		//callback
		if(testFunction!=null&&testFunction())
		{
			if(typeof(callBackFunction)==="function")
			{
				callBackFunction();
			}
		}
		else
		{
			this.addScriptToHead(strFilePath,strID,bCache,documentWhich);
			//makesure given js load success
			var iTestCounterTemp=0;
			var iIDTimerTemp=window.setInterval
			(
				function()
				{
					try
					{
						//case 1 no nned test
						if(testFunction===null||testFunction())
						{
							window.clearInterval(iIDTimerTemp);
							if(typeof(callBackFunction)==="function")
							{
								callBackFunction();
							}
						}
						else
						{
							//check next time
							iTestCounterTemp++;
							if(iTestCounterTemp>=50)
							{
								throw "can not load js file in 5 secondes:"+strFilePath;
							}
						}
					}
					catch(e)
					{
						window.clearInterval(iIDTimerTemp);
						console.log("callBackAfterJSLoad function exception:"+e);
					}
				},100
			);
		}
	},

	//function entry
	commonJSFunctionEntry:function()
	{
		//make sure main js load success
		var iTestCounter=0;
		var iIDTimerMainJS=window.setInterval
		(
			function()
			{
				try
				{
					if(typeof(mainJSFunctionEntry)=="undefined")
					{
						//check next time
						iTestCounter++;
						if(iTestCounter>=50)
						{
							throw "can not load main js！";
						}
					}
					else
					{
						window.clearInterval(iIDTimerMainJS);
						mainJSFunctionEntry();
					}
				}
				catch(e)
				{
					window.clearInterval(iIDTimerMainJS);
					console.log(e)
				}
			},100
		);
	}
};

try
{
	Common.commonJSFunctionEntry();
}
catch(e)
{
	console.log("common::exception:"+e);
}
