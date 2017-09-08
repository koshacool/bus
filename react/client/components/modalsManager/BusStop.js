import React from 'react';
import PropTypes from 'prop-types';

import {rolesList} from '../../api/index';
import checkAuthorized from '../../utils/userUtils';

import StopForm from './Forms/StopForm';
import Map from '../map/Map';

import GoogleMap from '../map/GoogleMap';

class BusStop extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      location: '',
      id: '',
      googleMap: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMapParams = this.getMapParams.bind(this);
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
      blockStyle: {height: '300px', width: '500px'},
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const {options} = this.getMapParams();

    const {showMap} = this.props.otherProps;
    const {googleMap} = this.state;

    if (showMap && !googleMap) {
      GoogleMap(this.mapDiv, options)
        .then(map => this.setState({
          googleMap: map,
        }))
        .catch(console.log.bind(console));
    }
  }

  render() {
    const {name, address, location, id} = this.state;
    const {blockStyle} = this.getMapParams();

    const {showMap} = this.props.otherProps;

    // console.log(showMap)

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

        <div className="container">
          {showMap && <div ref={(map) => this.mapDiv = map} style={blockStyle}/>}
        </div>

      </div>
    );
  }

};

BusStop.propTypes = {
  otherProps: PropTypes.object.isRequired,
  // closeModal: PropTypes.func.isRequired,
};

export default BusStop;
