import handleErrors from './handleResponse';

const checkAuthorized = (push, error) => {
  // if (error.status == 401) {
  //   sessionStorage.setItem('token', null);
  //   sessionStorage.setItem('role', null);
  //   push('/sign-in');
  // }
  handleErrors(error);
};

export default checkAuthorized;
