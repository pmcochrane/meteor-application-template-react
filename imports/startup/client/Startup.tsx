import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App';
import '/imports/startup/both/javascript_globals';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
	const logPrefix="[Startup.tsx]";
	consoledebug(logPrefix, "Started");
	const root = ReactDOM.createRoot(document.getElementById('root')!);
	root.render(<App />);
});
