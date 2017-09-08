import React from 'react';
import PropTypes from 'prop-types';

import { googleMapsKey } from '../../../etc/config.json';

const GoogleMap = (mountPoint, options) => {

  const loadJS = function (src) {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.id = 'googleMap';
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  };

  const checkLoadedMapScriptBefore = () => {
    if (document.getElementById('googleMap') === null) {
      return false;
    }
    return true;
  };

  if (!checkLoadedMapScriptBefore()) {
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}`);
  }

  const promise = new Promise((resolve, reject) => {
    const timerId = setInterval(() => {
      if (window.google !== undefined) {
        clearInterval(timerId);
        const google = window.google;
        const map = new google.maps.Map(mountPoint, options);
        resolve(map);
      }
    }, 100);
  });

  return promise;
};

Map.propTypes = {
  mountPoint: PropTypes.node.isRequired,
  options: PropTypes.object.isRequired,
};


export default GoogleMap;
