import React from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
// import { Col } from 'react-bootstrap';
import swal from 'sweetalert';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
	Meteor.logout();
	swal('Signed Out', 'You have now signed out', 'success');
	return (<Navigate to="/" />);

	// return (
	// 	<Col id="signout-page" className="text-center py-3"><h2>You are signed out.</h2></Col>
	// );
};

export default SignOut;
