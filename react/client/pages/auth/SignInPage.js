import React from 'react';
import {Row, Input, Icon, Button} from 'react-materialize';

import {onError} from '../../utils/handleResponse';
import {authorization} from '../../api/index';


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
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('role', res.data.role.name);

        return res;
      })
      .then((res) => {
        setTimeout(router.push(`/${res.data.role.name}`), 100);
      })
      .catch(onError);

  }


  render() {
    const {email, password} = this.state;

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
