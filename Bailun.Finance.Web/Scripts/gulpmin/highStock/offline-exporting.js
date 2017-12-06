!function(t){"object"==typeof module&&module.exports?module.exports=t:t(Highcharts)}(function(t){!function(t){function e(t,e){var n=i.getElementsByTagName("head")[0],o=i.createElement("script");o.type="text/javascript",o.src=t,o.onload=e,o.onerror=function(){console.error("Error loading script",t)},n.appendChild(o)}var n=t.merge,o=t.win,a=o.navigator,i=o.document,r=t.each,l=o.URL||o.webkitURL||o,c=/Edge\/|Trident\/|MSIE /.test(a.userAgent),s=/Edge\/\d+/.test(a.userAgent),g=c?150:0;t.CanVGRenderer={},t.dataURLtoBlob=function(t){if(o.atob&&o.ArrayBuffer&&o.Uint8Array&&o.Blob&&l.createObjectURL){t=t.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);for(var e=o.atob(t[3]),n=new o.ArrayBuffer(e.length),n=new o.Uint8Array(n),a=0;a<n.length;++a)n[a]=e.charCodeAt(a);return t=new o.Blob([n],{type:t[1]}),l.createObjectURL(t)}},t.downloadURL=function(e,n){var r,l=i.createElement("a");if("string"==typeof e||e instanceof String||!a.msSaveOrOpenBlob){if((s||2e6<e.length)&&!(e=t.dataURLtoBlob(e)))throw"Data URL length limit reached";if(void 0!==l.download)l.href=e,l.download=n,i.body.appendChild(l),l.click(),i.body.removeChild(l);else try{if(void 0===(r=o.open(e,"chart"))||null===r)throw"Failed to open window"}catch(t){o.location.href=e}}else a.msSaveOrOpenBlob(e,n)},t.svgToDataUrl=function(t){var e=-1<a.userAgent.indexOf("WebKit")&&0>a.userAgent.indexOf("Chrome");try{if(!e&&0>a.userAgent.toLowerCase().indexOf("firefox"))return l.createObjectURL(new o.Blob([t],{type:"image/svg+xml;charset-utf-16"}))}catch(t){}return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(t)},t.imageToDataUrl=function(t,e,n,a,r,l,c,s,d){var f,h=new o.Image,p=function(){setTimeout(function(){var o,l=i.createElement("canvas"),s=l.getContext&&l.getContext("2d");try{if(s){l.height=h.height*a,l.width=h.width*a,s.drawImage(h,0,0,l.width,l.height);try{o=l.toDataURL(e),r(o,e,n,a)}catch(o){f(t,e,n,a)}}else c(t,e,n,a)}finally{d&&d(t,e,n,a)}},g)},m=function(){s(t,e,n,a),d&&d(t,e,n,a)};f=function(){h=new o.Image,f=l,h.crossOrigin="Anonymous",h.onload=p,h.onerror=m,h.src=t},h.onload=p,h.onerror=m,h.src=t},t.downloadSVGLocal=function(n,c,s,g){function d(t,e){return e=new o.jsPDF("l","pt",[t.width.baseVal.value+2*e,t.height.baseVal.value+2*e]),o.svg2pdf(t,e,{removeInvalid:!0}),e.output("datauristring")}function f(){v.innerHTML=n;var e,o=v.getElementsByTagName("text"),a=v.getElementsByTagName("svg")[0].style;r(o,function(t){r(["font-family","font-size"],function(e){!t.style[e]&&a[e]&&(t.style[e]=a[e])}),t.style["font-family"]=t.style["font-family"]&&t.style["font-family"].split(" ").splice(-1),e=t.getElementsByTagName("title"),r(e,function(e){t.removeChild(e)})}),o=d(v.firstChild,0);try{t.downloadURL(o,x),g&&g()}catch(t){s()}}var h,p,m,u=!0,y=c.libURL||t.getOptions().exporting.libURL,v=i.createElement("div"),w=c.type||"image/png",x=(c.filename||"chart")+"."+("image/svg+xml"===w?"svg":w.split("/")[1]),b=c.scale||1,y="/"!==y.slice(-1)?y+"/":y;if("image/svg+xml"===w)try{a.msSaveOrOpenBlob?((p=new MSBlobBuilder).append(n),h=p.getBlob("image/svg+xml")):h=t.svgToDataUrl(n),t.downloadURL(h,x),g&&g()}catch(t){s()}else"application/pdf"===w?o.jsPDF&&o.svg2pdf?f():(u=!0,e(y+"jspdf.js",function(){e(y+"svg2pdf.js",function(){f()})})):(h=t.svgToDataUrl(n),m=function(){try{l.revokeObjectURL(h)}catch(t){}},t.imageToDataUrl(h,w,{},b,function(e){try{t.downloadURL(e,x),g&&g()}catch(t){s()}},function(){var r=i.createElement("canvas"),l=r.getContext("2d"),c=n.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*b,d=n.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*b,f=function(){l.drawSvg(n,0,0,c,d);try{t.downloadURL(a.msSaveOrOpenBlob?r.msToBlob():r.toDataURL(w),x),g&&g()}catch(t){s()}finally{m()}};r.width=c,r.height=d,o.canvg?f():(u=!0,e(y+"rgbcolor.js",function(){e(y+"canvg.js",function(){f()})}))},s,s,function(){u&&m()}))},t.Chart.prototype.getSVGForLocalExport=function(e,n,o,a){var i,r,l,c,s,g,d=this,f=0;t.wrap(t.Chart.prototype,"getChartHTML",function(t){var e=t.apply(this,Array.prototype.slice.call(arguments,1));return l=this.options,r=this.container.cloneNode(!0),e}),d.getSVGForExport(e,n),i=r.getElementsByTagName("image");try{if(i.length)for(s=0,g=i.length;s<g;++s)c=i[s],t.imageToDataUrl(c.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:c},e.scale,function(t,e,n){++f,n.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",t),f===i.length&&a(d.sanitizeSVG(r.innerHTML,l))},o,o,o);else a(d.sanitizeSVG(r.innerHTML,l))}catch(t){o()}},t.Chart.prototype.exportChartLocal=function(e,n){var o=this,a=t.merge(o.options.exporting,e),i=function(){if(!1===a.fallbackToExportServer){if(!a.error)throw"Fallback to export server disabled";a.error(a)}else o.exportChart(a)};c&&("application/pdf"===a.type||o.container.getElementsByTagName("image").length&&"image/svg+xml"!==a.type)||"application/pdf"===a.type&&o.container.getElementsByTagName("image").length?i():o.getSVGForLocalExport(a,n,i,function(e){-1<e.indexOf("<foreignObject")&&"image/svg+xml"!==a.type?i():t.downloadSVGLocal(e,a,i)})},n(!0,t.getOptions().exporting,{libURL:"https://code.highcharts.com/5.0.14/lib/",menuItemDefinitions:{downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}}})}(t)});