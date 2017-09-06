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
    this.getMapParams = this.getMapParams.bind(this);
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
      markers: [{
        position: {lat: 49.554830, lng: 25.590652},
        title: 'r',
      }],
    };
  }

  render() {
    const {name, address, location, id} = this.state;
    const { markers, options, blockStyle } = this.getMapParams();

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

        <Map options={options} markers={markers} blockStyle={blockStyle} />
      </div>
    );
  }

};

BusStop.propTypes = {
  otherProps: PropTypes.object.isRequired,
  // closeModal: PropTypes.func.isRequired,
};

export default BusStop;
