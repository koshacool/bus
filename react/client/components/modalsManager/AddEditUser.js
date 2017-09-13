import React from 'react';
import PropTypes from 'prop-types';

import UserForm from './Forms/UserForm';

class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      roleId: '2',
      id: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentWillMount() {
    const { otherProps } = this.props;

    // Set default values for edit user form
    if (otherProps && otherProps.user) {
      const { user } = otherProps;

      this.setState({
        name: user.name,
        email: user.email,
        roleId: user.role_id.toString(),
        id: `Edit${user.id}`,
      });
    }
  }

  onChangeInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { otherProps } = this.props;

    otherProps.onConfirm(this.state);
  }

  render() {
    const { name, email, password, roleId, id } = this.state;
    const { roles } = this.props.otherProps;

    return (
      <div>
        <UserForm
          id={id}
          roles={roles}
          name={name}
          email={email}
          password={password}
          roleId={roleId}
          onChangeInput={this.onChangeInput}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

}

AddUser.propTypes = {
  otherProps: PropTypes.object.isRequired,
  // roles: PropTypes.array.isRequired,
  // closeModal: PropTypes.func.isRequired,
};

export default AddUser;
