import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../../api/stuff/Stuff';

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

/* Renders the AddStuff page for adding a document. */
const AddStuff = () => {
	const navigate = useNavigate();
	
	// On submit, insert the data.
	const submit = (data: any, formRef: any) => {
		const { name, quantity, condition } = data;
		const owner = (Meteor.user()?.username) || 'Unknown User';
		Stuffs.collection.insert(
			{ name, quantity, condition, owner },
			(error: any) => {
				if (error) {
					swal('Error', error.message, 'error');
				} else {
					swal('Success', 'Item added successfully', 'success');
					formRef.reset();
					navigate("/stuff/list");
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
					<Col className="text-center"><h2>Add Stuff</h2></Col>
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

export default AddStuff;
