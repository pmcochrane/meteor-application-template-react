import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.tsx. */
const StuffItemAdmin = ({ stuff }: any) => (
  <tr>
    <td>{stuff.name}</td>
    <td>{stuff.quantity}</td>
    <td>{stuff.condition}</td>
    <td>{stuff.owner}</td>
	<td><Link to={`/stuff/edit/${stuff._id}`}>Edit</Link></td>
  </tr>
);

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
