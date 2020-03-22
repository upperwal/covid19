import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import './App.scss';


import Home from './userpages/home/Home'
import SD from './userpages/social_distancing/SocialDistancing'

import Header from './views/header/Header'

function App() {
  return (
    <div className="App">
      
      <Router basename='/'>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sd" component={SD} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
