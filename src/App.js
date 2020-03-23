import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import './App.scss';


import Home from './userpages/home/Home'
import SD from './userpages/social_distancing/SocialDistancing'
import SQ from './userpages/self_quarantine/SelfQuarantine'
import Myths from './userpages/myths/Myths'
import Simulation from './userpages/simulation/Simulation'

import Header from './views/header/Header'

function App() {
  return (
    <div className="App">
      
      <Router basename='/'>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sd" component={SD} />
          <Route path="/sq" component={SQ} />
          <Route path="/myths" component={Myths} />
          <Route path="/simulation" component={Simulation} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
