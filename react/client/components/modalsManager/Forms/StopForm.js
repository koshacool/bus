import React from 'react';
import PropTypes from 'prop-types';

import { Row, Input, Button } from 'react-materialize';


const StopForm = ({
                    id,
                    name,
                    address,
                    location,
                    onChangeInput,
                    onSubmit,
                  }) => (
  <form onSubmit={onSubmit} className="container">
    <Row>
      <Input
        s={12}
        label="Name"
        name="name"
        value={name}
        onChange={onChangeInput('name')}
        required
      />
      <Input
        s={12}
        label="Address"
        name="address"
        value={address}
        onChange={onChangeInput('address')}
        required
      />
      <Input
        label="Make right mouse click on map"
        s={12}
        name="location"
        value={location}
        onChange={onChangeInput('position')}
        required
      />

      <Button>save</Button>
      <Button id={`closeModal${id}`} type="button" className="modal-action modal-close">close</Button>
    </Row>
  </form>
);

StopForm.defaultProps = { id: '' };

StopForm.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};


export default StopForm;
