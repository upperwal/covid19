import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'
import SimulationView from '../../views/sim/Simulation'

import './Simulation.scss'

class SimulationComponent extends React.Component {

    render() {
        //const { t } = this.props;
        
        return (
            <>
                <div className="container">
                    <CurfewMessage/>
                    <div className="row">
                        <div className="col-md-6 right-border">
                            <h2>Without Social Distancing</h2>
                            <SimulationView motion_percentage={99}/>
                        </div>
                        <div className="col-md-6">
                            <h2>With Social Distancing</h2>
                            <SimulationView motion_percentage={10}/>
                        </div>
                    </div>
                    <span>Inspiration: <a href="https://www.washingtonpost.com/graphics/2020/world/corona-simulator/?fbclid=IwAR1oRYsEvnJgLsvfkAz5QVz1wsA7NBeTWPvPCuW_RLiS6Wj_SWU2WLHHzR4&utm_campaign=wp_main&utm_medium=social&utm_source=facebook" target="_blank" rel="noopener noreferrer">Washington Post </a></span><br/>
                    <span>Code: github/@midudev</span>
                </div>
            </>
        );
    }
}

const SimulationTrans = withTranslation()(SimulationComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Simulation() {
  return (
    <Suspense fallback="loading">
      <SimulationTrans />
    </Suspense>
  );
}
