import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Spinner from '../components/spiner/Spinner';
import SiteFooter from './SiteFooter';
import Header from './Header';


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

    //Check exist user token
    const isLoggedIn = sessionStorage.getItem('token') != 'null';

    const isCommonRoute = isCurrentRouteOneOf(router, commonRoutes);

    if (!isCommonRoute) {
      const isPublicRoute = isCurrentRouteOneOf(router, publicRoutes);

      //If user logged redirect to base directory
      if (isPublicRoute && isLoggedIn) {
        redirectTo(router, '/');

        //If user isn't logged redirect to login page
      } else if (!isPublicRoute && !isLoggedIn) {
        redirectTo(router, '/sign-in');
      }
    }
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

