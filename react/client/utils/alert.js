import Alert from 'react-s-alert';


const errorKeys = ['reason', 'error', 'message'];

const alertOptions = {
  timeout: 4000,
  effect: 'genie',
};


const getErrorKey = error => errorKeys.find(key => !!error.data[key]);

const getErrorMessage = (error) => {
  if (!error) {
    return '';
  }

  const errorKey = getErrorKey(error);

  if (errorKey) {
    return `${error.status}:${error.statusText}, ${error.data.error} `;
  }

  return (typeof error === 'string' && error) || 'Unspecified error';
};


export const showError = error => {
  // eslint-disable-next-line no-console
  console.log(error);

  const errorMessage = getErrorMessage(error);

  Alert.error(errorMessage, alertOptions);
};


export const showSuccess = message => {
  console.log(message);
  Alert.success(`status: ${message.status}, text: ${message.statusText}`, alertOptions);
};


export const showWarning = message => {
  console.log(message);
  Alert.warning(message, alertOptions);
};


export const showInfo = message => {
  console.log(message);
  Alert.info(message, alertOptions);
};