import React from 'react';
import { Navigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
// import { Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
	Meteor.logout();
	// Swal.fire('Signed Out', 'You have now signed out', 'success');
	Swal.fire({html: 'You have now signed out', icon: 'info', customClass: 'bg-info-subtle text-black', toast: true, position: 'top-end', timer: 5000, showConfirmButton: false, showCloseButton: true});
	return (<Navigate to="/" />);
};

export default SignOut;
