import React from 'react';
import PropTypes from 'prop-types';
import {Row, Input} from 'react-materialize';
import {defaultKeys} from '../params';

import Key from './Key';

class Keys extends React.Component {
  constructor() {
    super();

    this.state = {
      hotKeys: defaultKeys,
    };

    this.renderKeys = this.renderKeys.bind(this);
  }

  componentDidMount() {
    // Get keys from DB
  }

  renderKeys() {
    const {hotKeys} = this.state;
    const actions = Object.keys(hotKeys);

    return actions.map(action => (
      <Key key={hotKeys[action].code} actionObj={hotKeys[action]}/>
    ));
  }


  render() {

    return (
      <div className="container key__list">
        {this.renderKeys()}
      </div>
    );
  }
}


export default Keys;
