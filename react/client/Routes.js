import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import AppLayout from './layouts/AppLayout';
import SignInPage from './pages/auth/SignInPage';

import Admin from './pages/admin/Admin';
import Users from './pages/admin/users/Users';

const publicRoutes = ['/', '/sign-in'];
const commonRoutes = ['/not-found'];


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <IndexRoute component={AppLayout}/>
      <Route path="sign-in" component={SignInPage}/>
    </Route>


    <Route path="/admin" component={Admin}>
      <IndexRoute component={Users}/>

      <Route path="users" component={Users}/>
      {/*<Route path="stops" component={BusStop}/>*/}
      {/*<Route path="routes" component={BusRoutes}/>*/}
      {/*<Route path="firms" component={Firms}/>*/}
      {/*<Route path="buses" component={Buses}/>*/}
    </Route>

  </Router>
);

export default renderRoutes;
