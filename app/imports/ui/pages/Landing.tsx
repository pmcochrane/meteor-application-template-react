import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import SignIn from './SignIn';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { isLogged } = useTracker(() => {
		return {
			isLogged: Meteor.userId() !== null,
		};
	}, []);
	return (isLogged ? (
		// Display the Home page as user is currently signed in
		<Container id="landing-page-signed-in" fluid>		
			You are signed in.
		</Container>
	) : (	
		// Display the Sign in page as user is not signed in
		<Container id="landing-page-signed-out" fluid>		
			<Row className="align-middle">
				<Col className="col-12">
					<SignIn/>
				</Col>
			</Row>
		</Container>
	))
};

export default Landing;
