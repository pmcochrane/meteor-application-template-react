import React 														from 'react';
import { Link } 													from 'react-router-dom';
import { Card, Col, Container, Row, Table } 						from 'react-bootstrap';
import { PlusCircleFill } 											from 'react-bootstrap-icons';
import { motion }													from 'framer-motion';

import { Meteor } 													from 'meteor/meteor';
import { useTracker } 												from 'meteor/react-meteor-data';

import DemoItem 													from './DemoItem';
import { DemoItems } 												from '../../../api/DemoItemsCollection';
import { pageTransition } 											from '../../components/AnimatedRoutes';
import LoadingSpinner 												from '../../components/LoadingSpinner';

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
	return (
		<motion.div initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
		{!subscriptionReady ? (
			<LoadingSpinner /> 
		) : (
			<Container className="py-3">
				<Row className="justify-content-center">
					<Col md={7}>
						<Card>
							<Card.Header className="text-bg-primary">
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
							<Card.Footer className="text-bg-primary-subtle bg-primary-subtle">
								<Link to="/demoItems/add" className="btn btn-primary px-2 py-1"><div className="d-flex align-items-center"><PlusCircleFill/>&nbsp;Add New Item</div></Link>
							</Card.Footer>						
						</Card>
					</Col>
				</Row>
			</Container>
		)}
		</motion.div>
	);
};

export default ListDemoItems;
