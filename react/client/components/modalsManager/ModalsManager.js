/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Modal, Button} from 'react-materialize';

import FormAddUser from './Forms/FormAddUser';

/**
 * Object with modal components names
 *
 * @type {object}
 */
const ModalComponents = {
  AddUser: FormAddUser,
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
    document.getElementById("closeModal").click();
  }

  render() {
    const {modalName, headerName, trigger, otherProps} = this.props;
    //Get component from object by name
    const ModalComponent = ModalComponents[modalName];

    return (
      <Modal
        id="modal"
        header={headerName}
        trigger={<Button>{trigger}</Button>}
        actions={<div></div>}
      >
        <ModalComponent otherProps={otherProps} closeModal={this.closeModal}/>
      </Modal>
    );
  }
};

ModalsManager.propTypes = {
  headerName: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};

export default ModalsManager;
