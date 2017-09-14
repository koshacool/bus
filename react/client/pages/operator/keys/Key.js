import React from 'react';
import PropTypes from 'prop-types';
import { keyCodes } from '../params';

const Key = ({actionObj, actionName, onEdit, inEdding}) => {
  const onClick = () => onEdit(actionName, actionObj.code);
  const keyValue = keyCodes[actionObj.code];

  return (
    <div className="key-desc">
      <div className="key__wrap">
        <button onClick={onClick}>
          { inEdding === actionObj.code ? 'Press key' : keyValue }
        </button>
      </div>
      <div>{actionObj.text}</div>
      <hr/>
    </div>
  );
};

Key.propTypes = {
  actionObj: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  inEdding: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
};

export default Key;
