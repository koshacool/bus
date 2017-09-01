import {showError, showSuccess, showWarning, showInfo} from './alert';

const handleErrors = (error) => {
  if (error.data) {
    return showError(error);
  }


  return showInfo(`Error: {status: ${error.status}, statusText: ${error.statusText}`);

};

export default handleErrors;