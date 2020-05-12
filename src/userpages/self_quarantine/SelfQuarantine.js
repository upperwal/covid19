import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'

//import './SelfQuarantine.scss'

class SelfQuarantineComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="container">
                  <CurfewMessage/>
                  <div className="row">
                  <div className="col-md-12 info-box">
                      <h1>{t('sq.what_is_sq')}</h1>
                      <p>{t('sq.what_is_sq_ans')}</p>

                      <p>{t('sq.what_is_sq_ans-2')}</p>

                      <p>{t('sq.involves')}</p>
                      <ul>
                        <li>{t('sq.involves-1')}</li>
                        <li>{t('sq.involves-2')}</li>
                        <li>{t('sq.involves-3')}</li>
                        <li>{t('sq.involves-4')}</li>
                        <li>{t('sq.involves-5')}</li>
                      </ul>
                      <div className="source"><a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/coronavirus-social-distancing-and-self-quarantine" rel="noopener noreferrer" target="_blank">Johns Hopkins Medicine</a></div>
                    </div>
                  </div>
                  
                  {/* <div className="info-box extra-margin-top">

                    
                    <h1>How does Ministry of Health, India defines it?</h1>
                    <p>
                      Social distancing is a non-pharmaceutical infection prevention and control intervention
                      implemented to avoid/decrease contact between those who are infected with a disease causing
                      pathogen and those who are not, so as to stop or slow down the rate and extent of disease
                      transmission in a community. This eventually leads to decrease in spread, morbidity and
                      mortality due to the disease.
                    </p>
                    <iframe className="social-dis-video" title="Information WHO" src={t('sd.resources.what_is_video')} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div> */}

                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        
                    </div>
                  </div>
                  
                </div>
            </>
        );
    }
}

const SelfQuarantineTrans = withTranslation()(SelfQuarantineComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function SelfQuarantine() {
  return (
    <Suspense fallback="loading">
      <SelfQuarantineTrans />
    </Suspense>
  );
}
