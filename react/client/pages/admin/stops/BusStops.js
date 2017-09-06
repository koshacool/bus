import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';

import Map from '../../../components/map/Map';

import ModalsManager from '../../../components/modalsManager/ModalsManager';
import closeModal from '../../../components/modalsManager/CloseModal';


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
    };
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


  render() {
    const {options, blockStyle, markers} = this.getMapParams();
    const {router} = this.props;
    // const {stops} = this.state;


    return (
      <div className="container">
        <h3> Bus stops: </h3>

        <ModalsManager
          id="addStop"
          modalName="BusStop"
          headerName="Add new bus stop"
          trigger="Add"
          modalOptions={{ready: (modal, trigger) => console.log('opened')}}
          otherProps={{confirm: 'create', router, onConfirm: this.onAdd}}
        />

        <Map options={options} blockStyle={blockStyle} markers={markers}/>

      </div>
    );
  }
}


export default BusStops;
