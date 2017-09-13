import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { NavItem } from 'react-materialize';


const OperatorHeader = ({ logout }) => (
  <div>
    <NavItem className="grey-text text-darken-4 right">
      <i onClick={logout}>Logout</i>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" href='/admin/users'>
      <Link to="/operator/certificate">Certificate</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/operator/video">Video</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right">
      <Link to="/operator/keys">Hot KEYS</Link>
    </NavItem>
  </div>
);

OperatorHeader.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default OperatorHeader;

