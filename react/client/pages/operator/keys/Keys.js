import React from 'react';
import { defaultKeys } from '../params';

import Key from './Key';

class Keys extends React.Component {
  constructor() {
    super();

    this.state = {
      hotKeys: defaultKeys,
      inEdding: '',
      actionName: '',
    };

    this.renderKeys = this.renderKeys.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  componentDidMount() {
    // Get keys from DB
  }

  onEdit(actionName, keyCode) {
    this.setState({inEdding: keyCode, actionName});
    document.addEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    if (!event.metaKey) {
      event.preventDefault();
    }

    const { inEdding } = this.state;
    const keyCode = event.keyCode || event.which;

    if (!inEdding) {
      return;
    }

    this.setState({ inEdding: '', actionName: '', hotKeys: this.changeActionKeys(keyCode) });
    document.removeEventListener('keydown', this.onKeydown);
  }

  changeActionKeys(keyCode) {
    const {hotKeys, inEdding, actionName} = this.state;
    const actions = Object.keys(hotKeys);

    if (keyCode != inEdding) {
      actions.map(action => {
        if (hotKeys[action].code == keyCode) {
          hotKeys[action].code = inEdding;
        }
      });

      hotKeys[actionName].code = `${keyCode}`;
    }

    return hotKeys;
  }

  renderKeys() {
    const { hotKeys, inEdding } = this.state;
    const actions = Object.keys(hotKeys);

    return actions.map(action => (
      <Key
        key={hotKeys[action].code}
        actionName={action}
        actionObj={hotKeys[action]}
        onEdit={this.onEdit}
        inEdding={inEdding}
      />
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
