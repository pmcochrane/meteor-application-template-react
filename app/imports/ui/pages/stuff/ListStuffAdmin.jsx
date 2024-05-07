import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItemAdmin from '../../components/StuffItemAdmin';
import LoadingSpinner from '../../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListStuffAdmin = () => {
	// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
	const { stuffs, ready } = useTracker(() => {
		// Get access to Stuff documents.
		const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
		// Determine if the subscription is ready
		const rdy = subscription.ready();
		// Get the Stuff documents
		const items = Stuffs.collection.find({}).fetch();
		return {
			stuffs: items,
			ready: rdy,
		};
	}, []);
	return (ready ? (
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col md={7}>
					<Card>
						<Card.Header className="bg-warning text-black">
							<strong>List Stuff (admin)</strong>
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
									{stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
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
	) : <LoadingSpinner />);
};

export default ListStuffAdmin;
