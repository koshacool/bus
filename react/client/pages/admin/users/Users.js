import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';
import {usersList, createUser, removeUser, editUser} from '../../../api/index';
import checkAuthorized from '../../../utils/userUtils';

import Spinner from '../../../components/spiner/Spinner';
import User from './User';

import ModalsManager from '../../../components/modalsManager/ModalsManager';
import closeModal from '../../../components/modalsManager/CloseModal';

/**
 * Make first char in the string to upper case
 *
 * @param {string} str
 *
 * @return {string}
 */
export const ucFirst = str => str[0].toUpperCase() + str.slice(1);

class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      modal: false,
      modalParams: null,
    };

    this.renderUsers = this.renderUsers.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  onRemove(id) {
    const {push} = this.props.router;

    return () => {
      removeUser(id)
        .then(console.log.bind(console))
        .then(this.getUsers)
        .then(closeModal(id))
        .catch(checkAuthorized.bind(this, push));
    };
  }

  getUsers() {
    const {push} = this.props.router;

    // Get all users
    usersList()
      .then(res => this.setState({users: res.data}))
      .catch(checkAuthorized.bind(this, push));
  }

  setEmptyUsers() {
    this.setState({users: []});
  }

  onAdd(userData) {
    const {push} = this.props.router;

    createUser(userData)
      .then(console.log.bind(console))
      .then(closeModal())
      .then(this.getUsers)
      .catch(checkAuthorized.bind(this, push));
  }

  onEdit(userId) {
    const {push} = this.props.router;

    return (userData) => {
      editUser(userId, userData)
        .then(console.log.bind(console))
        .then(closeModal(`Edit${userId}`))
        .then(this.getUsers)
        .catch(checkAuthorized.bind(this, push));
    }
  }

  renderUsers() {
    const {users} = this.state;
    const {router} = this.props;

    return users
      .map(user => (<User
          user={user}
          key={user.id}
          onRemove={this.onRemove}
          onEdit={this.onEdit}
          router={router}
        />
      ));
  }


  render() {
    const {router} = this.props;
    const {users, modal, modalParams} = this.state;
    const loading = users.length === 0;

    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          <h3> Users: </h3>
          <ModalsManager
            id="addUser"
            modalName="AddEditUser"
            headerName="Add new user"
            trigger="Add"
            otherProps={{router, onConfirm: this.onAdd}}
          />

          {/* Display registered users*/}
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {!loading && this.renderUsers()}
            </tbody>

          </table>

        </Spinner>

      </div>
    );
  }
}


export default Users;
