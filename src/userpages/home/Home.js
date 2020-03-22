import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

/* import UserEngagementForm from '../../views/UserEngagementForm'
import CityGraphics from '../../views/CityGraphics/CityGraphics'
import MarkdownContent from '../../views/MarkdownContent' */

import './Home.scss'
// import Content from './mk.md'

import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg'

class HomeComponent extends React.Component {

    render() {
        const { t } = this.props;
        
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <iframe className="embed-video" title="Information WHO" src={t('home.resources.who')} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="col-md-6 info-box">
                            <h2>{t('home.what_is_corona')}</h2>
                            {t('home.what_is_corona_answer')} <code>{t('home.what_is_corona_punch')}</code>
                        </div>
                    </div>
                    <div className="prevent-box">
                        <h1>{t('home.how_to_prevent_infection')}</h1>
                        <div className="row">
                            <div className="col-md-4">
                                <img className="minor-image" src={handwash} alt="Handwash"/>
                                <h3>{t('home.handwash')}</h3>
                            </div>
                            <div className="col-md-4">
                                <img className="minor-image" src={coverFace} alt="cover your face"/>
                                <h3>{t('home.cover_face')}</h3>
                            </div>
                            <div className="col-md-4">
                                <img className="minor-image" src={dTouchFace} alt="Handwash"/>
                                <h3>{t('home.dont_touch_face')}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img className="minor-image" src={handRub} alt="Handwash"/>
                                <h3>{t('home.handrub')}</h3>
                            </div>
                            <div className="col-md-4">
                                <img className="minor-image" src={socialDistancing} alt="Handwash"/>
                                <h3>{t('home.social_distancing')}</h3>
                            </div>
                            <div className="col-md-4">
                                <img className="minor-image" src={faceMask} alt="Handwash"/>
                                <h3>{t('home.mask')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                {/* <UserEngagementForm/>
                <CityGraphics/>
                <MarkdownContent className="content" text={Content} /> */}
            </>
        );
    }
}

const HomeTrans = withTranslation()(HomeComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Home() {
  return (
    <Suspense fallback="loading">
      <HomeTrans />
    </Suspense>
  );
}
