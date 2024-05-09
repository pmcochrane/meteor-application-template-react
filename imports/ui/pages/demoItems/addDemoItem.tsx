import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { DemoItems } from '../../../api/DemoItemsCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
	name: String,
	quantity: Number,
	condition: {
		type: String,
		allowedValues: ['excellent', 'good', 'fair', 'poor'],
		defaultValue: 'good',
	},
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddDemoItem page for adding a document. */
const AddDemoItem = () => {
	const navigate = useNavigate();
	
	// On submit, insert the data.
	const submit = (data: any, formRef: any) => {
		const { name, quantity, condition } = data;
		const owner = (Meteor.user()?.username) || 'Unknown User';
		DemoItems.collection.insert(
			{ name, quantity, condition, owner },
			(error: any) => {
				if (error) {
					Swal.fire({title: 'Error', html: error.message, icon: 'error', customClass: 'text-bg-danger', toast: true, position: 'top-end', timer: 5000, showConfirmButton: false, showCloseButton: true});
				} else {
					Swal.fire({html: quantity+" of "+name+' added.', icon: 'success', customClass: 'text-bg-success', toast: true, position: 'top-end', timer: 5000, showConfirmButton: false, showCloseButton: true });
					formRef.reset();
					navigate("/demoItems/list");
				}
			},
		);
	};

	// Render the form. Use Uniforms: https://github.com/vazco/uniforms
	let fRef: any = null;
	return (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col xs={5}>
					<Col className="text-center"><h2>Add DemoItem</h2></Col>
					<AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
						<Card>
							<Card.Body>
								<TextField name="name" />
								<NumField name="quantity" decimal={false} />
								<SelectField name="condition" />
								<SubmitField value="Submit" />
								<ErrorsField />
							</Card.Body>
						</Card>
					</AutoForm>
				</Col>
			</Row>
		</Container>
	);
};

export default AddDemoItem;
