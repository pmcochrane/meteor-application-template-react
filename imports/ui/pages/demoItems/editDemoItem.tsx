import React 														from 'react';
import { useParams } 												from 'react-router';
import { useNavigate } 												from 'react-router-dom';
import { Card, Col, Container, Row } 								from 'react-bootstrap';
import { motion }													from 'framer-motion';

import Swal 														from 'sweetalert2';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } 
																	from 'uniforms-bootstrap5';

import { Meteor } 													from 'meteor/meteor';
import { useTracker } 												from 'meteor/react-meteor-data';
import SimpleSchema2Bridge 											from 'uniforms-bridge-simple-schema-2';

import { DemoItems } 												from '../../../api/DemoItemsCollection';
import { pageTransition } 											from '../../components/AnimatedRoutes';
import LoadingSpinner 												from '../../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(DemoItems.schema);

/* Renders the EditDemoItem page for editing a single document. */
const EditDemoItem = () => {
	// Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
	const { _id } = useParams();
	// consolelog('EditDemoItem', _id);
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
	// consolelog('EditDemoItem', doc, subscriptionReady);
	const navigate = useNavigate();
	// On successful submit, insert the data.
	const submit = (data: any) => {
		const { name, quantity, condition } = data;
		DemoItems.collection.update(_id!, 
			{ $set: { name, quantity, condition } },
			undefined,
			(error: any) => {
				if (error) {
					Swal.fire({title: 'Error', html: error.message, icon: 'error', customClass: 'text-bg-danger', toast: true, position: 'top-end', timer: 5000, showConfirmButton: false, showCloseButton: true});
				} else {
					Swal.fire({html: quantity+" of "+name+' updated.', icon: 'success', customClass: 'text-bg-success', toast: true, position: 'top-end', timer: 5000, showConfirmButton: false, showCloseButton: true });
					navigate("/demoItems/list");
				}
			});
	};

	return (
		<motion.div initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
		{ subscriptionReady ? (
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
		) : (
			<LoadingSpinner />
		)}
		</motion.div>
	);
};

export default EditDemoItem;
