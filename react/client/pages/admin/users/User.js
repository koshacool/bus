import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-materialize';

import {usersList} from '../../../api/index';
import Spinner from '../../../components/spiner/Spinner';
import ModalsManager from '../../../components/modalsManager/ModalsManager';

const User = (props) => {
  const { name, email, role, id } = props.user;
  const { onRemove } = props;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ role }</td>
      <td>
        {/*<ModalsManager*/}
          {/*id={`edit${id.toString()}`}*/}
          {/*modalName="EditUser"*/}
          {/*headerName="Are you sure?"*/}
          {/*trigger="remove"*/}
          {/*otherProps={{ confirm: 'delete', onConfirm: onRemove(id) }}*/}
        {/*/>*/}
        {/*<ModalsManager*/}
          {/*id={`remove${id.toString()}`}*/}
          {/*modalName="Confirm"*/}
          {/*headerName="Are you sure?"*/}
          {/*trigger="remove"*/}
          {/*otherProps={{ confirm: 'delete', onConfirm: onRemove(id) }}*/}
        {/*/>*/}
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};


export default User;
