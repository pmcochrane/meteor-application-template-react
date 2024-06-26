import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
	<footer className="mt-auto py-1 text-bg-light">
		<Container fluid>
			<Col className="text-center">
				Footer
			</Col>
		</Container>
	</footer>
);

export default Footer;
