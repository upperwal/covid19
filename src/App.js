import React, { useEffect, useState } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import LocationServices from './utils/LocationServices';

import './App.scss';


import Home from './userpages/home/Home'
import MapList from './userpages/list/MapListPage'
import Fraud from './userpages/fraud/Fraud'
// import SD from './userpages/social_distancing/SocialDistancing'
// import SQ from './userpages/self_quarantine/SelfQuarantine'
// import Myths from './userpages/myths/Myths'
// import Simulation from './userpages/simulation/Simulation'
// import Funds from './userpages/funds/Funds'
// import Volunteer from './userpages/volunteer/Volunteer'
// import Stories from './userpages/stories/Stories'
// import Us from './userpages/us/Us'
// import MapDistrict from './userpages/map/MapDistrict'

import Header from './views/header/Header'
import Footer from './views/footer/Footer'

// import Data from './utils/Data'

function App() {

	let [locationState, setLocationState] = useState({})

  	useEffect(() => {
		let locationServices = new LocationServices()
        locationServices.getDistrict((res) => {
			setLocationState(res)
		})
	}, [])

  	return (
		<div className="App">
		
			<Router basename='/'>
				{/* <Header/> */}
				<Switch>
					{/* <Route exact 
						path="/" 
						render={(props) => <Home {...props} locationState={locationState}  /> }
					/>
					<Route 
						path="/list/:item"
						render={(props) => <MapList {...props} locationState={locationState}  /> }
					/> */}
					<Route 
						path="/"
						render={(props) => <Fraud {...props} locationState={locationState}  /> }
					/>
					<Route 
						path="/scam"
						render={(props) => <Fraud {...props} locationState={locationState}  /> }
					/>
					{/* <Route path="/sd" component={SD} />
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
					/> */}
				</Switch>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
