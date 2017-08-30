import handleErrors from './handleErrors';


const checkAuthorized = (push, error) => {
  if (error.status == 401) {
    sessionStorage.setItem('token', null);
    push('/sign-in');
  }
  handleErrors(error);
};

export default checkAuthorized;
