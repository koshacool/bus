import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiPrefix } from '../../../etc/config.json';
import handleErrors from '../../utils/handleErrors';
import { authorization } from '../../api/index';

import { Row, Input, Icon, Button } from 'react-materialize';


class SignInPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.authorization = this.authorization.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  authorization(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { router } = this.props;

    authorization(email, password)
      .then(res => {
        console.log(res);
        sessionStorage.setItem('token', res.data.token);
      })
      .then(() => router.push('/'))
      .catch(e => handleErrors(e));

  }


  render() {
    const { email, password } = this.state;

    return (
      <div className="container vertical-center">
        <form onSubmit={this.authorization} className="container">

          <Row>
            <Input
              s={12}
              label="email"
              name="email"
              validate
              required
              id="email"
              value={email}
              onChange={this.onChangeInput('email')}
            >
              <Icon>account_circle</Icon>
            </Input>
          </Row>

          <Row>
            <Input
              s={12}
              label="password"
              name="password"
              type="password"
              validate
              required
              id="password"
              value={password}
              onChange={this.onChangeInput('password')}
            >
              <Icon>remove_red_eye</Icon>
            </Input>
          </Row>

          <div className="full-width">
            <Button waves="light" className="btn halfWidth">submit</Button>
          </div>
        </form>
      </div>
    );
  }


}

export default SignInPage;
