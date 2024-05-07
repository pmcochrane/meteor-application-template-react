import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
	const [error, setError] = useState('');
	const [redirect, setRedirect] = useState(false);
	const schema = new SimpleSchema({
		email: String,
		password: String,
	});
	const bridge = new SimpleSchema2Bridge(schema);

	// Handle Signin submission using Meteor's account mechanism.
	const submit = (doc: any) => {
		// console.log('submit', doc, redirect);
		// const { email, password } = doc;
		Meteor.loginWithPassword(doc.email, doc.password, (err) => {
			if (err) {
				console.error(err);
				setError(err.message); // was err.reason before typscript
			} else {
				setRedirect(true);
			}
		});
		// console.log('submit2', email, password, error, redirect);
	};

	// Render the signin form.
	// console.log('render', error, redirect);
	// if correct authentication, redirect to page instead of login screen
	if (redirect) {
		return (<Navigate to="/" />);
	}
	// Otherwise return the Login form.
	return (
		<Container id="signin-page" className="py-3">
			<Row className="justify-content-center">
				<Col xs={5}>
					<AutoForm schema={bridge} onSubmit={data => submit(data)}>
						<Card>
							<Card.Header className="bg-primary text-white">
								<strong>Sign in to your account</strong>
							</Card.Header>
							<Card.Body>
								<TextField id="signin-form-email" name="email" placeholder="E-mail address" />
								<TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
								<ErrorsField />
							</Card.Body>
							<Card.Footer>
								<Row className="align-items-center">
									<Col>
										<Link to="/signup">Click here to Register New User</Link>
									</Col>
									<Col className="col-auto">
										<SubmitField id="signin-form-submit" />
									</Col>
								</Row>
							</Card.Footer>
						</Card>
					</AutoForm>
					{error === '' ? (
						''
					) : (
						<Alert variant="danger" className="mt-1">
							<Alert.Heading>Login was not successful</Alert.Heading>
							{error}
						</Alert>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default SignIn;
