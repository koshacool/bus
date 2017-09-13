import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-materialize';

import AdminHeader from '../../layouts/Header/Admin';
import SiteFooter from '../../layouts/SiteFooter';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

const ALERTS_LIMIT = 5;

class Admin extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {children} = this.props;

    return (
      <div className="wrapper">

        <AdminHeader />

        <div className="content">
          {children}
        </div>

        <SiteFooter />

        <Alert stack={{ limit: ALERTS_LIMIT }} />

      </div>
    );
  }
}

Admin.propTypes = {
  children: PropTypes.node.isRequired
};

export default Admin;
