import React from 'react';
import PropTypes from 'prop-types';
import {usersList} from '../../../api/index';

import Spinner from '../../../components/spiner/Spinner';

const User = (props) => {
  const { name, email, role, action } = props.user;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ role }</td>
      <td>{ action }</td>
    </tr>
  );
};


export default User;
