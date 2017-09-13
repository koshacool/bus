import {showError, showSuccess, showWarning, showInfo} from './alert';

const onError = (error) => {
  showError(error);
  return error;
};

const onSuccess = (success) => {
  showSuccess(success);
  return success;
}


export default { onError, onSuccess };
