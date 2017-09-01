import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Row, Input, Button} from 'react-materialize';

import {rolesList, createUser} from '../../../api/index';
import checkAuthorized from '../../../utils/userUtils';

class FormAddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      roleId: '',
      roles: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    const {push} = this.props.otherProps.router;

    //Get all roles
    rolesList()
      .then(res => this.setState({roles: res.data}))
      .catch(checkAuthorized.bind(this, push));
  }

  onChangeInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const { otherProps, closeModal } = this.props;

    createUser(this.state)
      .then(res => {
        console.log(res);
      })
      // .then(closeModal)
      .catch(checkAuthorized.bind(this, otherProps.router.push));
  }




  render() {
    const {otherProps, closeModal} = this.props;
    const {name, email, password, roleId, roles} = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="container">
        <Row>
            <Input
              s={12}
              label="Name"
              name="name"
              value={name}
              onChange={this.onChangeInput('name')}
              required
            />
            <Input
              s={12}
              label="Email"
              name="email"
              value={email}
              onChange={this.onChangeInput('email')}
              required
            />
            <Input
              type="password"
              label="Password"
              s={12}
              name="password"
              value={password}
              onChange={this.onChangeInput('password')}
              required
            />

              <Input
                s={12}
                type="select"
                label="Role"
                name="roleId"
                onChange={this.onChangeInput('roleId')}
                required
                defaultValue="2"
              >
                {
                  roles
                    .map(role => <option key={role.id} value={role.id}>{role.name}</option>)
                }
              </Input>

        </Row>
        <Button modal="close" id="closeModal">close</Button>
        <Button type="submit">{otherProps.confirm}</Button>
        </form>
      </div>
    );
  }
}

FormAddUser.propTypes = {
  otherProps: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default FormAddUser;
