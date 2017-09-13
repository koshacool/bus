import React from 'react';
import PropTypes from 'prop-types';

import {usersList} from '../../../api/index';
import Spinner from '../../../components/spiner/Spinner';
import ModalsManager from '../../../components/modalsManager/ModalsManager';

const User = (props) => {
  const { name, email, role, id } = props.user;
  const { onRemove, onEdit, router, user, roles } = props;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ role }</td>
      <td>

        <ModalsManager
          id={`editUser${id}`}
          modalName="AddEditUser"
          headerName="Edit user"
          trigger="edit"
          otherProps={{ confirm: 'create', router, user, onConfirm: onEdit(id), roles }}
        />

        <ModalsManager
          id={`remove${id}`}
          modalName="Confirm"
          headerName="Are you sure?"
          trigger="remove"
          otherProps={{ confirm: 'delete', id, router, onConfirm: onRemove(id) }}
        />

      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
};


export default User;
