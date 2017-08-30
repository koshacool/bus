import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Button} from 'react-materialize';
import {Link, Router} from 'react-router';
import Logo from './Logo';

const logout = (redirectFunc) => () => {
  sessionStorage.setItem('token', null);
  redirectFunc('/sign-in');
};

const Header = ({ push }) => (
  <Navbar
    brand="HOME"
    className="grey lighten-3 grey-text text-darken-4 "
  >
    <NavItem className="grey-text text-darken-4 right">
      <i onClick={logout(push)}>Logout</i>
    </NavItem>

    <NavItem  className="grey-text text-darken-4 right" href='/admin/users'>
      <Link to="/users" >Users</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/stops" >Stops</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/routes" >Routes</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/firms" >Firms</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/buses" >Buses</Link>
    </NavItem>
  </Navbar>
);

Header.propTypes = {
  push: PropTypes.func.isRequired,
};

export default Header;
