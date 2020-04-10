import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'

import './Home.scss'
// import Content from './mk.md'

import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg'

class HomeComponent extends React.Component {


    /* constructor(props) {
        super(props)
    } */

    render() {
        const { t } = this.props;

        let data = {}
        if(this.props.data !== undefined) {
            data = this.props.data
        }
        let updateDate = new Date(data.timestamp*1000)
        
        return (
            <>
                <div className="container">
                    <CurfewMessage/>
                    
                    <div className="stats-container">
                        
                        <p className="update-date">Updated at: {updateDate.toLocaleString()}</p>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="stats-box active">
                                    <span className="title">Active Cases</span>
                                    <span className="number">{data.activePositiveCases || '-'}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stats-box cured">
                                    <span className="title">Cured Cases</span>
                                    <span className="number">{data.curedCases || '-'}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stats-box death">
                                    <span className="title">Deaths</span>
                                    <span className="number">{data.deathCases || '-'}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stats-box others">
                                    <span className="title">Total Cases</span>
                                    <span className="number">{data.totalPositiveCases || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <p className="other-cases">Other Cases: {data.otherCases}</p>
                        <div className="source"><a href="https://www.mohfw.gov.in/" rel="noopener noreferrer" target="_blank">Ministry of Health and Family Welfare</a></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <iframe className="embed-video" title="Information WHO" src={t('home.resources.who')} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="col-md-6 info-box">
                            <h2>{t('home.what_is_corona')}</h2>
                            {t('home.what_is_corona_answer')} <code>{t('home.what_is_corona_punch')}</code>
                            <div className="source"><a href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses" rel="noopener noreferrer" target="_blank">World Health Organization</a></div>
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
export default function Home(props) {
    return (
        <Suspense fallback="loading">
        <HomeTrans data={props.data}/>
        </Suspense>
    );
}
