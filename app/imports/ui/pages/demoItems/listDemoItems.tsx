import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { DemoItems } from '../../../api/DemoItemsCollection';
import DemoItem from './DemoItem';
import LoadingSpinner from '../../components/LoadingSpinner';

/* Renders a table containing all of the collection documents. Use <DemoItem> to render each row. */
const ListDemoItems = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { subscriptionReady, demoItems } = useTracker(() => {
		// Note that this subscription will get cleaned up
		// when your component is unmounted or deps change.
		const subscription = Meteor.subscribe(DemoItems.userPublicationName);	// Get access to collection
		const subscriptionReady = subscription.ready();							// Determine if the subscription is ready
		const demoItems = DemoItems.collection.find({}).fetch();				// Get all the documents
		return {
			demoItems,
			subscriptionReady,
		};
	}, []);
	return (!subscriptionReady ? <LoadingSpinner /> : (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col md={7}>
					<Card>
						<Card.Header className="bg-primary text-white">
							<strong>List DemoItems</strong>
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
									{demoItems.map((demoItem) => <DemoItem key={demoItem._id} demoItem={demoItem} />)}
								</tbody>
							</Table>
						</Card.Body>
						<Card.Footer>
							<Link className="btn btn-primary py-0" to="/demoItems/add">Add New Item</Link>
						</Card.Footer>						
					</Card>
				</Col>
			</Row>
		</Container>
	));
};

export default ListDemoItems;
