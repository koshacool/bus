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
      <Link to="/admin/users">Users</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/admin/stops">Stops</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/admin/routes">Routes</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/admin/firms">Firms</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right">
      <Link to="/admin/buses">Buses</Link>
    </NavItem>
  </div>
);

AdminHeader.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AdminHeader;

