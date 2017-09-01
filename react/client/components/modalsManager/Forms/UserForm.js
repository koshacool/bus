import React from 'react';
import PropTypes from 'prop-types';

import { Row, Input, Button } from 'react-materialize';


const UserForm = ({
                    roles,
                    name,
                    email,
                    password,
                    roleId,
                    onChangeInput,
                    onSubmit,
                    id,
                    otherProps,
                  }) => (
  <form onSubmit={onSubmit} className="container">
    <Row>
      <Input
        s={12}
        label="Name"
        name="name"
        value={name}
        onChange={onChangeInput('name')}
        required
      />
      <Input
        s={12}
        label="Email"
        name="email"
        value={email}
        onChange={onChangeInput('email')}
        required
      />
      <Input
        type="password"
        label="Password"
        s={12}
        name="password"
        value={password}
        onChange={onChangeInput('password')}
        required
      />

      <Input
        s={12}
        type="select"
        label="Role"
        name="roleId"
        onChange={onChangeInput('roleId')}
        required
        defaultValue={roleId}
      >
        {
          roles
            .map(role => <option key={role.id} value={role.id}>{role.name}</option>)
        }
      </Input>

    </Row>
    <Button type="button" modal="close" id={id}>close</Button>
    <Button type="submit">{otherProps.confirm}</Button>
  </form>
);

UserForm.propTypes = {
  roles: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  otherProps: PropTypes.object.isRequired,
};


export default UserForm;
