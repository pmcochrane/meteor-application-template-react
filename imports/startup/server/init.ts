import { Meteor } from 'meteor/meteor';

// Initialise the qlookup array for logging server side
// This will be populated when users connect to the server
const qlookupUser = <any>[];

export interface LogInfoData {
	pre: string;
	post: string;
	methodName: string;
	userId?: string;
	userFullName?: string;
	ipAddress?: string;
}

// Generate log prefix and postfix elements for consistent server side logging
function logInfo(methodName: string, logTxt:string, userId?: string, connection?: any) {
	let ipAddress = connection ? (   (connection.httpHeaders&&connection.httpHeaders['x-real-ip'])
									|| (connection.httpHeaders&&connection.httpHeaders['x-forwarded-for'])
									|| connection.clientAddress
									|| 'NoIP') : "NoIP";
	ipAddress = ipAddress.replace(/^::ffff:/, "").replace(/,(.*)$/, '');
	const userDetails = "["+
			((userId && qlookupUser[userId] && qlookupUser[userId].fullName) ? qlookupUser[userId].fullName : (userId ||'NotLoggedIn'))+
			"@"+ipAddress+
			// (connection ? "@"+( (connection.httpHeaders&&connection.httpHeaders['x-forwarded-for']) || connection.clientAddress || 'NoIP') : "@NoIP")+
			"]";
	const info: LogInfoData = {
		pre: "",
		post: "",
		methodName: methodName||'',
		userId: userId,
		userFullName: (userId && qlookupUser[userId] && qlookupUser[userId].fullName) ? qlookupUser[userId].fullName : (userId ||'NotLoggedIn'),
		ipAddress,
	};
	if (!logTxt || logTxt==='') {
		info.pre = (Meteor.isServer && serverGlobals && serverGlobals.serverInfo && serverGlobals.serverInfo.id ? "["+serverGlobals.serverInfo.id+"]" : "")+userDetails+" ("+methodName+")";
	} else {
		info.pre = (Meteor.isServer && serverGlobals && serverGlobals.serverInfo && serverGlobals.serverInfo.id ? "["+serverGlobals.serverInfo.id+"]" : "")+userDetails+" "+
		logTxt+" ("+methodName+")";
	}
	//consolelog(info);
	return info;
}

export {
	logInfo,
	qlookupUser,
};