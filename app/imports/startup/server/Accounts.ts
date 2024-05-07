import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
// import { Roles } from '@types/meteor-roles';

/* eslint-disable no-console */
const createUser = (email: string, password: string, role: string) => {
	console.log(`  Creating user ${email}.`);
	const userID = Accounts.createUser({
		username: email,
		email: email,
		password: password,
	});
	if (role === 'admin') {
		// Roles.createRole(role, { unlessExists: true });
		Roles.createRole(role);
		Roles.addUsersToRoles(userID, 'admin');
	}
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
	if (Meteor.settings.defaultAccounts) {
		console.log('Creating the default user(s)');
		Meteor.settings.defaultAccounts.forEach((x: any) => createUser(x.email, x.password, x.role));
	} else {
		console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
	}
}

