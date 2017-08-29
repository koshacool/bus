import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Spinner from '../spiner/Spinner';
import SiteFooter from './SiteFooter';
import Header from './Header';


const ALERTS_LIMIT = 5;

/**
 * Class for show different header for
 * logged users and not logged. And display
 * content
 */
class AppLayout extends React.Component {

  render() {
    const {loading, children, isLoggedIn} = this.props;

    return (
      <div className="wrapper">
        <Spinner loading={false}>

          <Header />

          <main className="grey lighten-3">
            <div className="content">
              {!loading && children}
            </div>
          </main>

          <SiteFooter />

        </Spinner>

        <Alert stack={{ limit: ALERTS_LIMIT }} />

      </div>
    );
  }
}


AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  //loading: PropTypes.bool.isRequired,
};


AppLayout.contextProps = {
  router: PropTypes.func.isRequired,
};

export default AppLayout;

