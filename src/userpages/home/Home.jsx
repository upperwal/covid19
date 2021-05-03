import React, { useState, Suspense } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import {Pie} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import CurfewMessage from '../../views/CurfewMessage';
import LocationServices from '../../utils/LocationServices';

import './Home.scss'
// import Content from './mk.md'

import CovidIcon from './coronavirus.svg';
import stateColour from './state_code_to_colour.json'
import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg'

function HomeComponent(props) {
    const searchOptions = [
        { title: 'Oxygen Cylinder', short: 'O2'},
        { title: 'ICU Bed', short: 'I'},
        { title: 'Ventilator Bed', short: 'V'}
    ]

        
    var chipArr = []
    searchOptions.forEach((s, idx) => {
        chipArr.push(
            <Link key={idx} to={'/list/' + s.title}>
                <Chip avatar={<Avatar>{s.short}</Avatar>} label={s.title} onClick={() => {}} />
            </Link>
        )
    })
    let district = 'Identifying...';
    if(props.data.locationState.district != undefined) {
        district = props.data.locationState.district;
    }


    return (
        <section className="Home">
            <div className="container">
                {/* <CurfewMessage/> */}

                <img src={CovidIcon} alt=""/>

                <div className="seek-container">
                    <h1 className="seek-message">I am looking for </h1>
                    <Autocomplete
                        id="seek-input"
                        options={searchOptions}
                        getOptionLabel={(option) => option.title}
                        style={{}}
                        renderInput={(params) => <TextField {...params} fullWidth={true} placeholder="Start typing for suggestions" required={true} label="" variant="outlined" />}
                    />
                    <div className="chip-container">
                        {chipArr}
                    </div>
                </div>

                <div className="location-identification-container">
                    <p>We need your location to give you good search results. You location is neither saved or shared with anyone.</p>
                    {/* <p>Your District: </p> */}
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<MyLocationIcon />}
                        label={district}
                        color="primary"
                    />
                </div>
                
                
                {/* <div className="stats-container">
                    
                    <p className="update-date">Updated at: {updateDate.toLocaleString()} [changes since {(diffTimestamp / (3600)).toFixed(1)} hours]</p>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="stats-box active">
                                <span className="title">Active Cases</span>
                                <span className="number">{data.activePositiveCases || '-'}
                                    <span className="change-in-value"> [{this.changeValue(diffCountry.activePositiveCases)}]</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stats-box cured">
                                <span className="title">Cured Cases</span>
                                <span className="number">{data.curedCases || '-'}
                                    <span className="change-in-value"> [{this.changeValue(diffCountry.curedCases)}]</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stats-box death">
                                <span className="title">Deaths</span>
                                <span className="number">{data.deathCases || '-'}
                                    <span className="change-in-value"> [{this.changeValue(diffCountry.deathCases)}]</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stats-box others">
                                <span className="title">Total Cases</span>
                                <span className="number">{data.totalPositiveCases || '-'}
                                    <span className="change-in-value"> [{this.changeValue(diffCountry.totalPositiveCases)}]</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="other-cases">Other Cases: {data.otherCases}</p>
                    <div className="source"><a href="https://www.mohfw.gov.in/" rel="noopener noreferrer" target="_blank">Ministry of Health and Family Welfare</a></div>
                    
                </div>

                <div className="summary">
                    <div className="affected-region">
                        {this.mostAffectedView(affectedStates.leastAffectStates, stateCodeNameMap, 'blue', 'Least Affected States (Active  Cases)')}
                        <br/>
                        {this.mostAffectedView(affectedStates.worstAffectedStates, stateCodeNameMap, 'red', 'Most Affected States (Active  Cases)')}
                    </div>
                    <hr/>
                    {this.updatesView(
                        affectedStates.worstAffectedStates, 
                        stateCodeNameMap,
                        diffData,
                        data,
                        worldStats,
                        diffTimestamp,
                        recoveryPath,
                        worstHit
                    )}
                </div>

                <div className="row stats-viz">
                    <div className="col-md-6 viz-chart">
                        <h4 className="center">Total Cases </h4>
                        <h6 className="center"> 8 States with most cases </h6>
                        <Pie data={pie1} />
                    </div>
                    <div className="col-md-6 viz-chart">
                        <h4 className="center">Active Positive Cases</h4>
                        <h6 className="center"> 8 States with most cases </h6>
                        <Pie data={pie2} />
                    </div>
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
                </div> */}
            </div>
            
        </section>
    );
}

const HomeTrans = withTranslation()(HomeComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Home(props) {
    console.log(props)
    return (
        <Suspense fallback="loading">
        <HomeTrans data={props}/>
        </Suspense>
    );
}
