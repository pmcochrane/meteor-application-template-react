import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { logInfo }									from './init';

export interface IColUser {
	_id: string;
	username: string;
	fullName: string;
	mobileNumber: string;
	emails: [{
		address: string;
		verified: boolean;
	}];
	createdAt: Date;
	services: any;
	allowedToLogin: boolean;
}

// Generate extra user info when account is attempting to be created
Accounts.onCreateUser( (obj: any, user: Meteor.User) => {
	const inf = logInfo("Accounts.onCreateUser", "");
	consolelog(inf.pre, `Initialising  new user ${obj.profile.fullName}...`);
	const u = user as IColUser;

	// populate the other fields for the user
	u.allowedToLogin = obj.profile.allowedToLogin;
	u.fullName = (obj.profile.fullName).trim();
	u.mobileNumber = (obj.profile.mobileNumber).trim();

	// Add an admin role if required
	if (obj.profile.role && obj.profile.role === 'admin') {
		Roles.createRole(obj.profile.role);
		Roles.addUsersToRoles(u._id, 'admin');
	}

	// consolelog(inf.pre, "user ID = ", user._id);
	// consolelog(inf.pre, " sites " , obj.profile.site);
	// consolelog(inf.pre, " Site size ", obj.profile.site.length);

	// Don't forget to return the new user object at the end!
	return u;
});


// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((newUser: IColUser) => {
	const inf = logInfo('Accounts.validateNewUser', "", this!['userId'], this!['connection']);
	consolelog(inf.pre, `Validating new user ${newUser.fullName} against schema...`);
	new SimpleSchema({
		_id: 					{ type: String },
		username: 				{ type: String },
		fullName:				{ type: String },
		mobileNumber:			{ type: String },
		emails: 				{ type: Array },
		'emails.$': 			{ type: Object },
		'emails.$.address': 	{ type: String },
		'emails.$.verified': 	{ type: Boolean },
		createdAt: 				{ type: Date },
		allowedToLogin:			{ type: Boolean },
		services: 				{ type: Object, blackbox: true }
	}).validate(newUser);

	consoledebug(inf.pre, `Validated  new user ${newUser.fullName} [SUCCESS]`);
	// Return true to allow user creation to proceed
	return true;
});

/* eslint-disable no-console */
const createUser = (userToCreate: any) => {
	const inf = logInfo('createUser', "", this!['userId'], this!['connection']);
	consolelog(inf.pre, `Creating user ${userToCreate.email}...`);
	try {
		Accounts.createUser({
			username: userToCreate.email,
			email: userToCreate.email,
			password: userToCreate.password,
			profile: {
				fullName:		userToCreate.fullName,
				mobileNumber:	userToCreate.mobileNumber,
				allowedToLogin:	true,
				role: 			userToCreate.role,	
			},
		});
	} catch (error: any) {
		consoleerror("[createUser] failed to create the new user:", error.message);
	}
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
	if (Meteor.settings.defaultAccounts) {
		Meteor.settings.defaultAccounts.forEach((userToCreate: any) => createUser(userToCreate));
	} else {
		consoleerror('Cannot initialize the database!  Please invoke meteor with a settings file.');
	}
}

