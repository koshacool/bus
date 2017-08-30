import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-materialize';
import {usersList} from '../../../api';
import handleErrors from '../../../utils/handleErrors';

import Spinner from '../../spiner/Spinner';
import User from './User';


class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount() {
    usersList()
      .then(res => this.setState({ users: res.data }))
      .catch(handleErrors.bind(this));

  }

  renderUsers() {
    const { users } = this.state;

    return users
      .map(user => <User user={user} key={user.id}/>);
  }


  render() {
    const {users} = this.state;
    const loading = users.length === 0;

    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          <h3> Users: </h3>
          <Button>ADD</Button>


          {/*Display registered users*/}
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
