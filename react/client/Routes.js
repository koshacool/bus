import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import AppLayout from './layouts/AppLayout';
import SignInPage from './pages/auth/SignInPage';

import Admin from './pages/admin/Admin';
import Users from './pages/admin/users/Users';
import BusStops from './pages/admin/stops/BusStops';

import Video from './pages/operator/video/Video';

const publicRoutes = ['/sign-in'];
const commonRoutes = ['/not-found'];


const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path="/" component={AppLayout} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <IndexRoute component={SignInPage} />
      <Route path="sign-in" component={SignInPage} />

      <Route path="admin">
        <IndexRoute component={Users} />
        <Route path="users" component={Users} />
        <Route path="stops" component={BusStops} />
      </Route>

      <Route path="operator">
        <IndexRoute component={Video} />
        <Route path="video" component={Video} />
      </Route>

    </Route>


  </Router>
);

export default renderRoutes;
