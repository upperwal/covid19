import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'
import SimulationView from '../../views/sim/Simulation'

//import './Simulation.scss'

class SimulationComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="container">
                    <CurfewMessage/>
                    <div className="row">
                        <div className="col-md-6">
                            <SimulationView/>
                        </div>
                        <div className="col-md-6">
                            <SimulationView/>
                        </div>
                    </div>
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
