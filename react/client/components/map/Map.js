import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';

import GoogleMapsLoader from 'google-maps';

import Spiner from '../spiner/Spinner';


const MY_API_KEY = 'AIzaSyAnV1rYA3NJ_yMNCUdyHZDWvbjbGyIB5jU';

class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      markers: [],
      loading: true,
      google: null,
      map: null,
    };

    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    // Set google api key
    GoogleMapsLoader.KEY = MY_API_KEY;
    // Load google api script
    GoogleMapsLoader.load(this.initMap);

    // When map loaded hide spiner and show map
    GoogleMapsLoader.onLoad((google) => {
      this.setState({loading: false, google});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.map === null && this.state.map !== null) {
      this.addMarkers();
    }
  }

  initMap(google) {
    const {options} = this.props;

    // Initial map and save it to component's state
    this.setState({
      map: new google.maps.Map(this.mapDiv, options),
    });
  }

  addMarkers() {
    const {map, google} = this.state;
    const {markers} = this.props;

    if (markers !== undefined) {
      this.setState({
        markers: markers.map(markerParams => {
          markerParams.map = map;
          let marker = new google.maps.Marker(markerParams);
          marker.addListener('click', () => console.log('working'));
          return marker;
        }),
      });
    }

  }

  render() {
    const {loading} = this.state;
    const {blockStyle} = this.props;

    console.log(this.state);


    return (
      <Spiner loading={loading} className="container">
        <div ref={(map) => {
          this.mapDiv = map;
        }} style={blockStyle}/>
      </Spiner>
    );
  }
}

// Map.defaultProps = {
//   markers: [],
// };

Map.propTypes = {
  options: PropTypes.object.isRequired,
  blockStyle: PropTypes.object.isRequired,
  markers: PropTypes.array,
};


export default Map;
