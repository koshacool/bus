import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { NavItem } from 'react-materialize';


const AdminHeader = ({ logout }) => (
  <div>
    <NavItem className="grey-text text-darken-4 right">
      <i onClick={logout}>Logout</i>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" href='/admin/users'>
      <Link to="/users">Users</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/stops">Stops</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/routes">Routes</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/firms">Firms</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/buses">Buses</Link>
    </NavItem>
  </div>
);

AdminHeader.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AdminHeader;

