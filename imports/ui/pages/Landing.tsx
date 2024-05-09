import React 											from 'react';
import { Link } 										from 'react-router-dom';
import { Col, Container, Row } 							from 'react-bootstrap';

import { Meteor } 										from 'meteor/meteor';
import { useTracker } 									from 'meteor/react-meteor-data';

// import SignIn 											from './SignIn';
// import SignUp 											from './SignUp';

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
		<Container id="landing-page-signed-in" fluid className="py-3">		
			You are signed in.
		</Container>
	) : (	
		// Display the Sign in page as user is not signed in
		<Container id="landing-page-signed-out" fluid className="py-3">		
			<Row className="align-middle">
				<Col className="col-2">
					<Link className="btn btn-primary py-2" to="/signin">Sign In as an EXISTING User</Link> 
					
				</Col>
				<Col className="col-2">
					<Link className="btn btn-success py-2" to="/signup">Register as a NEW User</Link> 
				</Col>
			</Row>
		</Container>
	))
};

export default Landing;
