import React from 'react';
import PropTypes from 'prop-types';

import {createBusStop} from '../../api/index';
import checkAuthorized from '../../utils/userUtils';

import StopForm from './Forms/StopForm';
import Map from '../map/Map';
import closeModal from './CloseModal';
import GoogleMap from '../map/InitMap';
import InitDrawingManager from '../map/InitDrawingManager';

class BusStop extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      id: '',
      googleMap: false,
      polygon: false,
    };

    this.initialState = this.initialState.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMapParams = this.getMapParams.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.saveMapElement = this.saveMapElement.bind(this);
    this.createDrawingManager = this.createDrawingManager.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
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

    const {name, address, polygon} = this.state;
    const location = JSON.stringify(this.getCoordinates(polygon));

    createBusStop({name, address, location})
      .then(console.log.bind(console))
      .then(closeModal())
      .then(this.setState(this.initialState()))
      .catch(console.log.bind(console));
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

  getCoordinates(polygon) {
    const points = polygon.getPath().getArray();
    return points.map(point => {
      return {lat: point.lat(), lng: point.lng()};
    });
  }

  createDrawingManager(map) {
    const drawingManager = InitDrawingManager();

    drawingManager.addListener('polygoncomplete', (newPolygon) => {
      this.resetPolygon();
      this.saveMapElement(newPolygon, 'polygon');
    });

    drawingManager.setMap(map);
  }

  saveMapElement(elem, type) {
    this.setState({ [type]: elem });
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

  resetPolygon() {
    const {polygon} = this.state;
    if (polygon !== false) {
      polygon.setMap(null);
    }
  }

  initialState() {
    this.resetPolygon();
    return {
      name: '',
      address: '',
      polygon: false,
      id: '',
    };
  }

  render() {
    const {name, address, polygon, id} = this.state;
    const {blockStyle} = this.getMapParams();
    const {showMap} = this.props.otherProps;

    return (
      <div>
        <StopForm
          id={id}
          name={name}
          address={address}
          polygon={polygon !== false}
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
