import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-materialize';

import {usersList} from '../../../api/index';
import Spinner from '../../../components/spiner/Spinner';
import ModalsManager from '../../../components/modalsManager/ModalsManager';

const User = (props) => {
  const { name, email, role, id } = props.user;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ role }</td>
      <td>
        <Button>edit</Button>
        <ModalsManager
          id={id}
          modalName="Confirm"
          headerName="Are you sure?"
          trigger="remove"
          otherProps={{ confirm: 'delete', onConfirm: props.onRemove(id) }}
        />
      </td>
    </tr>
  );
};


export default User;
