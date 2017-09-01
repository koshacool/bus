import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-materialize';
import {usersList, removeUser} from '../../../api/index';
import checkAuthorized from '../../../utils/userUtils';

import Spinner from '../../../components/spiner/Spinner';
import User from './User';

import ModalsManager from '../../../components/modalsManager/ModalsManager';


class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.renderUsers = this.renderUsers.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const {push} = this.props.router;
    //Get all users
    usersList()
      .then(res => this.setState({users: res.data}))
      .catch(checkAuthorized.bind(this, push));
  }

  onRemove(id) {
    const {push} = this.props.router;

    return () => {
      removeUser(id)
      .then(res => console.log(res))
      .catch(checkAuthorized.bind(this, push));
    };
  }

  renderUsers() {
    const {users} = this.state;

    return users
      .map(user => <User user={user} key={user.id} onRemove={this.onRemove}/>);
  }


  render() {
    const {router} = this.props;
    const {users} = this.state;
    const loading = users.length === 0;

    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          <h3> Users: </h3>
          <ModalsManager
            id="addUser"
            modalName="AddUser"
            headerName="Add new user"
            trigger="Add"
            otherProps={{confirm: 'create', router}}
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
