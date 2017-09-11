import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-materialize';
import {DefaultPlayer} from 'react-html5video';
import 'react-html5video/dist/styles.css';

class Video extends React.Component {
  constructor() {
    super();
  }


  render() {


    return (
      <div className="container">
        <DefaultPlayer


                       controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen', 'Captions', 'Speed']}

                       onCanPlayThrough={() => {
                         // Do stuff
                       }}>
          <source src="http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg" type="video/webm"/>
          <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default/>
        </DefaultPlayer>
      </div>
    );
  }
}


export default Video;
