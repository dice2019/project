define(["molieInit","touchs"],function(m){function ImgInit(e){var t=m.moblieType();switch(t){case Consts._browseType.Android:androidImgClick(e);break;case Consts._browseType.Ios:iosImgClick(e);break;default:console.log(t)}}function androidImgClick(e){ImgDom=$("#"+e).find("img");var t=[];ImgDom.length>0&&ImgDom.each(function(e){if(this.src.indexOf("icon/loading.gif")<0){var n=this.src,r=this.title;t.push({src:this.src,title:this.title}),$(this).off().on("tap",function(){androidMethod(t,e)})}})}function androidMethod(e,t){androidFn(JSON.stringify(e),t)}function iosImgClick(e){ImgDom=$("#"+e).find("img");var t=[];ImgDom.length>0&&ImgDom.each(function(e){if(this.src.indexOf("icon/loading.gif")<0){var n=this.src,r=this.title;t.push({src:this.src,title:this.title}),$(this).off().on("tap",function(){iosMethod(t,e)})}})}function iosMethod(e,t){var n=m.IosEdition();n[0]<=7?IosMethod_7(JSON.stringify(e),t):IosMethod(JSON.stringify(e),t)}function Init(config){if(!config.id)return alert("必须传入图片的父级id"),!1;config.MethodName&&(androidFn=function(ImgAry,i){eval("nativeMethod."+config.MethodName+'(\'{ "ImgAry": '+ImgAry+', "i": "'+i+"\" }')")},IosMethod_7=function(ImgAry,i){eval(config.MethodName+'(\'{ "ImgAry": '+ImgAry+', "i": "'+i+"\" }')")},IosMethod=function(ImgAry,i){eval("window.webkit.messageHandlers."+config.MethodName+'.postMessage(\'{ "ImgAry": '+ImgAry+', "i": "'+i+"\" }')")}),ImgInit(config.id)}var androidFn=function(e,t){nativeMethod.ImagePagerStringPath('{ "ImgAry": '+e+', "i": '+t+" }")},IosMethod_7=function(e,t){ImagePagerStringPath('{ "ImgAry": '+e+', "i": '+t+" }")},IosMethod=function(e,t){window.webkit.messageHandlers.ImagePagerStringPath.postMessage('{ "ImgAry":'+e+', "i":'+t+"s}")};return{ImgInit:Init}});