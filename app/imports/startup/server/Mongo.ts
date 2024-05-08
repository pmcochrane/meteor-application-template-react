import { Meteor } from 'meteor/meteor';
import { DemoItems } from '../../api/DemoItemsCollection';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data: any) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  DemoItems.collection.insert(data);
};

// Initialize the demoItemsCollection if empty.
if (DemoItems.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach( (data: any) => addData(data));
  }
}
