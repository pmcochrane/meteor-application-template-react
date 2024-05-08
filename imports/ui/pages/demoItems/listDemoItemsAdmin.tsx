import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { DemoItems } from '../../../api/DemoItemsCollection';
import DemoItemAdmin from './DemoItemAdmin';
import LoadingSpinner from '../../components/LoadingSpinner';

/* Renders a table containing all of the collection documents. Use <DemoItemAdmin> to render each row. */
const ListDemoItemsAdmin = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { demoItems, subscriptionReady } = useTracker(() => {
		const subscription = Meteor.subscribe(DemoItems.adminPublicationName);	// Get access to collection documents.
		const subscriptionReady = subscription.ready();							// Determine if the subscription is ready		
		const demoItems = DemoItems.collection.find({}).fetch();				// Get the collection documents
		return {
			demoItems,
			subscriptionReady,
		};
	}, []);
	return (subscriptionReady ? (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col md={7}>
					<Card>
						<Card.Header className="bg-warning text-black">
							<strong>List DemoItems (admin)</strong>
						</Card.Header>
						<Card.Body className="px-0 py-0">
							<Table striped hover className="mb-0">
								<thead>
									<tr>
										<th>Name</th>
										<th>Quantity</th>
										<th>Condition</th>
										<th>Owner</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{demoItems.map((demoItem) => <DemoItemAdmin key={demoItem._id} demoItem={demoItem} />)}
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
	) : <LoadingSpinner />);
};

export default ListDemoItemsAdmin;
