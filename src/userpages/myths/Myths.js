import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'

import './Myths.scss'

class MythsComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="container">
                    <CurfewMessage/>
                    <div className="row myths">
                        <div className="col-md-6 info-box">
                            <h2>Cold weather and snow CANNOT kill the CoronaVirus</h2>
                            <h2>Hand dryers are NOT effective in killing the CoronaVirus.</h2>
                        </div>
                        <div className="col-md-6 info-box">
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const MythsTrans = withTranslation()(MythsComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Myths() {
  return (
    <Suspense fallback="loading">
      <MythsTrans />
    </Suspense>
  );
}
