import React from 'react';
import PropTypes from 'prop-types';

import {rolesList} from '../../api/index';
import checkAuthorized from '../../utils/userUtils';

import StopForm from './Forms/StopForm';
import Map from '../map/Map';

class BusStop extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      location: '',
      id: '',
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const {otherProps} = this.props;
  }

  componentDidMount() {

  }

  onChangeInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const {otherProps} = this.props;

    console.log('submit');
  }

  getMapParams() {
    return {
      options: {
        center: {lat: 49.554829, lng: 25.590585},
        zoom: 10,
      },
      blockStyle: {height: '500px', width: '800px'},
    };
  }

  render() {
    const {name, address, location, id} = this.state;
    const { options, blockStyle } = this.getMapParams();

    return (
      <div>
        <StopForm
          id={id}
          name={name}
          address={address}
          location={location}
          onChangeInput={this.onChangeInput}
          onSubmit={this.onSubmit}
        />

        <Map options={options} blockStyle={blockStyle} />
      </div>
    );
  }

};

BusStop.propTypes = {
  otherProps: PropTypes.object.isRequired,
  // closeModal: PropTypes.func.isRequired,
};

export default BusStop;
