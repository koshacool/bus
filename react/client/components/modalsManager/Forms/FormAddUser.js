import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Row, Input, Button } from 'react-materialize';

export const FormAddUser = (props) => {
  const { otherProps, closeModal } = props;
  return (
    <div>
      <Row>
        <Input  s={12} label="Name" />
        <Input s={12} label="Email" />
        <Input type="password" label="Password" s={12} />
        <Row>
          <Input s={12} type='select' label="Role" >
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input>
        </Row>
      </Row>
      <Button modal="close" id="closeModal">close</Button>
      <Button onClick={closeModal}>{otherProps.confirm}</Button>
    </div>
  );
};

FormAddUser.propTypes = {
  otherProps: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
