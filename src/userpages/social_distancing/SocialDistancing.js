import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import './SocialDistancing.scss'
// import Content from './mk.md'

import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg'

class SocialDistancingComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="container">
                  <div className="imp-message">
                    <h1>{t('sd.jan_curfew_message')}</h1>
                    <span>22nd March 07:00 AM to 09:00 PM</span>
                  </div>
                  <div className="row">
                  <div className="col-md-8 info-box">
                      <h1>{t('sd.what_is_sd')}</h1>
                      <p>{t('sd.what_is_sd_ans')}</p>

                      <p>{t('sd.what_is_sd_ans-2')}</p>
                      <ul>
                        <li>{t('sd.what_is_sd_ans-2-opt1')}</li>
                        <li>{t('sd.what_is_sd_ans-2-opt2')}</li>
                        <li>{t('sd.what_is_sd_ans-2-opt3')}</li>
                        <li>{t('sd.what_is_sd_ans-2-opt4')}</li>
                      </ul>
                      <div className="source"><a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/coronavirus-social-distancing-and-self-quarantine" target="_blank">Johns Hopkins Medicine</a></div>
                    </div>
                    <div className="col-md-4 image-box">
                      <iframe className="social-dis-video" title="Information WHO" src="https://www.youtube.com/embed/53R4wbhrrLA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      {/* <img className="minor-image" src={socialDistancing} alt="Handwash"/> */}
                    </div>
                  </div>
                  
                  <div className="info-box extra-margin-top">

                    
                    <h1>How does Ministry of Health, India defines it?</h1>
                    <p>
                      Social distancing is a non-pharmaceutical infection prevention and control intervention
                      implemented to avoid/decrease contact between those who are infected with a disease causing
                      pathogen and those who are not, so as to stop or slow down the rate and extent of disease
                      transmission in a community. This eventually leads to decrease in spread, morbidity and
                      mortality due to the disease.
                    </p>
                    <iframe className="social-dis-video" title="Information WHO" src={t('sd.resources.what_is_video')} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  
                </div>
            </>
        );
    }
}

const SocialDistancingTrans = withTranslation()(SocialDistancingComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function SocialDistancing() {
  return (
    <Suspense fallback="loading">
      <SocialDistancingTrans />
    </Suspense>
  );
}
