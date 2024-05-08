import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Define the typescript interface for this collection
export interface IDemoItems {
	_id: string;
	name: string;
	quantity: number;
	owner: string;
	condition: string;
}

class DemoItemsCollection {
	name: string;
	collection: Mongo.Collection<IDemoItems>;
	schema;
	userPublicationName: string;
	adminPublicationName: string;

	constructor() {
		this.name = 'demoItems';							// The name of this collection.
		this.collection = new Mongo.Collection(this.name);	// Define the Mongo collection.
		this.schema = new SimpleSchema({					// Define the structure of each document in the collection.
			_id: String,
			name: String,
			quantity: Number,
			owner: String,
			condition: {
				type: String,
				allowedValues: ['excellent', 'good', 'fair', 'poor'],
				defaultValue: 'good',
			},
		});
		(<any>this.collection).attachSchema(this.schema);			// Attach the schema to the collection, so all attempts to insert a document are checked against schema.
		// Define names for publications and subscriptions
		this.userPublicationName = `${this.name}.publication.user`;
		this.adminPublicationName = `${this.name}.publication.admin`;
	}
}

/**
 * The singleton instance of the DemoItemsCollection.
 * @type {DemoItemsCollection}
 */
export const DemoItems: DemoItemsCollection = new DemoItemsCollection();
