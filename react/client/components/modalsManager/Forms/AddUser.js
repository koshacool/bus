import React from 'react';
import PropTypes from 'prop-types';

import { rolesList, createUser } from '../../../api/index';
import checkAuthorized from '../../../utils/userUtils';
import UserForm from './UserForm';

class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      roleId: '2',
      roles: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    const { push } = this.props.otherProps.router;

    // Get all roles
    rolesList()
      .then(res => this.setState({roles: res.data}))
      .catch(checkAuthorized.bind(this, push));
  }

  onChangeInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const {otherProps, closeModal} = this.props;

    createUser(this.state)
      .then(console.log.bind(console))
      .then(otherProps.getUsers)
      .then(closeModal)
      .catch(checkAuthorized.bind(this, otherProps.router.push));
  }

  render() {
    const { id, otherProps } = this.props;
    const { name, email, password, roleId, roles } = this.state;

    return (
      <div>
        <UserForm
          roles={roles}
          name={name}
          email={email}
          password={password}
          roleId={roleId}
          onChangeInput={this.onChangeInput}
          onSubmit={this.onSubmit}
          id={id}
          otherProps={otherProps}
        />
      </div>
    );
  }
}

AddUser.propTypes = {
  otherProps: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AddUser;
