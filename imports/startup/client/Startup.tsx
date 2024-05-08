import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App />);
});
