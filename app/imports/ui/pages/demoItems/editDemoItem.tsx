import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { DemoItems } from '../../../api/DemoItemsCollection';
import LoadingSpinner from '../../components/LoadingSpinner';
// import { SwalOptions } from 'sweetalert/typings/modules/options';

const bridge = new SimpleSchema2Bridge(DemoItems.schema);

/* Renders the EditDemoItem page for editing a single document. */
const EditDemoItem = () => {
	// Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
	const { _id } = useParams();
	// console.log('EditDemoItem', _id);
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { doc, subscriptionReady } = useTracker(() => {
		const subscription = Meteor.subscribe(DemoItems.userPublicationName);	// Get access to collection documents.
		const subscriptionReady = subscription.ready();							// Determine if the subscription is ready
		const document = DemoItems.collection.findOne(_id);						// Get the document
		return {
			doc: document,
			subscriptionReady,
		};
	}, [_id]);
	// console.log('EditDemoItem', doc, subscriptionReady);
	const navigate = useNavigate();
	// On successful submit, insert the data.
	const submit = (data: any) => {
		const { name, quantity, condition } = data;
		DemoItems.collection.update(_id!, 
			{ $set: { name, quantity, condition } },
			undefined,
			(error: any) => {
				if (error) {
					swal('Error', error.message, 'error');
				} else {
					swal('Success', 'Item updated successfully', 'success');
					navigate("/demoItems/list");
				}
			});
	};

	return subscriptionReady ? (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col xs={5}>
					<Col className="text-center"><h2>Edit DemoItem</h2></Col>
					<AutoForm schema={bridge} onSubmit={ (data) => submit(data)} model={doc}>
						<Card>
							<Card.Body>
								<TextField name="name" />
								<NumField name="quantity" decimal={false} />
								<SelectField name="condition" />
								<SubmitField value="Submit" />
								<ErrorsField />
								<HiddenField name="owner" />
							</Card.Body>
						</Card>
					</AutoForm>
				</Col>
			</Row>
		</Container>
	) : <LoadingSpinner />;
};

export default EditDemoItem;
