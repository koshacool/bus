import React from 'react';
import PropTypes from 'prop-types';

const GoogleMap = ({mountPoing, options}) => {
  const MY_API_KEY = 'AIzaSyAnV1rYA3NJ_yMNCUdyHZDWvbjbGyIB5jU';

  const loadJS = function (src) {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.id = 'googleMap';
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  };

  if (!this.checkLoadedMapScriptBefore()) {
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${MY_API_KEY}`);
  }


  let promise = new Promise((resolve, reject) => {
    const timerId = setInterval(() => {
      if (window.google !== undefined) {
        clearInterval(timerId);
        const google = window.google;
        const map = new google.maps.Map(mountPoing, options);
        resolve(map);
      }
    }, 100);
  });

  return promise;
};


export default GoogleMap;
