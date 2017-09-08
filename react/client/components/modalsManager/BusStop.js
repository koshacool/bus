import React from 'react';
import PropTypes from 'prop-types';

import {rolesList} from '../../api/index';
import checkAuthorized from '../../utils/userUtils';

import StopForm from './Forms/StopForm';
import Map from '../map/Map';

import GoogleMap from '../map/InitMap';
import InitDrawingManager from '../map/InitDrawingManager';

class BusStop extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      location: '',
      id: '',
      googleMap: false,
      polygon: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMapParams = this.getMapParams.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.createDrawingManager = this.createDrawingManager.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const {options} = this.getMapParams();

    const {showMap} = this.props.otherProps;
    const {googleMap} = this.state;

    if (showMap && !googleMap) {
      GoogleMap(this.mapDiv, options)
        .then(map => {
          this.setState({
            googleMap: map,
          });
          return map;
        })
        .then(this.createDrawingManager)
        .catch(console.log.bind(console));
    }
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
        zoom: 14,
      },
      blockStyle: {height: '300px', width: '500px'},
    };
  }

  addMarker(map) {
    map.addListener('rightclick', (e) => {
      let {marker} = this.state;
      // If marker already exist - remove it!
      if (marker !== false) {
        marker.setMap(null);
      }

      marker = new window.google.maps.Marker({
        position: e.latLng,
      });
      map.panTo(e.latLng);
      marker.setMap(map);
      this.setState({location: `${e.latLng}`, marker});
    });
  }

  saveElement(elem, type) {
    this.setState({[type]: elem});
  }


  createDrawingManager(map) {
    const drawingManager = InitDrawingManager();

    drawingManager.addListener('polygoncomplete', (newPolygon) => {
      const {polygon} = this.state;
      if (polygon !== false) {
        polygon.setMap(null);
      }
      this.saveElement(newPolygon, 'polygon');
    });

    drawingManager.setMap(map);
  }

  getCoordinates(polygon) {
    const points = polygon.getPath().getArray();
    return points.map(point => {
      return { lat: point.lat(), lng: point.lng() };
    });
  }

  render() {
    const {name, address, location, id} = this.state;
    const {blockStyle} = this.getMapParams();
    const {showMap} = this.props.otherProps;

    console.log(this.state.polygon)

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
