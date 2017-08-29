import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spiner/Spinner';
import SiteFooter from './SiteFooter';
import Header from './Header';


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
          <Header/>

          <main className="grey lighten-3">
            <div className="content">
              {!loading && children}
            </div>
          </main>

          <SiteFooter/>
        </Spinner>
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

