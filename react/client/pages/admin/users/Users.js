import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Modal} from 'react-materialize';
import {usersList, removeUser} from '../../../api/index';
import checkAuthorized from '../../../utils/userUtils';

import Spinner from '../../../components/spiner/Spinner';
import User from './User';

import ModalsManager from '../../../components/modalsManager/ModalsManager';
import $ from 'jquery';

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

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.getUsers();

    $('.modal').modal();
    $('#modal1').on('click', () => {
    });
  }

  /**
   * Change status for display modal(hide modal window)
   * @returns {void}
   */
  hideModal() {
    this.setState({
      modal: false,
    });
  }

  /**
   * Show modal window by name
   * @param {string} name Modal window name
   * @returns {Function}
   */
  showModal(name) {
    return (modalParams = null) => this.setState({
      modal: ucFirst(name),
      modalParams,
    });
  }

  onRemove(id) {
    const {push} = this.props.router;

    return () => {
      removeUser(id)
        .then(this.getUsers)
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

  /**
   * Display modal window for create user
   *
   * @returns {XML}
   */
  modalAddUser() {
    const {router} = this.props;
    const {users, modal, modalParams} = this.state;

    return (<ModalsManager
      id="addUser"
      modalName="AddUser"
      headerName="Add new user"
      otherProps={{confirm: 'create', router, getUsers: this.getUsers}}
    />);
  }


  renderUsers() {
    const {users} = this.state;

    return users
      .map(user => <User user={user} key={user.id} onRemove={this.onRemove}/>);
  }


  render() {
    const {router} = this.props;
    const {users, modal, modalParams} = this.state;
    const loading = users.length === 0;
    let modal1=new Modal($("#yourModal"));

    modal1.open(); //Open it on some event


    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          <h3> Users: </h3>
          <Button onClick={this.showModal('addUser')}>add</Button>


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

        <a className="waves-effect waves-light btn view" data-target="modal1">View Scores</a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

        {modal && this[`modal${modal}`](modalParams)}
      </div>
    );
  }
}


export default Users;
