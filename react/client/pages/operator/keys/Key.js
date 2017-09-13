import React from 'react';
import PropTypes from 'prop-types';


const Key = ({actionObj}) => {
  console.log(actionObj);
  return (
    <div className="key-desc">
      <div className="key__wrap">
        <button>{String.fromCharCode(actionObj.code)}</button>
      </div>
      <div>{actionObj.text}</div>
    </div>
  );
};

Key.propTypes = {
  actionObj: PropTypes.object.isRequired,
};

export default Key;

//
// function getChar(e) {
//   console.log(e)
//   if (e.key === '' || e.key === ' ') {
//     return e.code;
//   }
//
//   return e.key;
// };