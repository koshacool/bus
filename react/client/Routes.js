import React from 'react';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import Auth from './components/auth/Auth';
import AppLayout from './components/layouts/AppLayout';
import Home from './components/Home';
import PhotosList from './components/photos/PhotosList';
import Wedding from './components/photos/Wedding';
import LoveStory from './components/photos/LoveStory';
import Children from './components/photos/Children';
import Photosession from './components/photos/Photosession';
import PhotosessionPhotos from './components/photos/PhotosessionPhotos';

import Admin from './components/admin/Admin';
import Users from './components/admin/users/Users';



const renderRoutes = () => (
  <Router history={browserHistory} token="test">

    <Route path="/" component={AppLayout}>
      <IndexRoute component={Home}/>

      <Route path="/auth" component={Auth} />

      <Route path="photos" component={PhotosList}/>
      <Route path="wedding" component={Wedding}/>
      <Route path="lovestory" component={LoveStory}/>
      <Route path="children" component={Children}/>
      <Route path="photosession" component={Photosession}/>
      <Route path="photosession/:_id" component={PhotosessionPhotos} />
    </Route>

    <Route path="/admin" component={Admin}>
      <IndexRoute component={Users} />

      <Route path="users" component={Users}/>
      {/*<Route path="stops" component={BusStop}/>*/}
      {/*<Route path="routes" component={BusRoutes}/>*/}
      {/*<Route path="firms" component={Firms}/>*/}
      {/*<Route path="buses" component={Buses}/>*/}
    </Route>
  </Router >
);

export default renderRoutes;
