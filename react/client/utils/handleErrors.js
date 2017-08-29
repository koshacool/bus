import {showError, showSuccess, showWarning, showInfo} from './alert';

const handleErrors = ({ status, statusText }) => {
  const respondErrorCodes = {
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailabl',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
  };

  if (status in respondErrorCodes) {
    return showError(`${respondErrorCodes[status]}: ${statusText}`);
  }

  return showWarning(`Unknown Error(${status}): {statusText}`);
};

export default handleErrors;