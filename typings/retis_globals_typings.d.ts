// These are custom typings for ReTIS

interface Function {
	trace(): void;
	signature(): void;
	getName(): void;
}
interface window {
	getPagedJsBrowserState: boolean;
}

declare var consoledebug: Function;
declare var consoleinfo: Function;
declare var consolewarn: Function;
declare var consolelog: Function;
declare var consoleerror: Function;
declare var consoleHistory: any[];
// consoledebug("Processing retis_globals typings...") ;

// declare var Chart;

// declare var getAngularAnimationState;
declare var meteorStartedAt: Date;
declare var getEvergreenBrowserState: Function;

// declare var appServiceWorkerNotificationsAllowed;
// declare var appServiceWorkerRegistration;

declare var serverGlobals: any; // Server side global configuration variable
// declare var globalsTest; 	// Global var for testing parameters

// declare var SSR;		// This is for package meteorhacks:SSR
// declare var UserStatus; // This is for package mizzao:meteor-user-status
// declare var Soap;

// declare var module;		// Lazy Loading - reactive component loader

/* tslint:disable */

// Adds Accounts.onlogout
// declare module Accounts {
// 	function _checkPassword(user: object, password: object): any;
// 	function onLogout(func: Function): void;
// };
// declare module "meteor/accounts-base" {
// 	namespace Accounts {
// 		function onLogout(func: Function): void;
// 	}
// }
// declare module Accounts {
// 	function onLogout(func: (user: Meteor.User, connection: Meteor.Connection) => void): void;
// };
// declare module "meteor/accounts-base" {
// 	module Accounts {
// 		function onLogout(func: (user: Meteor.User, connection: Meteor.Connection) => void): void;
// 	}
// };

// For Deanius:promise
declare module Meteor {
	function callPromise(name: string, ...args: any[]): any;	// PMC
}
declare module "meteor/meteor" {
	namespace Meteor {
		function callPromise(name: string, ...args: any[]): any;	// PMC
	}
}


// https://github.com/meteor-typings/meteor-promise/blob/master/main.d.ts
// declare module 'meteor/promise' {
// 	module Promise {
// 		function await(arg: T): T;
// 	}
// }

// declare module "meteor/percolate:synced-cron" {
// 	module SyncedCron {
// 		function config({
// 			log: Boolean,
// 			logger: any,
// 			collectionName: string,
// 			utc: boolean,
// 			collectionTTL:  number,
// 		}): any;
// 		function start(): any;
// 		function pause(): any;
// 		function stop(): any;
// 		function  add({
// 			name: string,
// 			schedule: any,
// 			job: any,
// 		}): any;
// 		function nextScheduledAtDate( jobname: string): any;
// 		function remove( jobname: string ): any;
// 	}
// }


// PMC adding npmRequestOptions to the interface
declare module "meteor/http" {
    module HTTP {
        interface HTTPRequest {
            content?: string;
            data?: any;
            query?: string;
            params?: {
                [id: string]: string
            };
            auth?: string;
            headers?: {
                [id: string]: string
            };
            timeout?: number;
            followRedirects?: boolean;
			// Added by PMC 06/07/2018
			npmRequestOptions?: any;
        }
    }
}



// PMC copied from https://github.com/jmoseley/strava-challenge
// declare module 'meteor/msavin:sjobs' {
// 	export interface JobsInternalSingleton {
// 		Utilities: {
// 			collection: Mongo.Collection<JobModel>;
// 		};
// 	}

// 	export interface JobModel {
// 		_id: string;
// 		name: string;
// 		state: JobModel.State;
// 	}

// 	export namespace JobModel {
// 		export enum State {
// 			SUCCESS = 'success',
// 			PENDING = 'pending',
// 		}
// 	}

// 	export interface JobInstance {
// 		success: (result?: any) => void;
// 		failure: (result?: any) => void;
// 		reschedule: (config: RunConfig) => void;
// 		replicate: (config: RunConfig) => void;
// 	}

// 	export interface Config {
// 		autoStart?: Boolean;					// true         - specify if the package should start automatically on Meteor.startup
// 		autoRetry?: Boolean;					// true         - specify if the package should retry failed jobs whenever a new server takes control
// 		autoPurge?: Boolean;					// true         - specify if the package should automatically delete internal data (not job related)
// 		interval?: Number;					// 3000         - specify how often the package should check for due jobs
// 		startupDelay?: Number;				// 1000         - specify how long after server startup the package should start running
// 		maxWait?: Number;					// 5min.        - specify how long the server could be inactive before another server takes on the master role 	disableDevelopmentMode: Boolean,	// development mode assumes that only one server is running, and that it is the active one
// 		setServerId?: Function;				// Random.id () - determine how to set the serverId - for example, you can have the package use your hosts deployment id
// 		getDate?: Function;					// new Date()   - determine how to get the current date, if for whatever reason, new Date() is not suitable
// 		log?: Function;						// console.log  - determine how to log the package outputs
// 		remoteCollection?: String;			// undefined    - store jobs data in a remote collection
// 	}

// 	export type RunArguments = {
// 		[key: string]: any;
// 	} | null;

// 	export interface JobsList {
// 		[jobId: string]: (args: RunArguments) => void;
// 	}

// 	export interface RunConfig {
// 		in?: {
// 			millisecond?: number;
// 			milliseconds?: number;
// 			second?: number;
// 			seconds?: number;
// 			minute?: number;
// 			minutes?: number;
// 			hour?: number;
// 			hours?: number;
// 			day?: number;
// 			days?: number;
// 			month?: number;
// 			months?: number;
// 			year?: number;
// 			years?: number;
// 		};
// 		on?: {
// 			millisecond?: number;
// 			milliseconds?: number;
// 			second?: number;
// 			seconds?: number;
// 			minute?: number;
// 			minutes?: number;
// 			hour?: number;
// 			hours?: number;
// 			day?: number;
// 			days?: number;
// 			month?: number;
// 			months?: number;
// 			year?: number;
// 			years?: number;
// 		};
// 		priority?: number;
// 		singular?: boolean;
// 	}

// 	export interface JobsSingleton {
// 		configure: (config: Config) => void;
// 		register: (jobs: JobsList) => void;
// 		// This is not a perfect reflection of the allowed arguments, but it simplifies the interface an allows
// 		// the config to be well typed.
// 		run: (jobId: string, args: RunArguments, config: RunConfig) => void;
// 		stop: (queueName?: string) => void;
// 		start: (queueName?: string) => void;
// 		collection: Mongo.Collection;
// 	}

// 	export const Jobs: JobsSingleton;

// 	export const JobsInternal: JobsInternalSingleton;
// }


// Extend meteor/email to include priority
declare module "meteor/email" {
    module Email {
        function send(options: {
            from?: string;
            to?: string | string[];
            cc?: string | string[];
            bcc?: string | string[];
            replyTo?: string | string[];
            subject?: string;
            text?: string;
            html?: string;
            headers?: Object;
            attachments?: Object[];
			mailComposer?: MailComposer;
			priority?: string;
        }): void;
    }
}
declare module Email {
    function send(options: {
        from?: string;
        to?: string | string[];
        cc?: string | string[];
        bcc?: string | string[];
        replyTo?: string | string[];
        subject?: string;
        text?: string;
        html?: string;
        headers?: Object;
        attachments?: Object[];
        mailComposer?: MailComposer;
		priority?: string;
    }): void;
}

// Define the clipboardItem https://stackoverflow.com/questions/61187374/how-to-fix-the-cannot-find-name-clipboarditem-error?noredirect=1&lq=1
// interface ClipboardItem {
// 	readonly types: string[];
// 	readonly presentationStyle: "unspecified" | "inline" | "attachment";
// 	getType(): Promise<Blob>;
// }

// interface ClipboardItemData {
// 	[mimeType: string]: Blob | string | Promise<Blob | string>;
// }

// declare var ClipboardItem: {
// 	prototype: ClipboardItem;
// 	new (itemData: ClipboardItemData): ClipboardItem;
// };