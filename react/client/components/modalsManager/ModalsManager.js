/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Modal, Button} from 'react-materialize';

import AddUser from './Forms/AddUser';
import EditUser from './Forms/EditUser';
import Confirm from './Confirm';

/**
 * Object with modal components names
 *
 * @type {object}
 */
const ModalComponents = {
  Confirm,
  AddUser,
  EditUser,
};

/**
 * Class for display modal windows
 */
class ModalsManager extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { id } = this.props;
    document.getElementById(`closeModal${id}`).click();
  }

  render() {
    const { id, modalName, headerName, trigger, otherProps } = this.props;
    // Get component from object by name
    const ModalComponent = ModalComponents[modalName];

    return (
      <Modal
        id={id}
        header={headerName}
        trigger={<Button>{trigger}</Button>}
        actions={<div></div>}
      >
        <ModalComponent id={`closeModal${id}`} otherProps={otherProps} closeModal={this.closeModal} />
      </Modal>
    );
  }
}

ModalsManager.propTypes = {
  headerName: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};

export default ModalsManager;
