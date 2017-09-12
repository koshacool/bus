import React from 'react';
import PropTypes from 'prop-types';
import {Row, Input} from 'react-materialize';
import {Player, ControlBar, PlayToggle, ReplayControl, VolumeMenuButton} from 'video-react';

import VideoPlayer from '../../../components/video/VideoPlayer';

class Video extends React.Component {
  constructor() {
    super();
  }


  render() {

    return (
      <div className="container">
        <VideoPlayer />
      </div>
    );
  }
}


export default Video;
