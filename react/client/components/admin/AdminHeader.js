import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import { Navbar, NavItem } from 'react-materialize';


const AdminHeader = () => (
  <Navbar
    brand="HOME"
    className="grey lighten-3 grey-text text-darken-4 "
  >
    <NavItem  className="grey-text text-darken-4 right" href='/admin/users'>
      <Link to="/admin/users" >Users</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/stops" >Stops</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/routes" >Routes</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/firms" >Firms</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/buses" >Buses</Link>
    </NavItem>

  </Navbar>
);

export default AdminHeader;