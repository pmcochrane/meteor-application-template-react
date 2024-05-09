import { Meteor } 										from 'meteor/meteor';
// import * as checkBrowser 								from 'check-browser';

/* tslint:disable */
let logPrefix="[javascriptGlobals]";
console.log(logPrefix,"Meteor Initialising...");

// default to debug mode if in development
var debugmode=(process.env.NODE_ENV === "development"); // tslint:disable-line
// debugmode=true;

// Initialise the global console log routines - changed when angular boots up
var method: any;
var noop = function() { // noop function
};
var methods = [
	'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn',
];
var l = methods.length;
var cons: any;
// let evergreenBrowser=true;


//--------------------------------------------------------------------------------------------------------------
if (Meteor.isClient) {
	logPrefix+="[Client]"
	console.log(logPrefix, "Processing...Client...Debugmode:", debugmode);

	Function.prototype.trace = function() {
		var trace = [];
		var current = this;
		while(current) {
			trace.push(current.signature());
			current = current.caller;
		}
		return trace;
	};

	Function.prototype.signature = function() {
		var signature = {
			name: this.getName(),
			params: [],
			toString: function signatureToString() {
				var params = this.params.length > 0 ? "'" + this.params.join("', '") + "'" : "";
				return this.name + "(" + params + ")";
			}
		};
		if(this.arguments) {
			for(var x=0; x<this.arguments.length; x++)
				signature.params.push(this.arguments[x] as never);
		}
		return signature;
	};

	Function.prototype.getName = function() {
		if(this.name) {
			return this.name;
		}
		var definition = this.toString().split("n")[0];
		var exp = /^function ([^s(]+).+/;
		if(exp.test(definition)) {
			return definition.split("n")[0].replace(exp, "$1") || "anonymous";
		}
		return "anonymous";
	};

	// var oldSetTimeout = global.setTimeout;
	// global.setTimeout = function () {
	// 	const debug=false;
	// 	const retval = oldSetTimeout.apply(this, arguments);
	// 	if (debug) {
	// 		const t = arguments['callee']['trace']();
	// 		consoleinfo((arguments[2]||""), "["+(t&&t[0]&&t[0].name)+"]",
	// 				"setTimeout", retval, "registered for", arguments[1]+"ms",
	// 				"stacktrace:", t,
	// 				"arguments:", arguments,
	// 		);
	// 	}
	// 	return retval;
	// };

	// var oldSetInterval = global.setInterval;
	// global.setInterval = function () {
	// 	const debug=false;
	// 	const retval = oldSetInterval.apply(this, arguments);
	// 	if (debug) {
	// 		const t = arguments['callee']['trace']();
	// 		consoleinfo((arguments[2]||""), "["+(t&&t[0]&&t[0].name)+"]",
	// 				"setInterval", retval, "registered for every", arguments[1]+"ms",
	// 				"stacktrace:", t,
	// 				"arguments:", arguments,
	// 		);
	// 		// var e = new Error('Get stack trace');
	// 		// consolelog('New interval registered from %s', e.stack);
	// 	}
	// 	return retval;
	// };

	// var oldSetInterval = global.setInterval;
	// global.setInterval = function () {
	// 	// var e = new Error('Just for stack trace');
	// 	// console.log('New interval registered from %s', e.stack);
	// 	const retval = oldSetInterval.apply(this, arguments);
	// 	consoledebug(arguments[2]||"[No Reference]", "setInterval registered for every", arguments[1]+"ms", "interval id:"+retval,
	// 			// arguments[0]||'',
	// 			arguments.callee && arguments.callee.caller && arguments.callee.caller.toString(),
	// 			arguments,
	// 	);
	// 	return retval;
	// }

	// Setup storing console message data for error reporting
	window['consoleHistory']=[];

	// check localStorage for the debugmode setting
	const lsKey = window.localStorage?.getItem('RetisController:'+(window.location.port));
	if (lsKey) {
		const ls=JSON.parse(lsKey);
		if (typeof ls.debugmode!=="undefined") {
			debugmode=ls.debugmode;
		}
	}

	// Initialise the global console log routines - changed when angular boots up
	cons = window.console || {};
	while (l--) {
		method = methods[l];

		// Only stub undefined methods.
		if (!cons[method]) {
			cons[method] = noop;
		}
	}
	if (debugmode) {
		console.log(logPrefix, "Enabling custom logging function consolelog");
		window['consolelog'] = Function.prototype.bind.call(console.log, cons);
		window['consoledebug'] = Function.prototype.bind.call(console.warn, cons);
		window['consoleinfo'] = Function.prototype.bind.call(console.info, cons);
	
	} else {
		console.debug(logPrefix, "Disabling custom logging functions");
		window['consolelog']=noop;
		window['consoledebug']=noop;
		window['consoleinfo'] =noop;
	}
	window['consolewarn'] = Function.prototype.bind.call(console.warn, cons);
	window['consoleerror'] = Function.prototype.bind.call(console.error, cons);

	// console.log(logPrefix, "Test consolelog()", debugmode)
	// consolelog(logPrefix, "-------------- Showing consolelog()");
	// console.debug(logPrefix, "Test consoledebug()", debugmode)
	// consoledebug(logPrefix, "-------------- Showing consoledebug()");
	// console.info(logPrefix, "Test consoleinfo()", debugmode)
	// consoleinfo(logPrefix, "-------------- Showing consoleinfo()");
	// console.warn(logPrefix, "Test consolewarn()", debugmode)
	// consolewarn(logPrefix, "-------------- Showing consolewarn()");
	// console.error(logPrefix, "Test consoleerror()", debugmode)
	// consoleerror(logPrefix, "-------------- Showing consoleerror()");

	consoleHistory.push()

	// Attempt to load extra polyfills for IE11 support
	// const evergreenBrowserInfo = checkBrowser({
	// 	chrome: 49,
	// 	firefox: 52,
	// 	edge: 14,
	// 	safari: 10,
	// });
	// if (!evergreenBrowserInfo) {
	// 	// consolelog("Turning off animations as not evergreen browser");
	// 	evergreenBrowser=false;
	// } else {
	// 	consolelog("Evergreen browser - animations are available");
	// 	evergreenBrowser=true;
	// }

	// window['getEvergreenBrowserState'] = () => {
	// 	// consolelog("Return evergreen browser state:", evergreenBrowser);
	// 	return evergreenBrowser;
	// }
}

//--------------------------------------------------------------------------------------------------------------
if (Meteor.isServer) {
	logPrefix+="[Server]";
	console.info(logPrefix, "----------------------------------------------------");
	console.info(logPrefix, "- RESTARTING Server");
	console.info(logPrefix, "----------------------------------------------------");
	console.log(logPrefix, "Processing javascript_globals.js...Server...Debugmode:", debugmode);

	serverGlobals={		// These will be reloaded from serverStats collection on startup
		disableJobQueue: false,					// Turns off calls to the PHP when it it true
		disablePostgresQuerying: false,			// Turns off calls to the PHP when it it true

		disableSyncOutboxUser: false,			// Turns off user syncing with paradox when this setting is true
		debugSyncOutboxUser: false,				// Turns on extended debugging when generating the export for the user sync process

		debugUserActivationStatus: false,		// Turns on extended debugging when processing a users activation status
		serverInfos: {},
		serverInfo: {
			id: 			'',
			unique:			new Mongo.ObjectID().toHexString(),
			hostname:		'',
			containerId: 	'',
			version:		'',
			started: 		new Date(),
			lastPing: 		new Date(),
			ROOT_URL:		'',
			MAIL_URL:		'',
			jobQueueServer:	false,
			loadAverage:	undefined,
		},
	};

	cons = console || {} as Console;
	while (l--) {
		method = methods[l];

		// Only stub undefined methods.
		if (!cons[method]) {
			cons[method] = noop;
		}
	}

	consoledebug=Function.prototype.bind.call(console.log, cons);
	consolelog=Function.prototype.bind.call(console.log, cons);
	consoleinfo =Function.prototype.bind.call(console.info, cons);
	consolewarn = Function.prototype.bind.call(console.log, cons);
	consoleerror = Function.prototype.bind.call(console.error, cons);
}

//consolelog("Processing javascript_globals.js...Done");
