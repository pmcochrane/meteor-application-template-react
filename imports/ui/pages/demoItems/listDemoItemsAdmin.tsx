import React, { } 												from 'react';
import { Link } 													from 'react-router-dom';
import { Card, Col, Container, Row, Table } 						from 'react-bootstrap';
import { PlusCircleFill } 											from 'react-bootstrap-icons';
import { motion }													from 'framer-motion';

import { Meteor } 													from 'meteor/meteor';
import { useTracker } 												from 'meteor/react-meteor-data';

import DemoItemAdmin 												from './DemoItemAdmin';
import { DemoItems } 												from '../../../api/DemoItemsCollection';
import { animationVariants } 										from '../../components/AnimatedRoutes';
import LoadingSpinner 												from '../../components/LoadingSpinner';

/* Renders a table containing all of the collection documents. Use <DemoItemAdmin> to render each row. */
const ListDemoItemsAdmin = () => {
	// This is a hack to ensure that component is removed from DOM if animation does not exit properly
	// const [isPresent, safeToRemove] = usePresence();
	// useEffect(() => { !isPresent && setTimeout(safeToRemove, 800); }, [isPresent]);

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
	return (
		<motion.div variants={animationVariants} initial="pageEnter" animate="pageAnimate" exit="pageLeave" layout className="w-100 position-fixed2">
		{ subscriptionReady ? (
			<Container className="py-3">
				<Row className="justify-content-center">
					<Col md={7}>
						<Card>
							<Card.Header className="text-bg-warning text-black">
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
							<Card.Footer className="text-bg-warning-subtle bg-warning-subtle">
								<Link to="/demoItems/add" className="btn btn-warning px-2 py-1"><div className="d-flex align-items-center"><PlusCircleFill/>&nbsp;Add New Item</div></Link>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		) : (
			<LoadingSpinner />
		)}
		</motion.div>
	);
};

export default ListDemoItemsAdmin;
