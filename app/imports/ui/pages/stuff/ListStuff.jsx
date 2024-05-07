import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../../components/StuffItem';
import LoadingSpinner from '../../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListStuff = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { ready, stuffs } = useTracker(() => {
		// Note that this subscription will get cleaned up
		// when your component is unmounted or deps change.
		const subscription = Meteor.subscribe(Stuffs.userPublicationName);	// Get access to Stuff documents.
		const subscriptionReady = subscription.ready();						// Determine if the subscription is ready
		const stuffItems = Stuffs.collection.find({}).fetch();				// Get the Stuff documents
		return {
			stuffs: stuffItems,
			ready: subscriptionReady,
		};
	}, []);
	return (!ready ? <LoadingSpinner /> : (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col md={7}>
					<Card>
						<Card.Header className="bg-primary text-white">
							<strong>List Stuff</strong>
						</Card.Header>
						<Card.Body className="px-0 py-0">
							<Table striped hover className="mb-0">
								<thead>
									<tr>
										<th>Name</th>
										<th>Quantity</th>
										<th>Condition</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
								</tbody>
							</Table>
						</Card.Body>
						<Card.Footer>
							<Link className="btn btn-primary py-0" to="/stuff/add">Add New Item</Link>
						</Card.Footer>						
					</Card>
				</Col>
			</Row>
		</Container>
	));
};

export default ListStuff;
