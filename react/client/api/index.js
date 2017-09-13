import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';
import { onSuccess } from '../utils/handleResponse';


export default {

  authorization(email, password) {
    return axios.post(`${apiPrefix}/sign-in`, {
      email,
      password,
    })
      .then(onSuccess);
  },

  checkUserToken() {
    return axios({
      method: 'post',
      url: `${apiPrefix}/refresh`,
      params: {
        token: sessionStorage.getItem('token'),
      },
    })
      .then(onSuccess);
  },

  userInfo() {
    return axios({
      method: 'get',
      url: `${apiPrefix}/api/get/profile`,
      params: {
        token: sessionStorage.getItem('token'),
      },
    })
      .then(onSuccess);
  },

  usersList() {
    return axios({
      method: 'get',
      url: `${apiPrefix}/api/get/users`,
      params: {
        token: sessionStorage.getItem('token'),
      },
    })
      .then(onSuccess);
  },

  rolesList() {
    return axios({
      method: 'get',
      url: `${apiPrefix}/api/get/roles`,
      params: {
        token: sessionStorage.getItem('token'),
      },
    })
      .then(onSuccess);
  },

  createUser({name, email, password, roleId}) {
    return axios({
      method: 'post',
      url: `${apiPrefix}/api/user/create`,
      params: {
        token: sessionStorage.getItem('token'),
        name,
        email,
        password,
        roleId,
      },
    })
      .then(onSuccess);
  },

  editUser(id, {name, email, password, roleId}) {
    return axios({
      method: 'post',
      url: `${apiPrefix}/api/user/update`,
      params: {
        token: sessionStorage.getItem('token'),
        id,
        name,
        email,
        password,
        roleId,
      },
    })
      .then(onSuccess);
  },

  removeUser(id) {
    return axios({
      method: 'post',
      url: `${apiPrefix}/api/user/remove`,
      params: {
        token: sessionStorage.getItem('token'),
        id,
      },
    })
      .then(onSuccess);
  },

  createBusStop({name, address, location}) {
    return axios({
      method: 'post',
      url: `${apiPrefix}/api/stop/create`,
      params: {
        token: sessionStorage.getItem('token'),
        name,
        address,
        location,
      },
    })
      .then(onSuccess);
  },

};
