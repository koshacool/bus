import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Spinner from '../components/spiner/Spinner';
import SiteFooter from './SiteFooter';
import Header from './Header';

import {checkUserToken} from '../api/index';
import handleErrors from '../utils/handleErrors';

const ALERTS_LIMIT = 5;

const isCurrentRouteOneOf = (router, routes) => routes.some(publicRoute => router.isActive({
  pathname: publicRoute,
}, true));

const redirectTo = (router, pathname) => {
  if (!router.isActive(pathname, true)) {
    router.push(pathname);
  }
};

/**
 * Class for show different header for
 * logged users and not logged. And display
 * content
 */
class AppLayout extends React.Component {

  constructor(props) {
    super(props);

    this.checkAuthRoutes = this.checkAuthRoutes.bind(this);
  }


  componentDidMount() {
    this.checkAuthRoutes(this.props);
  }

  componentWillUpdate(nextProps) {
    this.checkAuthRoutes(nextProps);
  }

  checkAuthRoutes(newProps) {
    const {router, route} = newProps;
    const {publicRoutes, commonRoutes} = route;

    const token = sessionStorage.getItem('token');

    if (token == 'null' || token == 'undefined') {
      redirectTo(router, '/sign-in');
      return;
    }
    this.checkToken(newProps);

  }

  checkToken(props) {
    const {router, route} = props;
    const {publicRoutes, commonRoutes} = route;

    checkUserToken()
      .then(res => {
        if (res.data.status === 'error') {
          sessionStorage.setItem('token', null);
          handleErrors(res);
          redirectTo(router, '/sign-in');
        } else if (res.data.status === 'ok') {
          sessionStorage.setItem('token', res.data.token);
          console.log(res.data)

          const isLoggedIn = true;
          const isCommonRoute = isCurrentRouteOneOf(router, commonRoutes);

          if (!isCommonRoute) {
            const isPublicRoute = isCurrentRouteOneOf(router, publicRoutes);

            if (!isPublicRoute && !isLoggedIn) {
              redirectTo(router, '/sign-in');
            }
          }
        }

      })
      .catch(e => handleErrors(e));
  }


  render() {
    const {children, router} = this.props;

    return (
      <div className="wrapper">


        <Header push={router.push}/>

        <main className="grey lighten-3">
          <div className="content">
            {children}
          </div>
        </main>

        <SiteFooter/>


        <Alert stack={{limit: ALERTS_LIMIT}}/>

      </div>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default AppLayout;

