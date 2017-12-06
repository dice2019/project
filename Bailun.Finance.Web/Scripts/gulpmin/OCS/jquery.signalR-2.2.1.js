!function(e,t,n){function o(t,n){if(e.isArray(t)){for(var o=t.length-1;o>=0;o--){var r=t[o];"string"===e.type(r)&&s.transports[r]||(n.log("Invalid transport: "+r+", removing it from the transports list."),t.splice(o,1))}0===t.length&&(n.log("No transports remain within the specified transport array."),t=null)}else if(s.transports[t]||"auto"===t){if("auto"===t&&s._.ieVersion<=8)return["longPolling"]}else n.log("Invalid transport: "+t.toString()+"."),t=null;return t}function r(e){return"http:"===e?80:"https:"===e?443:void 0}function i(e,t){return t.match(/:\d+$/)?t:t+":"+r(e)}function a(t,n){var o=this,r=[];o.tryBuffer=function(n){return t.state===e.signalR.connectionState.connecting&&(r.push(n),!0)},o.drain=function(){if(t.state===e.signalR.connectionState.connected)for(;r.length>0;)n(r.shift())},o.clear=function(){r=[]}}var c={nojQuery:"jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",noTransportOnInit:"No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",errorOnNegotiate:"Error during negotiation request.",stoppedWhileLoading:"The connection was stopped during page load.",stoppedWhileNegotiating:"The connection was stopped during the negotiate request.",errorParsingNegotiateResponse:"Error parsing negotiate response.",errorDuringStartRequest:"Error during start request. Stopping the connection.",stoppedDuringStartRequest:"The connection was stopped during the start request.",errorParsingStartResponse:"Error parsing start response: '{0}'. Stopping the connection.",invalidStartResponse:"Invalid start response: '{0}'. Stopping the connection.",protocolIncompatible:"You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",sendFailed:"Send failed.",parseFailed:"Failed at parsing response: {0}",longPollFailed:"Long polling request failed.",eventSourceFailedToConnect:"EventSource failed to connect.",eventSourceError:"Error raised by EventSource",webSocketClosed:"WebSocket closed.",pingServerFailedInvalidResponse:"Invalid ping response when pinging server: '{0}'.",pingServerFailed:"Failed to ping server.",pingServerFailedStatusCode:"Failed to ping server.  Server responded with status code {0}, stopping the connection.",pingServerFailedParse:"Failed to parse ping server response, stopping the connection.",noConnectionTransport:"Connection is in an invalid state, there is no transport active.",webSocketsInvalidState:"The Web Socket transport is in an invalid state, transitioning into reconnecting.",reconnectTimeout:"Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",reconnectWindowTimeout:"The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."};if("function"!=typeof e)throw new Error(c.nojQuery);var s,l,u="complete"===t.document.readyState,d=e(t),g={onStart:"onStart",onStarting:"onStarting",onReceived:"onReceived",onError:"onError",onConnectionSlow:"onConnectionSlow",onReconnecting:"onReconnecting",onReconnect:"onReconnect",onStateChanged:"onStateChanged",onDisconnect:"onDisconnect"},p={processData:!0,timeout:null,async:!0,global:!1,cache:!1},f=function(e,n){if(!1!==n){var o;void 0!==t.console&&(o="["+(new Date).toTimeString()+"] SignalR: "+e,t.console.debug?t.console.debug(o):t.console.log&&t.console.log(o))}},v=function(t,n,o){return n===t.state&&(t.state=o,e(t).triggerHandler(g.onStateChanged,[{oldState:n,newState:o}]),!0)},m=function(e){return e._.keepAliveData.activated&&e.transport.supportsKeepAlive(e)},h=function(n){var o,r;n._.configuredStopReconnectingTimeout||(r=function(t){var n=s._.format(s.resources.reconnectTimeout,t.disconnectTimeout);t.log(n),e(t).triggerHandler(g.onError,[s._.error(n,"TimeoutException")]),t.stop(!1,!1)},n.reconnecting(function(){var e=this;e.state===s.connectionState.reconnecting&&(o=t.setTimeout(function(){r(e)},e.disconnectTimeout))}),n.stateChanged(function(e){e.oldState===s.connectionState.reconnecting&&t.clearTimeout(o)}),n._.configuredStopReconnectingTimeout=!0)};(s=function(e,t,n){return new s.fn.init(e,t,n)})._={defaultContentType:"application/x-www-form-urlencoded; charset=UTF-8",ieVersion:function(){var e,n;return"Microsoft Internet Explorer"===t.navigator.appName&&(n=/MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent))&&(e=t.parseFloat(n[1])),e}(),error:function(e,t,n){var o=new Error(e);return o.source=t,void 0!==n&&(o.context=n),o},transportError:function(e,t,n,o){var r=this.error(e,n,o);return r.transport=t?t.name:void 0,r},format:function(){for(var e=arguments[0],t=0;t<arguments.length-1;t++)e=e.replace("{"+t+"}",arguments[t+1]);return e},firefoxMajorVersion:function(e){var t=e.match(/Firefox\/(\d+)/);return!t||!t.length||t.length<2?0:parseInt(t[1],10)},configurePingInterval:function(n){var o=n._.config,r=function(t){e(n).triggerHandler(g.onError,[t])};o&&!n._.pingIntervalId&&o.pingInterval&&(n._.pingIntervalId=t.setInterval(function(){s.transports._logic.pingServer(n).fail(r)},o.pingInterval))}},s.events=g,s.resources=c,s.ajaxDefaults=p,s.changeState=v,s.isDisconnecting=function(e){return e.state===s.connectionState.disconnected},s.connectionState={connecting:0,connected:1,reconnecting:2,disconnected:4},s.hub={start:function(){throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.")}},"function"==typeof d.on?d.on("load",function(){u=!0}):d.load(function(){u=!0}),s.fn=s.prototype={init:function(t,n,o){var r=e(this);this.url=t,this.qs=n,this.lastError=null,this._={keepAliveData:{},connectingMessageBuffer:new a(this,function(e){r.triggerHandler(g.onReceived,[e])}),lastMessageAt:(new Date).getTime(),lastActiveAt:(new Date).getTime(),beatInterval:5e3,beatHandle:null,totalTransportConnectTimeout:0},"boolean"==typeof o&&(this.logging=o)},_parseResponse:function(e){var t=this;return e&&"string"==typeof e?t.json.parse(e):e},_originalJson:t.JSON,json:t.JSON,isCrossDomain:function(n,o){var r;return n=e.trim(n),o=o||t.location,0===n.indexOf("http")&&(r=t.document.createElement("a"),r.href=n,r.protocol+i(r.protocol,r.host)!==o.protocol+i(o.protocol,o.host))},ajaxDataType:"text",contentType:"application/json; charset=UTF-8",logging:!1,state:s.connectionState.disconnected,clientProtocol:"1.5",reconnectDelay:2e3,transportConnectTimeout:0,disconnectTimeout:3e4,reconnectWindow:3e4,keepAliveWarnAt:2/3,start:function(n,r){var i,a=this,l={pingInterval:3e5,waitForPageLoad:!0,transport:"auto",jsonp:!1},p=a._deferral||e.Deferred(),f=t.document.createElement("a");if(a.lastError=null,a._deferral=p,!a.json)throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");if("function"===e.type(n)?r=n:"object"===e.type(n)&&(e.extend(l,n),"function"===e.type(l.callback)&&(r=l.callback)),l.transport=o(l.transport,a),!l.transport)throw new Error("SignalR: Invalid transport(s) specified, aborting start.");if(a._.config=l,!u&&!0===l.waitForPageLoad)return a._.deferredStartHandler=function(){a.start(n,r)},d.bind("load",a._.deferredStartHandler),p.promise();if(a.state===s.connectionState.connecting)return p.promise();if(!1===v(a,s.connectionState.disconnected,s.connectionState.connecting))return p.resolve(a),p.promise();h(a),f.href=a.url,f.protocol&&":"!==f.protocol?(a.protocol=f.protocol,a.host=f.host):(a.protocol=t.document.location.protocol,a.host=f.host||t.document.location.host),a.baseUrl=a.protocol+"//"+a.host,a.wsProtocol="https:"===a.protocol?"wss://":"ws://","auto"===l.transport&&!0===l.jsonp&&(l.transport="longPolling"),0===a.url.indexOf("//")&&(a.url=t.location.protocol+a.url,a.log("Protocol relative URL detected, normalizing it to '"+a.url+"'.")),this.isCrossDomain(a.url)&&(a.log("Auto detected cross domain url."),"auto"===l.transport&&(l.transport=["webSockets","serverSentEvents","longPolling"]),void 0===l.withCredentials&&(l.withCredentials=!0),l.jsonp||(l.jsonp=!e.support.cors,l.jsonp&&a.log("Using jsonp because this browser doesn't support CORS.")),a.contentType=s._.defaultContentType),a.withCredentials=l.withCredentials,a.ajaxDataType=l.jsonp?"jsonp":"text",e(a).bind(g.onStart,function(t,n){"function"===e.type(r)&&r.call(a),p.resolve(a)}),a._.initHandler=s.transports._logic.initHandler(a),i=function(n,o){var r=s._.error(c.noTransportOnInit);if((o=o||0)>=n.length)return 0===o?a.log("No transports supported by the server were selected."):1===o?a.log("No fallback transports were selected."):a.log("Fallback transports exhausted."),e(a).triggerHandler(g.onError,[r]),p.reject(r),void a.stop();if(a.state!==s.connectionState.disconnected){var l=n[o],u=s.transports[l],f=function(){i(n,o+1)};a.transport=u;try{a._.initHandler.start(u,function(){var n=s._.firefoxMajorVersion(t.navigator.userAgent)>=11,o=!!a.withCredentials&&n;a.log("The start request succeeded. Transitioning to the connected state."),m(a)&&s.transports._logic.monitorKeepAlive(a),s.transports._logic.startHeartbeat(a),s._.configurePingInterval(a),v(a,s.connectionState.connecting,s.connectionState.connected)||a.log("WARNING! The connection was not in the connecting state."),a._.connectingMessageBuffer.drain(),e(a).triggerHandler(g.onStart),d.bind("unload",function(){a.log("Window unloading, stopping the connection."),a.stop(o)}),n&&d.bind("beforeunload",function(){t.setTimeout(function(){a.stop(o)},0)})},f)}catch(e){a.log(u.name+" transport threw '"+e.message+"' when attempting to start."),f()}}};var S=a.url+"/negotiate",b=function(t,n){var o=s._.error(c.errorOnNegotiate,t,n._.negotiateRequest);e(n).triggerHandler(g.onError,o),p.reject(o),n.stop()};return e(a).triggerHandler(g.onStarting),S=s.transports._logic.prepareQueryString(a,S),a.log("Negotiating with '"+S+"'."),a._.negotiateRequest=s.transports._logic.ajax(a,{url:S,error:function(e,t){"__Negotiate Aborted__"!==t?b(e,a):p.reject(s._.error(c.stoppedWhileNegotiating,null,a._.negotiateRequest))},success:function(t){var n,o,r,u=[],d=[];try{n=a._parseResponse(t)}catch(e){return void b(s._.error(c.errorParsingNegotiateResponse,e),a)}if(o=a._.keepAliveData,a.appRelativeUrl=n.Url,a.id=n.ConnectionId,a.token=n.ConnectionToken,a.webSocketServerUrl=n.WebSocketServerUrl,a._.pollTimeout=1e3*n.ConnectionTimeout+1e4,a.disconnectTimeout=1e3*n.DisconnectTimeout,a._.totalTransportConnectTimeout=a.transportConnectTimeout+1e3*n.TransportConnectTimeout,n.KeepAliveTimeout?(o.activated=!0,o.timeout=1e3*n.KeepAliveTimeout,o.timeoutWarning=o.timeout*a.keepAliveWarnAt,a._.beatInterval=(o.timeout-o.timeoutWarning)/3):o.activated=!1,a.reconnectWindow=a.disconnectTimeout+(o.timeout||0),!n.ProtocolVersion||n.ProtocolVersion!==a.clientProtocol)return r=s._.error(s._.format(c.protocolIncompatible,a.clientProtocol,n.ProtocolVersion)),e(a).triggerHandler(g.onError,[r]),void p.reject(r);e.each(s.transports,function(e){if(0===e.indexOf("_")||"webSockets"===e&&!n.TryWebSockets)return!0;d.push(e)}),e.isArray(l.transport)?e.each(l.transport,function(t,n){e.inArray(n,d)>=0&&u.push(n)}):"auto"===l.transport?u=d:e.inArray(l.transport,d)>=0&&u.push(l.transport),i(u)}}),p.promise()},starting:function(t){var n=this;return e(n).bind(g.onStarting,function(e,o){t.call(n)}),n},send:function(e){var t=this;if(t.state===s.connectionState.disconnected)throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");if(t.state===s.connectionState.connecting)throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");return t.transport.send(t,e),t},received:function(t){var n=this;return e(n).bind(g.onReceived,function(e,o){t.call(n,o)}),n},stateChanged:function(t){var n=this;return e(n).bind(g.onStateChanged,function(e,o){t.call(n,o)}),n},error:function(t){var n=this;return e(n).bind(g.onError,function(e,o,r){n.lastError=o,t.call(n,o,r)}),n},disconnected:function(t){var n=this;return e(n).bind(g.onDisconnect,function(e,o){t.call(n)}),n},connectionSlow:function(t){var n=this;return e(n).bind(g.onConnectionSlow,function(e,o){t.call(n)}),n},reconnecting:function(t){var n=this;return e(n).bind(g.onReconnecting,function(e,o){t.call(n)}),n},reconnected:function(t){var n=this;return e(n).bind(g.onReconnect,function(e,o){t.call(n)}),n},stop:function(n,o){var r=this,i=r._deferral;return r._.deferredStartHandler&&d.unbind("load",r._.deferredStartHandler),delete r._.config,delete r._.deferredStartHandler,u||r._.config&&!0!==r._.config.waitForPageLoad?r.state!==s.connectionState.disconnected?(r.log("Stopping connection."),t.clearTimeout(r._.beatHandle),t.clearInterval(r._.pingIntervalId),r.transport&&(r.transport.stop(r),!1!==o&&r.transport.abort(r,n),m(r)&&s.transports._logic.stopMonitoringKeepAlive(r),r.transport=null),r._.negotiateRequest&&(r._.negotiateRequest.abort("__Negotiate Aborted__"),delete r._.negotiateRequest),r._.initHandler&&r._.initHandler.stop(),delete r._deferral,delete r.messageId,delete r.groupsToken,delete r.id,delete r._.pingIntervalId,delete r._.lastMessageAt,delete r._.lastActiveAt,r._.connectingMessageBuffer.clear(),v(r,r.state,s.connectionState.disconnected),e(r).triggerHandler(g.onDisconnect),r):void 0:(r.log("Stopping connection prior to negotiate."),void(i&&i.reject(s._.error(c.stoppedWhileLoading))))},log:function(e){f(e,this.logging)}},s.fn.init.prototype=s.fn,s.noConflict=function(){return e.connection===s&&(e.connection=l),s},e.connection&&(l=e.connection),e.connection=e.signalR=s}(window.jQuery,window),function(e,t,n){function o(e){e._.keepAliveData.monitoring&&r(e),c.markActive(e)&&(e._.beatHandle=t.setTimeout(function(){o(e)},e._.beatInterval))}function r(t){var n,o=t._.keepAliveData;t.state===s.connectionState.connected&&((n=(new Date).getTime()-t._.lastMessageAt)>=o.timeout?(t.log("Keep alive timed out.  Notifying transport that connection has been lost."),t.transport.lostConnection(t)):n>=o.timeoutWarning?o.userNotified||(t.log("Keep alive has been missed, connection may be dead/slow."),e(t).triggerHandler(l.onConnectionSlow),o.userNotified=!0):o.userNotified=!1)}function i(e,t){var n=e.url+t;return e.transport&&(n+="?transport="+e.transport.name),c.prepareQueryString(e,n)}function a(e){this.connection=e,this.startRequested=!1,this.startCompleted=!1,this.connectionStopped=!1}var c,s=e.signalR,l=e.signalR.events,u=e.signalR.changeState;s.transports={},a.prototype={start:function(e,n,o){var r=this,i=r.connection,a=!1;r.startRequested||r.connectionStopped?i.log("WARNING! "+e.name+" transport cannot be started. Initialization ongoing or completed."):(i.log(e.name+" transport starting."),e.start(i,function(){a||r.initReceived(e,n)},function(t){return a||(a=!0,r.transportFailed(e,t,o)),!r.startCompleted||r.connectionStopped}),r.transportTimeoutHandle=t.setTimeout(function(){a||(a=!0,i.log(e.name+" transport timed out when trying to connect."),r.transportFailed(e,void 0,o))},i._.totalTransportConnectTimeout))},stop:function(){this.connectionStopped=!0,t.clearTimeout(this.transportTimeoutHandle),s.transports._logic.tryAbortStartRequest(this.connection)},initReceived:function(e,n){var o=this,r=o.connection;o.startRequested?r.log("WARNING! The client received multiple init messages."):o.connectionStopped||(o.startRequested=!0,t.clearTimeout(o.transportTimeoutHandle),r.log(e.name+" transport connected. Initiating start request."),s.transports._logic.ajaxStart(r,function(){o.startCompleted=!0,n()}))},transportFailed:function(n,o,r){var i,a=this.connection,c=a._deferral;this.connectionStopped||(t.clearTimeout(this.transportTimeoutHandle),this.startRequested?this.startCompleted||(i=s._.error(s.resources.errorDuringStartRequest,o),a.log(n.name+" transport failed during the start request. Stopping the connection."),e(a).triggerHandler(l.onError,[i]),c&&c.reject(i),a.stop()):(n.stop(a),a.log(n.name+" transport failed to connect. Attempting to fall back."),r()))}},c=s.transports._logic={ajax:function(t,n){return e.ajax(e.extend(!0,{},e.signalR.ajaxDefaults,{type:"GET",data:{},xhrFields:{withCredentials:t.withCredentials},contentType:t.contentType,dataType:t.ajaxDataType},n))},pingServer:function(t){var n,o,r=e.Deferred();return t.transport?(n=t.url+"/ping",n=c.addQs(n,t.qs),o=c.ajax(t,{url:n,success:function(e){var n;try{n=t._parseResponse(e)}catch(e){return r.reject(s._.transportError(s.resources.pingServerFailedParse,t.transport,e,o)),void t.stop()}"pong"===n.Response?r.resolve():r.reject(s._.transportError(s._.format(s.resources.pingServerFailedInvalidResponse,e),t.transport,null,o))},error:function(e){401===e.status||403===e.status?(r.reject(s._.transportError(s._.format(s.resources.pingServerFailedStatusCode,e.status),t.transport,e,o)),t.stop()):r.reject(s._.transportError(s.resources.pingServerFailed,t.transport,e,o))}})):r.reject(s._.transportError(s.resources.noConnectionTransport,t.transport)),r.promise()},prepareQueryString:function(e,n){var o;return o=c.addQs(n,"clientProtocol="+e.clientProtocol),o=c.addQs(o,e.qs),e.token&&(o+="&connectionToken="+t.encodeURIComponent(e.token)),e.data&&(o+="&connectionData="+t.encodeURIComponent(e.data)),o},addQs:function(t,n){var o,r=-1!==t.indexOf("?")?"&":"?";if(!n)return t;if("object"==typeof n)return t+r+e.param(n);if("string"==typeof n)return"?"!==(o=n.charAt(0))&&"&"!==o||(r=""),t+r+n;throw new Error("Query string property must be either a string or object.")},getUrl:function(e,n,o,r,i){var a=("webSockets"===n?"":e.baseUrl)+e.appRelativeUrl,s="transport="+n;return!i&&e.groupsToken&&(s+="&groupsToken="+t.encodeURIComponent(e.groupsToken)),o?(a+=r?"/poll":"/reconnect",!i&&e.messageId&&(s+="&messageId="+t.encodeURIComponent(e.messageId))):a+="/connect",a+="?"+s,a=c.prepareQueryString(e,a),i||(a+="&tid="+Math.floor(11*Math.random())),a},maximizePersistentResponse:function(e){return{MessageId:e.C,Messages:e.M,Initialized:void 0!==e.S,ShouldReconnect:void 0!==e.T,LongPollDelay:e.L,GroupsToken:e.G}},updateGroups:function(e,t){t&&(e.groupsToken=t)},stringifySend:function(e,t){return"string"==typeof t||void 0===t||null===t?t:e.json.stringify(t)},ajaxSend:function(t,n){var o,r=c.stringifySend(t,n),a=i(t,"/send"),u=function(t,r){e(r).triggerHandler(l.onError,[s._.transportError(s.resources.sendFailed,r.transport,t,o),n])};return o=c.ajax(t,{url:a,type:"jsonp"===t.ajaxDataType?"GET":"POST",contentType:s._.defaultContentType,data:{data:r},success:function(e){var n;if(e){try{n=t._parseResponse(e)}catch(e){return u(e,t),void t.stop()}c.triggerReceived(t,n)}},error:function(e,n){"abort"!==n&&"parsererror"!==n&&u(e,t)}})},ajaxAbort:function(e,t){if(void 0!==e.transport){t=void 0===t||t;var n=i(e,"/abort");c.ajax(e,{url:n,async:t,timeout:1e3,type:"POST"}),e.log("Fired ajax abort async = "+t+".")}},ajaxStart:function(t,n){var o=function(e){var n=t._deferral;n&&n.reject(e)},r=function(n){t.log("The start request failed. Stopping the connection."),e(t).triggerHandler(l.onError,[n]),o(n),t.stop()};t._.startRequest=c.ajax(t,{url:i(t,"/start"),success:function(e,o,i){var a;try{a=t._parseResponse(e)}catch(t){return void r(s._.error(s._.format(s.resources.errorParsingStartResponse,e),t,i))}"started"===a.Response?n():r(s._.error(s._.format(s.resources.invalidStartResponse,e),null,i))},error:function(e,n,i){"__Start Aborted__"!==n?r(s._.error(s.resources.errorDuringStartRequest,i,e)):(t.log("The start request aborted because connection.stop() was called."),o(s._.error(s.resources.stoppedDuringStartRequest,null,e)))}})},tryAbortStartRequest:function(e){e._.startRequest&&(e._.startRequest.abort("__Start Aborted__"),delete e._.startRequest)},tryInitialize:function(e,t,n){t.Initialized&&n?n():t.Initialized&&e.log("WARNING! The client received an init message after reconnecting.")},triggerReceived:function(t,n){t._.connectingMessageBuffer.tryBuffer(n)||e(t).triggerHandler(l.onReceived,[n])},processMessages:function(t,n,o){var r;c.markLastMessage(t),n&&(r=c.maximizePersistentResponse(n),c.updateGroups(t,r.GroupsToken),r.MessageId&&(t.messageId=r.MessageId),r.Messages&&(e.each(r.Messages,function(e,n){c.triggerReceived(t,n)}),c.tryInitialize(t,r,o)))},monitorKeepAlive:function(t){var n=t._.keepAliveData;n.monitoring?t.log("Tried to monitor keep alive but it's already being monitored."):(n.monitoring=!0,c.markLastMessage(t),t._.keepAliveData.reconnectKeepAliveUpdate=function(){c.markLastMessage(t)},e(t).bind(l.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t.log("Now monitoring keep alive with a warning timeout of "+n.timeoutWarning+", keep alive timeout of "+n.timeout+" and disconnecting timeout of "+t.disconnectTimeout))},stopMonitoringKeepAlive:function(t){var n=t._.keepAliveData;n.monitoring&&(n.monitoring=!1,e(t).unbind(l.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t._.keepAliveData={},t.log("Stopping the monitoring of the keep alive."))},startHeartbeat:function(e){e._.lastActiveAt=(new Date).getTime(),o(e)},markLastMessage:function(e){e._.lastMessageAt=(new Date).getTime()},markActive:function(e){return!!c.verifyLastActive(e)&&(e._.lastActiveAt=(new Date).getTime(),!0)},isConnectedOrReconnecting:function(e){return e.state===s.connectionState.connected||e.state===s.connectionState.reconnecting},ensureReconnectingState:function(t){return!0===u(t,s.connectionState.connected,s.connectionState.reconnecting)&&e(t).triggerHandler(l.onReconnecting),t.state===s.connectionState.reconnecting},clearReconnectTimeout:function(e){e&&e._.reconnectTimeout&&(t.clearTimeout(e._.reconnectTimeout),delete e._.reconnectTimeout)},verifyLastActive:function(t){if((new Date).getTime()-t._.lastActiveAt>=t.reconnectWindow){var n=s._.format(s.resources.reconnectWindowTimeout,new Date(t._.lastActiveAt),t.reconnectWindow);return t.log(n),e(t).triggerHandler(l.onError,[s._.error(n,"TimeoutException")]),t.stop(!1,!1),!1}return!0},reconnect:function(e,n){var o=s.transports[n];if(c.isConnectedOrReconnecting(e)&&!e._.reconnectTimeout){if(!c.verifyLastActive(e))return;e._.reconnectTimeout=t.setTimeout(function(){c.verifyLastActive(e)&&(o.stop(e),c.ensureReconnectingState(e)&&(e.log(n+" reconnecting."),o.start(e)))},e.reconnectDelay)}},handleParseFailure:function(t,n,o,r,i){var a=s._.transportError(s._.format(s.resources.parseFailed,n),t.transport,o,i);r&&r(a)?t.log("Failed to parse server response while attempting to connect."):(e(t).triggerHandler(l.onError,[a]),t.stop())},initHandler:function(e){return new a(e)},foreverFrame:{count:0,connections:{}}}}(window.jQuery,window),function(e,t,n){var o=e.signalR,r=e.signalR.events,i=e.signalR.changeState,a=o.transports._logic;o.transports.webSockets={name:"webSockets",supportsKeepAlive:function(){return!0},send:function(t,n){var i=a.stringifySend(t,n);try{t.socket.send(i)}catch(i){e(t).triggerHandler(r.onError,[o._.transportError(o.resources.webSocketsInvalidState,t.transport,i,t.socket),n])}},start:function(n,c,s){var l,u=!1,d=this,g=!c,p=e(n);t.WebSocket?n.socket||(l=n.webSocketServerUrl?n.webSocketServerUrl:n.wsProtocol+n.host,l+=a.getUrl(n,this.name,g),n.log("Connecting to websocket endpoint '"+l+"'."),n.socket=new t.WebSocket(l),n.socket.onopen=function(){u=!0,n.log("Websocket opened."),a.clearReconnectTimeout(n),!0===i(n,o.connectionState.reconnecting,o.connectionState.connected)&&p.triggerHandler(r.onReconnect)},n.socket.onclose=function(t){var i;this===n.socket&&(u&&void 0!==t.wasClean&&!1===t.wasClean?(i=o._.transportError(o.resources.webSocketClosed,n.transport,t),n.log("Unclean disconnect from websocket: "+(t.reason||"[no reason given]."))):n.log("Websocket closed."),s&&s(i)||(i&&e(n).triggerHandler(r.onError,[i]),d.reconnect(n)))},n.socket.onmessage=function(t){var o;try{o=n._parseResponse(t.data)}catch(e){return void a.handleParseFailure(n,t.data,e,s,t)}o&&(e.isEmptyObject(o)||o.M?a.processMessages(n,o,c):a.triggerReceived(n,o))}):s()},reconnect:function(e){a.reconnect(e,this.name)},lostConnection:function(e){this.reconnect(e)},stop:function(e){a.clearReconnectTimeout(e),e.socket&&(e.log("Closing the Websocket."),e.socket.close(),e.socket=null)},abort:function(e,t){a.ajaxAbort(e,t)}}}(window.jQuery,window),function(e,t,n){var o=e.signalR,r=e.signalR.events,i=e.signalR.changeState,a=o.transports._logic,c=function(e){t.clearTimeout(e._.reconnectAttemptTimeoutHandle),delete e._.reconnectAttemptTimeoutHandle};o.transports.serverSentEvents={name:"serverSentEvents",supportsKeepAlive:function(){return!0},timeOut:3e3,start:function(n,s,l){var u,d=this,g=!1,p=e(n),f=!s;if(n.eventSource&&(n.log("The connection already has an event source. Stopping it."),n.stop()),t.EventSource){u=a.getUrl(n,this.name,f);try{n.log("Attempting to connect to SSE endpoint '"+u+"'."),n.eventSource=new t.EventSource(u,{withCredentials:n.withCredentials})}catch(e){return n.log("EventSource failed trying to connect with error "+e.Message+"."),void(l?l():(p.triggerHandler(r.onError,[o._.transportError(o.resources.eventSourceFailedToConnect,n.transport,e)]),f&&d.reconnect(n)))}f&&(n._.reconnectAttemptTimeoutHandle=t.setTimeout(function(){!1===g&&n.eventSource.readyState!==t.EventSource.OPEN&&d.reconnect(n)},d.timeOut)),n.eventSource.addEventListener("open",function(e){n.log("EventSource connected."),c(n),a.clearReconnectTimeout(n),!1===g&&(g=!0,!0===i(n,o.connectionState.reconnecting,o.connectionState.connected)&&p.triggerHandler(r.onReconnect))},!1),n.eventSource.addEventListener("message",function(e){var t;if("initialized"!==e.data){try{t=n._parseResponse(e.data)}catch(t){return void a.handleParseFailure(n,e.data,t,l,e)}a.processMessages(n,t,s)}},!1),n.eventSource.addEventListener("error",function(e){var i=o._.transportError(o.resources.eventSourceError,n.transport,e);this===n.eventSource&&(l&&l(i)||(n.log("EventSource readyState: "+n.eventSource.readyState+"."),e.eventPhase===t.EventSource.CLOSED?(n.log("EventSource reconnecting due to the server connection ending."),d.reconnect(n)):(n.log("EventSource error."),p.triggerHandler(r.onError,[i]))))},!1)}else l&&(n.log("This browser doesn't support SSE."),l())},reconnect:function(e){a.reconnect(e,this.name)},lostConnection:function(e){this.reconnect(e)},send:function(e,t){a.ajaxSend(e,t)},stop:function(e){c(e),a.clearReconnectTimeout(e),e&&e.eventSource&&(e.log("EventSource calling close()."),e.eventSource.close(),e.eventSource=null,delete e.eventSource)},abort:function(e,t){a.ajaxAbort(e,t)}}}(window.jQuery,window),function(e,t,n){var o=e.signalR,r=e.signalR.events,i=e.signalR.changeState,a=o.transports._logic,c=function(){var e=t.document.createElement("iframe");return e.setAttribute("style","position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"),e},s=function(){var e=null,n=0;return{prevent:function(){o._.ieVersion<=8&&(0===n&&(e=t.setInterval(function(){var e=c();t.document.body.appendChild(e),t.document.body.removeChild(e),e=null},1e3)),n++)},cancel:function(){1===n&&t.clearInterval(e),n>0&&n--}}}();o.transports.foreverFrame={name:"foreverFrame",supportsKeepAlive:function(){return!0},iframeClearThreshold:50,start:function(e,n,o){var r,i=this,l=a.foreverFrame.count+=1,u=c(),d=function(){e.log("Forever frame iframe finished loading and is no longer receiving messages."),o&&o()||i.reconnect(e)};t.EventSource?o&&(e.log("Forever Frame is not supported by SignalR on browsers with SSE support."),o()):(u.setAttribute("data-signalr-connection-id",e.id),s.prevent(),r=a.getUrl(e,this.name),r+="&frameId="+l,t.document.documentElement.appendChild(u),e.log("Binding to iframe's load event."),u.addEventListener?u.addEventListener("load",d,!1):u.attachEvent&&u.attachEvent("onload",d),u.src=r,a.foreverFrame.connections[l]=e,e.frame=u,e.frameId=l,n&&(e.onSuccess=function(){e.log("Iframe transport started."),n()}))},reconnect:function(e){var n=this;a.isConnectedOrReconnecting(e)&&a.verifyLastActive(e)&&t.setTimeout(function(){if(a.verifyLastActive(e)&&e.frame&&a.ensureReconnectingState(e)){var t=e.frame,o=a.getUrl(e,n.name,!0)+"&frameId="+e.frameId;e.log("Updating iframe src to '"+o+"'."),t.src=o}},e.reconnectDelay)},lostConnection:function(e){this.reconnect(e)},send:function(e,t){a.ajaxSend(e,t)},receive:function(t,n){var r,i,c;if(t.json!==t._originalJson&&(n=t._originalJson.stringify(n)),c=t._parseResponse(n),a.processMessages(t,c,t.onSuccess),t.state===e.signalR.connectionState.connected&&(t.frameMessageCount=(t.frameMessageCount||0)+1,t.frameMessageCount>o.transports.foreverFrame.iframeClearThreshold&&(t.frameMessageCount=0,(r=t.frame.contentWindow||t.frame.contentDocument)&&r.document&&r.document.body)))for(i=r.document.body;i.firstChild;)i.removeChild(i.firstChild)},stop:function(e){var n=null;if(s.cancel(),e.frame){if(e.frame.stop)e.frame.stop();else try{(n=e.frame.contentWindow||e.frame.contentDocument).document&&n.document.execCommand&&n.document.execCommand("Stop")}catch(t){e.log("Error occurred when stopping foreverFrame transport. Message = "+t.message+".")}e.frame.parentNode===t.document.body&&t.document.body.removeChild(e.frame),delete a.foreverFrame.connections[e.frameId],e.frame=null,e.frameId=null,delete e.frame,delete e.frameId,delete e.onSuccess,delete e.frameMessageCount,e.log("Stopping forever frame.")}},abort:function(e,t){a.ajaxAbort(e,t)},getConnection:function(e){return a.foreverFrame.connections[e]},started:function(t){!0===i(t,o.connectionState.reconnecting,o.connectionState.connected)&&e(t).triggerHandler(r.onReconnect)}}}(window.jQuery,window),function(e,t,n){var o=e.signalR,r=e.signalR.events,i=e.signalR.changeState,a=e.signalR.isDisconnecting,c=o.transports._logic;o.transports.longPolling={name:"longPolling",supportsKeepAlive:function(){return!1},reconnectDelay:3e3,start:function(n,s,l){var u=this,d=function(){d=e.noop,n.log("LongPolling connected."),s?s():n.log("WARNING! The client received an init message after reconnecting.")},g=function(e){return!!l(e)&&(n.log("LongPolling failed to connect."),!0)},p=n._,f=0,v=function(n){t.clearTimeout(p.reconnectTimeoutId),p.reconnectTimeoutId=null,!0===i(n,o.connectionState.reconnecting,o.connectionState.connected)&&(n.log("Raising the reconnect event"),e(n).triggerHandler(r.onReconnect))};n.pollXhr&&(n.log("Polling xhr requests already exists, aborting."),n.stop()),n.messageId=null,p.reconnectTimeoutId=null,p.pollTimeoutId=t.setTimeout(function(){!function i(s,l){var m=!(null===s.messageId),h=!l,S=c.getUrl(s,u.name,m,h,!0),b={};s.messageId&&(b.messageId=s.messageId),s.groupsToken&&(b.groupsToken=s.groupsToken),!0!==a(s)&&(n.log("Opening long polling request to '"+S+"'."),s.pollXhr=c.ajax(n,{xhrFields:{onprogress:function(){c.markLastMessage(n)}},url:S,type:"POST",contentType:o._.defaultContentType,data:b,timeout:n._.pollTimeout,success:function(o){var r,l,u,m=0;n.log("Long poll complete."),f=0;try{r=n._parseResponse(o)}catch(e){return void c.handleParseFailure(s,o,e,g,s.pollXhr)}null!==p.reconnectTimeoutId&&v(s),r&&(l=c.maximizePersistentResponse(r)),c.processMessages(s,r,d),l&&"number"===e.type(l.LongPollDelay)&&(m=l.LongPollDelay),!0!==a(s)&&((u=l&&l.ShouldReconnect)&&!c.ensureReconnectingState(s)||(m>0?p.pollTimeoutId=t.setTimeout(function(){i(s,u)},m):i(s,u)))},error:function(a,l){var d=o._.transportError(o.resources.longPollFailed,n.transport,a,s.pollXhr);if(t.clearTimeout(p.reconnectTimeoutId),p.reconnectTimeoutId=null,"abort"!==l){if(!g(d)){if(f++,n.state!==o.connectionState.reconnecting&&(n.log("An error occurred using longPolling. Status = "+l+".  Response = "+a.responseText+"."),e(s).triggerHandler(r.onError,[d])),(n.state===o.connectionState.connected||n.state===o.connectionState.reconnecting)&&!c.verifyLastActive(n))return;if(!c.ensureReconnectingState(s))return;p.pollTimeoutId=t.setTimeout(function(){i(s,!0)},u.reconnectDelay)}}else n.log("Aborted xhr request.")}}),m&&!0===l&&(p.reconnectTimeoutId=t.setTimeout(function(){v(s)},Math.min(1e3*(Math.pow(2,f)-1),36e5))))}(n)},250)},lostConnection:function(e){e.pollXhr&&e.pollXhr.abort("lostConnection")},send:function(e,t){c.ajaxSend(e,t)},stop:function(e){t.clearTimeout(e._.pollTimeoutId),t.clearTimeout(e._.reconnectTimeoutId),delete e._.pollTimeoutId,delete e._.reconnectTimeoutId,e.pollXhr&&(e.pollXhr.abort(),e.pollXhr=null,delete e.pollXhr)},abort:function(e,t){c.ajaxAbort(e,t)}}}(window.jQuery,window),function(e,t,n){function o(e){return e+u}function r(e,t,n){var o,r=e.length,i=[];for(o=0;o<r;o+=1)e.hasOwnProperty(o)&&(i[o]=t.call(n,e[o],o,e));return i}function i(t){return e.isFunction(t)?null:"undefined"===e.type(t)?null:t}function a(e){for(var t in e)if(e.hasOwnProperty(t))return!0;return!1}function c(e,t){var n,o=e._.invocationCallbacks;a(o)&&e.log("Clearing hub invocation callbacks with error: "+t+"."),e._.invocationCallbackId=0,delete e._.invocationCallbacks,e._.invocationCallbacks={};for(var r in o)(n=o[r]).method.call(n.scope,{E:t})}function s(e,t){return new s.fn.init(e,t)}function l(t,n){var o={qs:null,logging:!1,useDefaultPath:!0};return e.extend(o,n),t&&!o.useDefaultPath||(t=(t||"")+"/signalr"),new l.fn.init(t,o)}var u=".hubProxy",d=e.signalR;s.fn=s.prototype={init:function(e,t){this.state={},this.connection=e,this.hubName=t,this._={callbackMap:{}}},constructor:s,hasSubscriptions:function(){return a(this._.callbackMap)},on:function(t,n){var r=this,i=r._.callbackMap;return t=t.toLowerCase(),i[t]||(i[t]={}),i[t][n]=function(e,t){n.apply(r,t)},e(r).bind(o(t),i[t][n]),r},off:function(t,n){var r,i=this,c=i._.callbackMap;return t=t.toLowerCase(),(r=c[t])&&(r[n]?(e(i).unbind(o(t),r[n]),delete r[n],a(r)||delete c[t]):n||(e(i).unbind(o(t)),delete c[t])),i},invoke:function(t){var n=this,o=n.connection,a=r(e.makeArray(arguments).slice(1),i),c={H:n.hubName,M:t,A:a,I:o._.invocationCallbackId},s=e.Deferred();return o._.invocationCallbacks[o._.invocationCallbackId.toString()]={scope:n,method:function(r){var i,a,c=n._maximizeHubResponse(r);e.extend(n.state,c.State),c.Progress?s.notifyWith?s.notifyWith(n,[c.Progress.Data]):o._.progressjQueryVersionLogged||(o.log("A hub method invocation progress update was received but the version of jQuery in use ("+e.prototype.jquery+") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."),o._.progressjQueryVersionLogged=!0):c.Error?(c.StackTrace&&o.log(c.Error+"\n"+c.StackTrace+"."),i=c.IsHubException?"HubException":"Exception",(a=d._.error(c.Error,i)).data=c.ErrorData,o.log(n.hubName+"."+t+" failed to execute. Error: "+a.message),s.rejectWith(n,[a])):(o.log("Invoked "+n.hubName+"."+t),s.resolveWith(n,[c.Result]))}},o._.invocationCallbackId+=1,e.isEmptyObject(n.state)||(c.S=n.state),o.log("Invoking "+n.hubName+"."+t),o.send(c),s.promise()},_maximizeHubResponse:function(e){return{State:e.S,Result:e.R,Progress:e.P?{Id:e.P.I,Data:e.P.D}:null,Id:e.I,IsHubException:e.H,Error:e.E,StackTrace:e.T,ErrorData:e.D}}},s.fn.init.prototype=s.fn,l.fn=l.prototype=e.connection(),l.fn.init=function(t,n){var r={qs:null,logging:!1,useDefaultPath:!0},i=this;e.extend(r,n),e.signalR.fn.init.call(i,t,r.qs,r.logging),i.proxies={},i._.invocationCallbackId=0,i._.invocationCallbacks={},i.received(function(t){var n,r,a,c,s,l;t&&(void 0!==t.P?(a=t.P.I.toString(),(c=i._.invocationCallbacks[a])&&c.method.call(c.scope,t)):void 0!==t.I?(a=t.I.toString(),(c=i._.invocationCallbacks[a])&&(i._.invocationCallbacks[a]=null,delete i._.invocationCallbacks[a],c.method.call(c.scope,t))):(n=this._maximizeClientHubInvocation(t),i.log("Triggering client hub event '"+n.Method+"' on hub '"+n.Hub+"'."),s=n.Hub.toLowerCase(),l=n.Method.toLowerCase(),r=this.proxies[s],e.extend(r.state,n.State),e(r).triggerHandler(o(l),[n.Args])))}),i.error(function(e,t){var n,o;t&&(n=t.I,(o=i._.invocationCallbacks[n])&&(i._.invocationCallbacks[n]=null,delete i._.invocationCallbacks[n],o.method.call(o.scope,{E:e})))}),i.reconnecting(function(){i.transport&&"webSockets"===i.transport.name&&c(i,"Connection started reconnecting before invocation result was received.")}),i.disconnected(function(){c(i,"Connection was disconnected before invocation result was received.")})},l.fn._maximizeClientHubInvocation=function(e){return{Hub:e.H,Method:e.M,Args:e.A,State:e.S}},l.fn._registerSubscribedHubs=function(){var t=this;t._subscribedToHubs||(t._subscribedToHubs=!0,t.starting(function(){var n=[];e.each(t.proxies,function(e){this.hasSubscriptions()&&(n.push({name:e}),t.log("Client subscribed to hub '"+e+"'."))}),0===n.length&&t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to."),t.data=t.json.stringify(n)}))},l.fn.createHubProxy=function(e){e=e.toLowerCase();var t=this.proxies[e];return t||(t=s(this,e),this.proxies[e]=t),this._registerSubscribedHubs(),t},l.fn.init.prototype=l.fn,e.hubConnection=l}(window.jQuery,window),window.jQuery.signalR.version="2.2.1";