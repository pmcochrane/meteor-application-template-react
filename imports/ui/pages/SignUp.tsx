import React, { useState, useEffect } 								from 'react';
import PropTypes 													from 'prop-types';
import { Link, Navigate } 											from 'react-router-dom';
import { Alert, Card, Col, Container, Row } 						from 'react-bootstrap';
import { BoxArrowInRight, PlusCircleFill } 							from 'react-bootstrap-icons';
import { motion, usePresence }										from 'framer-motion';
import SimpleSchema2Bridge 											from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField }							from 'uniforms-bootstrap5';

import { Accounts } 												from 'meteor/accounts-base';
import SimpleSchema 												from 'simpl-schema';

import { animationVariants } 										from '../components/AnimatedRoutes';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }: any) => {
	// This is a hack to ensure that component is removed from DOM if animation does not exit properly
	const [isPresent, safeToRemove] = usePresence();
	useEffect(() => { !isPresent && setTimeout(safeToRemove, 800); }, [isPresent]);

	const [error, setError] = useState('');
	const [redirectToReferer, setRedirectToRef] = useState(false);

	// const schema = new SimpleSchema({
	// 	email:			{ type: 'String' },
	// 	password:		{ type: 'String', uniforms: { type: 'password' } },
	// 	confirmEmail:	{ type: 'String', const: { $data: '1/password' } },
	// 	fullname:		{ type: 'String' },
	// 	mobilenumber:	{ type: 'Number' },
	// });
	const schema = new SimpleSchema({
		email: 				{ type: String, regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, label: 'Email' },
		password: 			{ type: String, min: 8,  label: 'Password' },
		confirmpassword:	{ type: String, min: 8, label: 'Confirm Password',
		  						custom() {
									if (this.value !== this.field('password').value) {
			  							return 'passwordMismatch';
									}
		  						},
							},
		fullname:			{ type: String, label: 'Full Name' },
		mobilenumber:		{ type: String, regEx: /^[0-9]{11}$/, label: 'Mobile Number' },
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
		<motion.div variants={animationVariants} initial="pageEnter" animate="pageAnimate" exit="pageLeave" layout>
			<Container id="signup-page" className="py-3">
				<Row className="justify-content-center">
					<Col>
						<AutoForm schema={bridge} onSubmit={data => submit(data)}>
							<Card>
								<Card.Header className="bg-success-subtle text-success">
									<strong>Register New Account</strong>
								</Card.Header>
								
								<Card.Body>
									<TextField name="email" 			placeholder="E-mail address"	label="Enter the E-mail address to register as" autoComplete="off"/>
									<TextField name="password" 			placeholder="Desired Password"	label="Enter desired password for account" type="password" autoComplete="off"/>
									<TextField name="confirmpassword"	placeholder="Confirm Password"	label="Confirm the new password" type="password" autoComplete="off"/>
									<TextField name="fullname" 			placeholder="Full Name" 		label="Enter your Full Name" />
									<TextField name="mobilenumber"		placeholder="Mobile Number"  	label="Enter your Mobile Number to contact you" />
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
