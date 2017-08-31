import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-materialize';

/**
 * Object with modal components names
 *
 * @type {object}
 */
const ModalComponents = {
  addUser: AddUserForma,

};

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { header,  } = this.props;

    return (
      <Modal
        header='Modal Header'
        trigger={<Button>{trigger}</Button>}>
        <p>Lorem ipsum dolor</p>
      </Modal>
    )
  }
};

ModalComponent.propTypes = {
  modalName: PropTypes.string.isRequired,
  header : PropTypes.string.isRequired,
  otherProps: PropTypes.object.isRequired,
};



export default ModalComponent;
