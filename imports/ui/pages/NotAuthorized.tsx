import React 														from 'react';
import { Col, Container, Row } 										from 'react-bootstrap';
import { motion }													from 'framer-motion';
import { pageTransition } 											from '../components/AnimatedRoutes';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotAuthorized = () => (
	<motion.div initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
		<Container className="py-3">
			<Row className="justify-content-center">
				<Col xs={4} className="text-center">
					<h2>
						<p>Sorry, you are not authorized to view this page as the signed in user.</p>
					</h2>
				</Col>
			</Row>
		</Container>
	</motion.div>
);

export default NotAuthorized;
