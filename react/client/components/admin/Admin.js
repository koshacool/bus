import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-materialize';

import AdminHeader from './AdminHeader';
import SiteFooter from '../layouts/SiteFooter';

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

      </div>
    );
  }
}

Admin.propTypes = {
  children: PropTypes.node.isRequired
};

export default Admin;
