import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import AppLayout from './layouts/AppLayout';
import SignInPage from './pages/auth/SignInPage';

// Admin components
import Users from './pages/admin/users/Users';
import BusStops from './pages/admin/stops/BusStops';

// Operator components
import Video from './pages/operator/video/Video';
import Keys from './pages/operator/keys/Keys';

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
        <IndexRoute component={Keys} />
        <Route path="video" component={Video} />
        <Route path="keys" component={Keys} />
      </Route>

    </Route>


  </Router>
);

export default renderRoutes;
