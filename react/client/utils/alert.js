import Alert from 'react-s-alert';


const errorKeys = ['reason', 'error', 'message'];

const alertOptions = {
  timeout: 4000,
  effect: 'genie',
};


const getErrorKey = error => errorKeys.find(key => error.data && !!error.data[key]);

const getErrorMessage = (error) => {

  if (!error) {
    return '';
  }

  const errorKey = getErrorKey(error);

  if (errorKey) {
    return `${error.status}:${error.statusText}, ${error.data.error} `;
  }

  return (typeof error === 'string' && error) || `Unspecified error! ${error.toString()}`;
};


export const showError = error => {
  // eslint-disable-next-line no-console
  console.log(error);

  Alert.error(getErrorMessage(error), alertOptions);
};


export const showSuccess = message => {
  console.log(message);
  const additionalInfo = message.data.statusText ? message.data.statusText : message.statusText;
  const text = `status: ${message.status}, text: ${additionalInfo}`;
  Alert.success(text, alertOptions);
};


export const showWarning = message => {
  console.log(message);
  Alert.warning(message, alertOptions);
};


export const showInfo = message => {
  console.log(message);
  Alert.info(message, alertOptions);
};