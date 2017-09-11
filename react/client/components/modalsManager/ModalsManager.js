/* eslint-disable react/forbid-prop-types,no-extra-semi,import/no-unresolved,import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Modal, Button} from 'react-materialize';

import AddEditUser from './AddEditUser';
import Confirm from './Confirm';

import BusStop from './BusStop';
/**
 * Object with modal components names
 *
 * @type {object}
 */
const ModalComponents = {
  AddEditUser,
  Confirm,
  BusStop,
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
    console.log(this);
  }


  render() {
    const {id, modalName, headerName, trigger, otherProps, actions, modalOptions} = this.props;

    // Get component from object by name
    const ModalComponent = ModalComponents[modalName];

    return (
      <Modal
        id={id}
        header={headerName}
        trigger={<Button>{trigger}</Button>}
        actions=''
        modalOptions={modalOptions}
      >

        <ModalComponent otherProps={otherProps} closeModal={this.closeModal} />

      </Modal>
    );
  }
};

ModalsManager.propTypes = {
  id: PropTypes.string.isRequired,
  headerName: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  actions: PropTypes.object,
  otherProps: PropTypes.object,
};

export default ModalsManager;
