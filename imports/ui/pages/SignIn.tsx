import React, { useState, useEffect } 								from 'react';
import { Link, Navigate } 											from 'react-router-dom';
import { Alert, Card, Col, Container, Row } 						from 'react-bootstrap';
import { BoxArrowInRight, CheckCircleFill } 						from 'react-bootstrap-icons';
import { motion, usePresence }										from 'framer-motion';
import SimpleSchema2Bridge 											from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField }							from 'uniforms-bootstrap5';

import { Meteor } 													from 'meteor/meteor';
import SimpleSchema 												from 'simpl-schema';

import { animationVariants } 										from '../components/AnimatedRoutes';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
	// This is a hack to ensure that component is removed from DOM if animation does not exit properly
	const [isPresent, safeToRemove] = usePresence();
	useEffect(() => { !isPresent && setTimeout(safeToRemove, 800); }, [isPresent]);

	const [error, setError] = useState('');
	const [redirect, setRedirect] = useState(false);
	const schema = new SimpleSchema({
		email: String,
		password: String,
	});
	const bridge = new SimpleSchema2Bridge(schema);

	// Handle Signin submission using Meteor's account mechanism.
	const submit = (doc: any) => {
		// consolelog('submit', doc, redirect);
		// const { email, password } = doc;
		Meteor.loginWithPassword(doc.email, doc.password, (err) => {
			if (err) {
				consoleerror(err);
				setError(err.message); // was err.reason before typscript
			} else {
				setRedirect(true);
			}
		});
		// consolelog('submit2', email, password, error, redirect);
	};

	// Render the signin form.
	// consolelog('render', error, redirect);
	// if correct authentication, redirect to page instead of login screen
	if (redirect) {
		return (<Navigate to="/" />);
	}
	// Otherwise return the Login form.
	return (
		<motion.div variants={animationVariants} initial="pageEnter" animate="pageAnimate" exit="pageLeave" layout>
			<Container id="signin-page" className="py-3">
				<Row className="justify-content-center">
					<Col>
						<AutoForm schema={bridge} onSubmit={data => submit(data)}>
							<Card>
								<Card.Header className="bg-primary-subtle text-primary">
									<strong>Sign in to your account</strong>
								</Card.Header>
								<Card.Body>
									<TextField id="signin-form-email" name="email" placeholder="E-mail address" autoComplete="username"/>
									<TextField id="signin-form-password" name="password" placeholder="Password" type="password" autoComplete="current-password"/>
									<ErrorsField />
								</Card.Body>
								<Card.Footer className="bg-primary-subtle text-primary">
									<Row className="align-items-center">
										<Col>
											<button type="submit" className="btn btn-primary d-flex align-items-center"><CheckCircleFill/>&nbsp;Sign In</button>
										</Col>
										<Col className="col-auto">
											<Link to="/signup" className="btn btn-success d-flex align-items-center"><BoxArrowInRight/>&nbsp;Switch to Register New User Page</Link>
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
		</motion.div>
	);
};

export default SignIn;
