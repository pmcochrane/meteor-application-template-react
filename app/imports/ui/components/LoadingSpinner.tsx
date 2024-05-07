import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container className="py-3">
    <Row className="justify-content-md-center align-items-center">
		<Col className="col-auto pe-1"><Spinner animation="border" /></Col>
      	<Col className="col-auto ps-0">Getting data</Col>
    </Row>
  </Container>
);

export default LoadingSpinner;
