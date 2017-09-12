import React from 'react';
import {Player, ControlBar} from 'video-react';
import {Button, Row} from 'react-materialize';

import PassangerStatistic from './PassangerStatistic';


const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunnyMovie,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const {player} = this.player.getState();
      const currentTime = player.currentTime;
      this.player.seek(currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const {player} = this.player.getState();
      const playbackRate = player.playbackRate;
      this.player.playbackRate = playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const {player} = this.player.getState();
      const volume = player.volume;
      this.player.volume = volume + steps;
    };
  }


  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name]
      });
      this.player.load();
    };
  }

  render() {
    const {source} = this.state;
    return (
      <div>
        <div className="videoContent">


          <Player
            ref={(player) => {
              this.player = player;
            }}
            autoPlay
            src={source}
            fluid={false}
            className="video"
          >
            <ControlBar autoHide={false}/>
          </Player>

          <PassangerStatistic/>
        </div>

        {/*<Row s="12">*/}
          {/*<div>*/}
            {/*<Button onClick={this.play} className="mr-3">play()</Button>*/}
            {/*<Button onClick={this.pause} className="mr-3">pause()</Button>*/}
            {/*<Button onClick={this.load} className="mr-3">load()</Button>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<Button onClick={this.changeCurrentTime(10)} className="mr-3">currentTime += 10</Button>*/}
            {/*<Button onClick={this.changeCurrentTime(-10)} className="mr-3">currentTime -= 10</Button>*/}
            {/*<Button onClick={this.seek(50)} className="mr-3">currentTime = 50</Button>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<Button onClick={this.changePlaybackRateRate(1)} className="mr-3">playbackRate++</Button>*/}
            {/*<Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">playbackRate--</Button>*/}
            {/*<Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">playbackRate+=0.1</Button>*/}
            {/*<Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">playbackRate-=0.1</Button>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<Button onClick={this.changeVolume(0.1)} className="mr-3">volume+=0.1</Button>*/}
            {/*<Button onClick={this.changeVolume(-0.1)} className="mr-3">volume-=0.1</Button>*/}
            {/*<Button onClick={this.setMuted(true)} className="mr-3">muted=true</Button>*/}
            {/*<Button onClick={this.setMuted(false)} className="mr-3">muted=false</Button>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<Button onClick={this.changeSource('sintelTrailer')} className="mr-3">Sintel teaser</Button>*/}
            {/*<Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">Bunny trailer</Button>*/}
            {/*<Button onClick={this.changeSource('bunnyMovie')} className="mr-3">Bunny movie</Button>*/}
            {/*<Button onClick={this.changeSource('test')} className="mr-3">Test movie</Button>*/}
          {/*</div>*/}
        {/*</Row>*/}

      </div>
    );
  }

}

export default VideoPlayer;
