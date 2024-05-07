import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Stuffs } from '../../../api/stuff/Stuff';
import LoadingSpinner from '../../components/LoadingSpinner';
// import { SwalOptions } from 'sweetalert/typings/modules/options';

const bridge = new SimpleSchema2Bridge(Stuffs.schema);

/* Renders the EditStuff page for editing a single document. */
const EditStuff = () => {
	// Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
	const { _id } = useParams();
	// console.log('EditStuff', _id);
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { doc, ready } = useTracker(() => {
		// Get access to Stuff documents.
		const subscription = Meteor.subscribe(Stuffs.userPublicationName);
		// Determine if the subscription is ready
		const rdy = subscription.ready();
		// Get the document
		const document = Stuffs.collection.findOne(_id);
		return {
			doc: document,
			ready: rdy,
		};
	}, [_id]);
	// console.log('EditStuff', doc, ready);
	const navigate = useNavigate();
	// On successful submit, insert the data.
	const submit = (data: any) => {
		const { name, quantity, condition } = data;
		Stuffs.collection.update(_id!, 
			{ $set: { name, quantity, condition } },
			undefined,
			(error: any) => {
				if (error) {
					swal('Error', error.message, 'error');
				} else {
					swal('Success', 'Item updated successfully', 'success');
					navigate("/stuff/list");
				}
			});
	};

	return ready ? (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col xs={5}>
					<Col className="text-center"><h2>Edit Stuff</h2></Col>
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

export default EditStuff;
