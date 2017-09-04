import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Button } from 'react-materialize';


const Confirm = ({ otherProps }) => {

  const { confirm, onConfirm, id } = otherProps;

  return (
    <div>
      <Button onClick={onConfirm}>{ confirm }</Button>
      <Button id={`closeModal${id}`} type="button" className="modal-action modal-close">close</Button>
    </div>
  );
};

Confirm.propTypes = {
  otherProps: PropTypes.object.isRequired,
};

export default Confirm;
