import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem } from 'react-materialize';


const PublicNavigation = () => (
  <div>
    <Navbar
      brand="HOME"
      className="grey lighten-3 grey-text text-darken-4 "
    >
      <NavItem className="grey-text text-darken-4 right">
        <Link to="/sign-in">Sign-in</Link>
      </NavItem>
    </Navbar>
  </div>
);

export default PublicNavigation;

