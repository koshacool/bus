import React from 'react';
import PropTypes from 'prop-types';
import {Row, Input, Icon, Button} from 'react-materialize';


class Auth extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container vertical-center">
        <form action="/auth"  method="post" className="container">
          <Row>
            <Input s={12} label="email" name="email" validate><Icon>account_circle</Icon></Input>
          </Row>

          <Row>
            <Input s={12} label="password" name="password" type="password" validate><Icon>remove_red_eye</Icon></Input>
          </Row>

          <Button waves='light' className="btn full-width">submit</Button>
        </form>
      </div>
    );
  }

}

export default Auth;