import React 											from 'react';
import { NavLink } 										from 'react-router-dom';
import { Nav, Navbar, Row, Col} 						from 'react-bootstrap';
// import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

import { Meteor } 										from 'meteor/meteor';
import { useTracker } 									from 'meteor/react-meteor-data';
import { Roles } 										from 'meteor/alanning:roles';

import { IColUser } 									from '/imports/startup/server/Accounts';
import { XOctagonFill } from 'react-bootstrap-icons';

const NavBar = () => {
	// const logPrefix="[NavBar]";
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { currentUser, fullName } = useTracker(() => {
		const u=Meteor.user() as IColUser;
		if (u) {
			// console.debug(logPrefix, "Logged In User:", u);
			return {
				currentUser: Meteor.user() ? (Meteor.user()!.username) : '',
				fullName:	u.fullName,
			};
		} else {
			// console.debug(logPrefix, "No user is currently signed in");
			return {
				currentUser: '',
				fullName:	'No User is Signed In',
			}
		}
	});

	return (
		<Navbar className="py-0" bg="light" expand="lg">
			<div className="container-fluid">
				<Navbar.Brand as={NavLink} to="/">
					<strong>Application</strong>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto justify-content-start">
						{currentUser ? ([
							<Nav.Link as={NavLink} to="/demoItems/list" key="list">DemoItems</Nav.Link>,
						]) : ''}
						{Roles.userIsInRole(Meteor.userId()!, 'admin') ? (
							<Nav.Link as={NavLink} to="demoItems/listadmin" key="admin">DemoItems (Admin)</Nav.Link>
						) : ''}
					</Nav>
					<Nav className="justify-content-end">
						{currentUser === '' ? (
							<Row className="align-items-center">
								<Col>
									<span>{fullName}</span>
									{/* <NavLink className="ms-1 btn btn-primary py-0" to="/signin">Sign In</NavLink>
									<NavLink className="ms-1 btn btn-light py-0" to="/signup">Register New Player</NavLink> */}
								</Col>
							</Row>
						) : (
							<Row className="align-items-center">
								<Col>
									<span>{fullName}</span>
									<span>{currentUser}</span>
									<NavLink className="ms-1 btn btn-secondary px-2 py-1" to="/signout"><div className="d-flex align-items-center"><XOctagonFill/>&nbsp;Sign Out</div></NavLink>
								</Col>
							</Row>
						)}
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

export default NavBar;
