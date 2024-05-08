import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the collection. See pages/demoItems/listAdmin.tsx. */
const DemoItemAdmin = ({ demoItem }: any) => (
	<tr>
		<td>{demoItem.name}</td>
		<td>{demoItem.quantity}</td>
		<td>{demoItem.condition}</td>
		<td>{demoItem.owner}</td>
		<td><Link to={`/demoItems/edit/${demoItem._id}`}>Edit</Link></td>
	</tr>
);

// Require a document to be passed to this component.
DemoItemAdmin.propTypes = {
	demoItem: PropTypes.shape({
		name: PropTypes.string,
		quantity: PropTypes.number,
		condition: PropTypes.string,
		_id: PropTypes.string,
		owner: PropTypes.string,
	}).isRequired,
};

export default DemoItemAdmin;
