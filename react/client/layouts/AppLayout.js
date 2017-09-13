import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Spinner from '../components/spiner/Spinner';
import SiteFooter from './SiteFooter';
import AuthNavigation from './Header/AuthNavigation';
import PublicNavigation from './Header/PublicNavigation';

import {checkUserToken} from '../api/index';
import {onError} from '../utils/handleResponse';

const ALERTS_LIMIT = 5;


/**
 * Check if one of array's routes is active now.
 *
 * @param {object} router React router object
 * @param {array} routes Array with routes
 *
 * @return {boolean}
 */
const isCurrentRouteOneOf = (router, routes) =>
  routes.some(route => router.isActive({ pathname: route }, true));


/**
 * Check active url with new url.
 * If it isn't the same path - redirect. *
 *
 * @param {object} router React router object
 * @param {string} pathname Url to redirect
 *
 * @return {void}
 */
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

    this.state = {
      isLogged: false,
      role: '',
      isPublicRoute: true,
    };

    this.checkAuthRoutes = this.checkAuthRoutes.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount() {
    this.checkAuthRoutes(this.props);
  }

  componentWillUpdate(nextProps) {
    this.checkAuthRoutes(nextProps);
  }


  logout() {
    const {router} = this.props;

    sessionStorage.setItem('token', null);
    sessionStorage.setItem('role', null);

    this.setState({
      isLogged: false,
      role: '',
      isPublicRoute: true,
    });

    redirectTo(router, '/sign-in');
  }

  checkAuthRoutes({router, route}) {
    const {publicRoutes, commonRoutes} = route;
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const isLoggedIn = this.isLoggedIn(token);
    const isCommonRoute = isCurrentRouteOneOf(router, commonRoutes);
    const isPublicRoute = isCurrentRouteOneOf(router, publicRoutes);

    if (!isCommonRoute && !isPublicRoute) {
      if (!isLoggedIn) {
        this.logout();
        return;
      }

      this.checkToken(router, token);
    }
  }

  checkToken(router, token) {
    checkUserToken(token)
      .then(res => {
        if (res.data.status === 'error') {
          onError(res);
          this.logout();
          return;
        }

        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('role', res.data.role.name);

        return res;
      })
      .then(res => {
        if (!this.state.isLogged) {
          this.setState({
            isLogged: true,
            role: res.data.role.name,
            isPublicRoute: false,
          });
          redirectTo(router, `/${res.data.role.name}`);
        }
      })
      .catch(e => {
        this.logout();
        onError(e);
      });
  }

  isLoggedIn(token) {
    if (!token) {
      return false;
    }

    return true;
  }

  render() {
    const {children, router} = this.props;
    const {isLogged, role, isPublicRoute} = this.state;

    return (
      <div className="wrapper">

        {
          isLogged ?
            <AuthNavigation logout={this.logout} role={role}/>
            :
            <PublicNavigation logout={this.logout} role={role}/>
        }

        <main className="grey lighten-3">
          <div className="content">
            {(isPublicRoute || isLogged) && children}
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
  router: PropTypes.object.isRequired,
};


export default AppLayout;

