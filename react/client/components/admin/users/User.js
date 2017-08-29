import React from 'react';
import PropTypes from 'prop-types';
import {usersList} from '../../../api';

import Spinner from '../../spiner/Spinner';

const User = (props) => {
  const { name, email, role_id, action } = props.user;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ role_id }</td>
      <td>{ action }</td>
    </tr>
  );
};


export default User;
