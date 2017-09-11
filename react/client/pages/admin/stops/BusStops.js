import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';

import Map from '../../../components/map/Map';

import ModalsManager from '../../../components/modalsManager/ModalsManager';
import closeModal from '../../../components/modalsManager/CloseModal';
import GoogleMap from "../../../components/map/InitMap";


/**
 * Make first char in the string to upper case
 *
 * @param {string} str
 *
 * @return {string}
 */
export const ucFirst = str => str[0].toUpperCase() + str.slice(1);


class BusStops extends React.Component {
  constructor() {
    super();

    this.state = {
      stops: [],
      googleMap: null,
      markers: null,
      showModalMap: false,
    };

    this.showMarkers = this.showMarkers.bind(this);
    this.showModalMap = this.showModalMap.bind(this);
  }

  getMapParams() {
    return {
      options: {
        center: {lat: 49.554829, lng: 25.590585},
        zoom: 13,
      },
      blockStyle: {height: '500px', width: '800px'},
      markers: [{
        position: {lat: 49.554829, lng: 25.590585},
        label: 'R',
        draggable: true,
      }],
    };
  }

  showMarkers(googleMap) {
    const {markers} = this.getMapParams();
    // const {markers} = this.props;

    return markers.map(markerParams => {
      markerParams.map = googleMap;
      markerParams.animation = window.google.maps.Animation.DROP;
      let marker = new window.google.maps.Marker(markerParams);
      marker.addListener('click', () => console.log('working'));
      return marker;
    });


  }

  showModalMap() {
    this.setState({showModalMap: true});
  }

  componentDidMount() {
    const {options} = this.getMapParams();

    GoogleMap(this.mapDiv, options)
      .then(map => this.setState({
        googleMap: map,
        markers: this.showMarkers(map),
      }))
      .catch(console.log.bind(console));

  }


  render() {
    const {blockStyle} = this.getMapParams();
    const {router} = this.props;
    const {showModalMap} = this.state;

    return (
      <div className="container">
        <h3> Bus stops: </h3>

        <ModalsManager
          id="addStop"
          modalName="BusStop"
          headerName="Add new bus stop"
          trigger="Add"
          modalOptions={{ready: this.showModalMap}}
          otherProps={{confirm: 'create', router, onConfirm: this.onAdd, showMap: showModalMap}}
        />


        <div ref={(map) => this.mapDiv = map} style={blockStyle}/>
      </div>
    );
  }
}


export default BusStops;
