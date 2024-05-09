import React, { useState } 											from 'react';
import PropTypes 													from 'prop-types';
import { Link, Navigate } 											from 'react-router-dom';
import { Alert, Card, Col, Container, Row } 						from 'react-bootstrap';
import { BoxArrowInRight, PlusCircleFill } 							from 'react-bootstrap-icons';
import { motion } 													from 'framer-motion';
import SimpleSchema2Bridge 											from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField }							from 'uniforms-bootstrap5';

import { Accounts } 												from 'meteor/accounts-base';
import SimpleSchema 												from 'simpl-schema';

import { pageTransition } 											from '../components/AnimatedRoutes';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }: any) => {
	const [error, setError] = useState('');
	const [redirectToReferer, setRedirectToRef] = useState(false);

	const schema = new SimpleSchema({
		email: String,
		password: String,
		fullname: String,
		mobilenumber: Number,
	});
	const bridge = new SimpleSchema2Bridge(schema);

	/* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
	const submit = (doc: any) => {
		const { email, password } = doc;
		Accounts.createUser({ email, username: email, password }, (err) => {
			if (err) {
				setError(err.message);
			} else {
				setError('');
				setRedirectToRef(true);
			}
		});
	};

	/* Display the signup form. Redirect to add page after successful registration and login. */
	const { from } = location?.state || { from: { pathname: '/add' } };
	// if correct authentication, redirect to from: page instead of signup screen
	if (redirectToReferer) {
		return <Navigate to={from} />;
	}
	return (
		<motion.div initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
			<Container id="signup-page" className="py-3">
				<Row className="justify-content-center">
					<Col>
						<AutoForm schema={bridge} onSubmit={data => submit(data)}>
							<Card>
								<Card.Header className="bg-success-subtle text-success">
									<strong>Register New Account</strong>
								</Card.Header>
								
								<Card.Body>
									<TextField name="email" label="E-mail address" placeholder="Enter the E-mail address to register as" />
									<TextField name="password" label="Desired Password" placeholder="Enter desired password for account" type="password" />
									<TextField name="fullname" label="Full Name" placeholder="Enter your Full Name" />
									<TextField name="mobilenumber" label="Mobile Number"  placeholder="Enter your Mobile Number to contact you" />
									<ErrorsField />
								</Card.Body>
								<Card.Footer className="bg-success-subtle text-success">
									<Row className="align-items-center">
										<Col>
											<button type="submit" className="btn btn-success d-flex align-items-center"><PlusCircleFill/>&nbsp;Register New User</button>
										</Col>
										<Col className="col-auto">
											<Link to="/signin" className="btn btn-primary d-flex align-items-center"><BoxArrowInRight/>&nbsp;Switch to Sign in as an Existing User</Link>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
						</AutoForm>
						{error === '' ? (
							''
						) : (
							<Alert variant="danger">
								<Alert.Heading>Registration was not successful.</Alert.Heading>
								{error}
							</Alert>
						)}
					</Col>
				</Row>
			</Container>
		</motion.div>
	);
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.string,
	}),
};

SignUp.defaultProps = {
	location: { state: '' },
};

export default SignUp;
