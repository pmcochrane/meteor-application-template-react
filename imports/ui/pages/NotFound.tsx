import React, { useEffect } 										from 'react';
import { Col, Container, Row } 										from 'react-bootstrap';
import { motion, usePresence }										from 'framer-motion';
import { animationVariants } 										from '../components/AnimatedRoutes';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => {
	// This is a hack to ensure that component is removed from DOM if animation does not exit properly
	const [isPresent, safeToRemove] = usePresence();
	useEffect(() => { !isPresent && setTimeout(safeToRemove, 800); }, [isPresent]);

	return (
		<motion.div variants={animationVariants} initial="pageEnter" animate="pageAnimate" exit="pageLeave" layout>
			<Container className="py-3">
				<Row className="justify-content-center">
					<Col xs={4} className="text-center">
						<h2>
							<p>Page not found</p>
						</h2>
					</Col>
				</Row>
			</Container>
		</motion.div>
	);
}

export default NotFound;
