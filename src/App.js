import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import './App.scss';


import Home from './userpages/home/Home'
import SD from './userpages/social_distancing/SocialDistancing'

import Header from './views/header/Header'

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/covid19" component={Home} />
          <Route exact path="/covid19/sd" component={SD} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
