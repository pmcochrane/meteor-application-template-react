import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Nav, Navbar, Row, Col} from 'react-bootstrap';
// import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { currentUser } = useTracker(() => ({
		currentUser: Meteor.user() ? Meteor.user()?.username : '',
	}), []);

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
							<Nav.Link id="list-stuff-nav" as={NavLink} to="/stuff/list" key="list">Stuff</Nav.Link>,
						]) : ''}
						{Roles.userIsInRole(Meteor.userId()!, 'admin') ? (
							<Nav.Link id="list-stuff-admin-nav" as={NavLink} to="stuff/listadmin" key="admin">Stuff (Admin)</Nav.Link>
						) : ''}
					</Nav>
					<Nav className="justify-content-end">
						{currentUser === '' ? (
							<Row className="align-items-center">
								<Col>
									<NavLink className="ms-1 btn btn-primary py-0" to="/signin">Sign In</NavLink>
									<NavLink className="ms-1 btn btn-light py-0" to="/signup">Register New Player</NavLink>
								</Col>
							</Row>
						) : (
							<Row className="align-items-center">
								<Col>
									<span id="navbar-current-user">{currentUser}</span>
									<NavLink className="ms-1 btn btn-light py-0" to="/signout">Sign Out</NavLink>
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
