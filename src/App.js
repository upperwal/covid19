import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import './App.scss';


import Home from './userpages/home/Home'
import SD from './userpages/social_distancing/SocialDistancing'
import SQ from './userpages/self_quarantine/SelfQuarantine'
import Myths from './userpages/myths/Myths'
import Simulation from './userpages/simulation/Simulation'
import Funds from './userpages/funds/Funds'
import Volunteer from './userpages/volunteer/Volunteer'
import Stories from './userpages/stories/Stories'
import Us from './userpages/us/Us'
import MapDistrict from './userpages/map/MapDistrict'

import Header from './views/header/Header'
import Footer from './views/footer/Footer'

import Data from './utils/Data'

class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			data: {}
		}
	}

  	componentDidMount() {
		let डेटा = new Data()
		डेटा.latest().then(d => {
			console.log(d)
			this.setState({
				data: d
			})
		})
	}

  	render() {
		  return (
			<div className="App">
			
				<Router basename='/'>
					<Header/>
					<Switch>
						<Route exact 
							path="/" 
							render={(props) => <Home {...props} data={this.state.data.india} /> }
						/>
						<Route path="/sd" component={SD} />
						<Route path="/sq" component={SQ} />
						<Route path="/myths" component={Myths} />
						<Route path="/simulation" component={Simulation} />
						<Route path="/funds" component={Funds} />
						<Route path="/volunteer" component={Volunteer} />
						<Route path="/stories" component={Stories} />
						<Route path="/us" component={Us} />
						<Route 
							path="/map" 
							render={(props) => <MapDistrict {...props} data={this.state.data}/>}
						/>
					</Switch>
					<Footer/>
				</Router>
			</div>
		);
	}
}

export default App;
