import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-materialize';


import Admin from './Admin';
import Operator from './Operator';

const headers = {
  admin: Admin,
  operator: Operator,
};

const AuthNavigation = ({logout, role}) => {
  // Get component from object by name
  const HeaderElement = headers[role];

  return (
    <Navbar
      brand="HOME"
      className="grey lighten-3 grey-text text-darken-4 "
    >
      <HeaderElement logout={logout} />

    </Navbar>
  );
};

AuthNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default AuthNavigation;
