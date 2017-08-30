import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Button} from 'react-materialize';
import {Link, Router} from 'react-router';
import Logo from './Logo';

const logout = (redirectFunc) => () => {
  sessionStorage.setItem('token', null);
  redirectFunc('/sign-in');
};
const Header = ({  push  }) => (
    <Navbar
      brand="HOME"
      className="grey lighten-3 grey-text text-darken-4 "
    >
      <NavItem className="grey-text text-darken-4 right" >
        <i onClick={logout(push)}>Logout</i>
      </NavItem>

      <NavItem className="grey-text text-darken-4 right" href='/admin'>
        <Link to="/admin">Upload</Link>
      </NavItem>
      <NavItem className="grey-text text-darken-4 right" href='/photos'>
        <Link to="/photos">Photos</Link>
      </NavItem>

      <NavItem className="grey-text text-darken-4 right" href='/photos'>
        <Link to="/lovestory">Lovestory</Link>
      </NavItem>
      <NavItem className="grey-text text-darken-4 right" href='/photos'>
        <Link to="/children">Children</Link>
      </NavItem>
      <NavItem className="grey-text text-darken-4 right" href='/photos'>
        <Link to="/wedding">Wedding</Link>
      </NavItem>
      <NavItem className="grey-text text-darken-4 right" href='/auth'>
        <Link to="/auth">Photosession</Link>
      </NavItem>
    </Navbar>
  );


export default Header;