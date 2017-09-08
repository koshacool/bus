import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';

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
    this.addMarkers = this.addMarkers.bind(this);
    this.checkLoadedMapScriptBefore = this.checkLoadedMapScriptBefore.bind(this);
    this.waitForLoadScript = this.waitForLoadScript.bind(this);
  }

  componentDidMount() {
    // If script isn't loaded in index.html file, load it
    if (!this.checkLoadedMapScriptBefore()) {
      this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${MY_API_KEY}&libraries=drawing`);
    }

    this.waitForLoadScript();
  }

  waitForLoadScript() {
    const timerId = setInterval(() => {
      if (window.google !== undefined) {
        clearInterval(timerId);
        this.initMap();
      }
    }, 100);

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.map === null && this.state.map !== null) {
      // Display markes on map
      this.addMarkers();
    }
  }

  initMap() {
    const {options} = this.props;
    const google = window.google;
    const map = new google.maps.Map(this.mapDiv, options);

    google.maps.event.addListener(map, 'resize', () => {
      console.log('callback');
    });

    // Initial map and save it to component's state
    this.setState({
      map,
    });
  }

  addMarkers() {
    const {map, google} = this.state;
    const {markers} = this.props;

    this.setState({
      markers: markers.map(markerParams => {
        markerParams.map = map;
        markerParams.animation = window.google.maps.Animation.DROP;
        let marker = new window.google.maps.Marker(markerParams);
        marker.addListener('click', () => console.log('working'));
        return marker;
      }),
    });


  }

  loadJS(src) {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.id = 'googleMap';
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  checkLoadedMapScriptBefore() {
    if (document.getElementById('googleMap') === null) {
      return false;
    }
    return true;
  }

  render() {
    const {loading} = this.state;
    const {blockStyle} = this.props;

    return (
      <div ref={(map) => this.mapDiv = map} style={blockStyle}/>
    );
  }
}

Map.defaultProps = {
  markers: [],
};

Map.propTypes = {
  options: PropTypes.object.isRequired,
  blockStyle: PropTypes.object.isRequired,
  markers: PropTypes.array,
};

export default Map;
