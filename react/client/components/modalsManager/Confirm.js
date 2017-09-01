import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Button} from 'react-materialize';


const Confirm = ({id, otherProps, closeModal}) => {

  const onSubmit = () => {
    otherProps.onConfirm();
    closeModal();
  }

  return (
    <div>
      <Button modal="close" id={id}>close</Button>
      <Button onClick={onSubmit}>{otherProps.confirm}</Button>
    </div>
  );
};

Confirm.propTypes = {
  otherProps: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Confirm;
