import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import {Pie} from 'react-chartjs-2';

import CurfewMessage from '../../views/CurfewMessage'

import './Home.scss'
// import Content from './mk.md'

import stateColour from './state_code_to_colour.json'
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

    changeValue(val) {
        if(val > 0) {
            return '+' + val
        } else {
            return val
        }
    }

    // getRandomInt(min, max){
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }


    mostAffectedView(statesList, stateCodeNameMap, theme, label) {
        if(statesList === undefined) {
            return ''
        }
        let res = []
        res.push(<label key='label'>{label}</label>)
        statesList.forEach((s, idx) => {
            res.push(
                <div key={idx} className={'name-value-container theme-' + theme}>
                    <span className="value">{s[1]}</span>
                    <span className="name">{stateCodeNameMap[s[0]]}</span>
                </div>
            )
        })
        
        return res
    }

    updatesView(mostAffected, stateCodeNameMap, dataDiff, indiaStats, worldStats, diffTimestamp, recoveryPath, worstHit) {
        if(mostAffected === undefined) {
            return ''
        }
        let worldActive = worldStats.totalPositiveCases - worldStats.curedCases - worldStats.deathCases
        let perActive = (indiaStats.activePositiveCases/indiaStats.totalPositiveCases*100).toFixed(2)
        let perCured = (indiaStats.curedCases/indiaStats.totalPositiveCases*100).toFixed(2)
        let perDead = (indiaStats.deathCases/indiaStats.totalPositiveCases*100).toFixed(2)
        let rateTimePerCase = (dataDiff.timestamp/3600)/dataDiff.india.totalPositiveCases
        let doublingRate = (rateTimePerCase*indiaStats.totalPositiveCases/24).toFixed(1)
        let cureDeathRatio = (indiaStats.curedCases/indiaStats.deathCases).toFixed(1)
        let cureDeathRatioWorld = (worldStats.curedCases/worldStats.deathCases).toFixed(1)
        console.log(mostAffected, stateCodeNameMap, dataDiff, indiaStats, worldStats, recoveryPath, worstHit)

        let recoveryPathView = []
        recoveryPath.forEach((s, idx) => {
            if((recoveryPath.length!==1) && (idx === recoveryPath.length - 1)){
                recoveryPathView.push(<span key="and">{' and '}</span>)
            }/*  else {
                recoveryPathView.push(<span key={'comma-' + idx}>{', '}</span>)
            } */
            recoveryPathView.push(
                <div key={idx} className={'name-value-container theme-blue'}>
                    <span className="value">{s.activePositiveCases}</span>
                    <span className="name">{stateCodeNameMap[s.state_code]}</span>
                </div>
            )
            //recoveryPathView.push(<span key={idx}><span key={idx} className="highlight-test-red">{stateCodeNameMap[s]}</span> <span className="highlight highlight-inverted-red highlight-bold">{dataDiff[s].activePositiveCases}</span></span>)
            
        })

        let worstHitView = []
        worstHit.forEach((s, idx) => {
            if((worstHit.length!==1) && (idx === worstHit.length - 1)){
                worstHitView.push(<span key="and">{' and '}</span>)
            }/*  else {
                recoveryPathView.push(<span key={'comma-' + idx}>{', '}</span>)
            } */
            worstHitView.push(
                <div key={idx} className={'name-value-container theme-red'}>
                    <span className="value">{s.activePositiveCases}</span>
                    <span className="name">{stateCodeNameMap[s.state_code]}</span>
                </div>
            )
            //recoveryPathView.push(<span key={idx}><span key={idx} className="highlight-test-red">{stateCodeNameMap[s]}</span> <span className="highlight highlight-inverted-red highlight-bold">{dataDiff[s].activePositiveCases}</span></span>)
            
        })

        return (
            <>
                <div className="heading">
                    <h3 className="highlight-bold">Updates from the past {(diffTimestamp / (3600)).toFixed(0)} hours</h3>
                </div>
                <ul>
                    <li>
                        <span className="highlight-test-red">{stateCodeNameMap[mostAffected[0][0]]}</span> is the worst affected state with <span className="highlight-test-red">{mostAffected[0][1]} active cases</span> and an <span className="highlight highlight-red highlight-bold">increase of {dataDiff[mostAffected[0][0]].activePositiveCases}</span> cases in the <span className="highlight highlight-red highlight-bold">past {(diffTimestamp / (3600)).toFixed(0)} hours.</span>
                    </li>
                    <li>
                        States like {recoveryPathView} have shown reduction in active cases and hopefully are on a path to normality.
                    </li>
                    <li>
                        {worstHitView} have shown the highest increment in the active cases in the past {(diffTimestamp / (3600)).toFixed(0)} hours.
                    </li>
                    <li>India till date has <span className="highlight-test-red">{indiaStats.activePositiveCases} active cases</span> which is <span className="highlight highlight-red highlight-bold">{(indiaStats.activePositiveCases/worldActive*100).toFixed(2)} % of the worldwide active cases.</span></li>
                    <li>
                        Out of the total infected, <span className="highlight-test-red">{perActive} % are active cases</span>, <span className="highlight highlight-blue highlight-bold">{perCured} % people are cured</span> and <span className="highlight-test-red">{perDead} % people have died.</span>
                    </li>
                    <li>
                        Infected cases in India are <span className="highlight highlight-red highlight-bold">doubling every {doublingRate} days</span> with <span className="highlight-test-red">{(1/rateTimePerCase).toFixed(0)} people getting identified every hour.</span>
                    </li>
                    <li>
                        India currently has <span className="highlight highlight-red highlight-bold">{cureDeathRatio} cure to death ratio</span> as compared to <span className="highlight-test-red">{cureDeathRatioWorld} worldwide.</span>
                    </li>
                </ul>
            </>
        )
    }

    
    radar(latestStats, stateCodeNameMap) {

        let pieData1 = {
            'labels': [],
            'datasets': [
                {
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }
            ]
        }
        let pieData2 = {
            'labels': [],
            'datasets': [
                {
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }
            ]
        }
        let sortedData =[]
        Object.keys(latestStats).forEach(state => {
            sortedData.push({
                'id': state,
                'value': latestStats[state]['totalPositiveCases'] || 0
            })
        })
        sortedData.sort((a,b) => {
            return b.value - a.value
        })
        for(let i=0; i<8; ++i){
            pieData1['labels'].push(stateCodeNameMap[sortedData[i]['id']])
            pieData1['datasets'][0]['data'].push(sortedData[i]['value'])
            pieData1['datasets'][0]['backgroundColor'].push(stateColour[sortedData[i]['id']])
            pieData1['datasets'][0]['hoverBackgroundColor'].push(stateColour[sortedData[i]['id']])
        }

        sortedData =[]
        Object.keys(latestStats).forEach(state => {
            sortedData.push({
                'id': state,
                'value': latestStats[state]['activePositiveCases'] || 0
            })
        })
        sortedData.sort((a,b) => {
            return b.value - a.value
        })
        for(let i=0; i<8; ++i){
            pieData2['labels'].push(stateCodeNameMap[sortedData[i]['id']])
            pieData2['datasets'][0]['data'].push(sortedData[i]['value'])
            pieData2['datasets'][0]['backgroundColor'].push(stateColour[sortedData[i]['id']])
            pieData2['datasets'][0]['hoverBackgroundColor'].push(stateColour[sortedData[i]['id']])
        }

        let radarReturnArray = []
        radarReturnArray.push(pieData1)
        radarReturnArray.push(pieData2)
    
        return radarReturnArray
    }

    render() {
        const { t } = this.props;

        let data = {}
        let diffData = {}
        let diffCountry = {}
        let diffTimestamp;
        let affectedStates = {};
        let stateCodeNameMap;
        let worldStats = {};
        let recoveryPath = {};
        let worstHit={};
        let latestStats = {}
        let pie1 = {}
        let pie2 = {}
        //let statesStats;
        
        if(this.props.data.timestamp !== undefined) {
            console.log(this.props.data)
            data = {
                timestamp: this.props.data.timestamp,
                ...this.props.data.countryStats
            }
            diffData = this.props.data.diffStats
            diffCountry = this.props.data.diffStats.india
            diffTimestamp = this.props.data.diffStats.timestamp + ((Date.now()/1000) - this.props.data.timestamp)
            affectedStates = {
                worstAffectedStates: this.props.data.worstAffectedStates,
                leastAffectStates: this.props.data.leastAffectStates
            }
            stateCodeNameMap = this.props.data.stateCode
            worldStats = this.props.data.worldData
            recoveryPath = this.props.data.improved
            worstHit = this.props.data.worstHit
            latestStats = this.props.data.statesStats

            console.log(stateCodeNameMap)
            pie1= this.radar(latestStats, stateCodeNameMap)[0]
            pie2= this.radar(latestStats, stateCodeNameMap)[1]
            
            
            //statesStats = this.props.data.statesStats
        }
        let updateDate = new Date(data.timestamp*1000)

        
        return (
            <>
                <div className="container">
                    <CurfewMessage/>
                    
                    <div className="stats-container">
                        
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
                        {/* <div className="col-md-4">
                            <h4>PIE </h4>
                            <Pie data={pie1} />
                        </div> */}
                    </div>

                    {/* <ChartRace 
                        data={[
                            { id: '0', title: 'Ayfonkarahisar', value: this.getRandomInt(10, 500), color: '#50c4fe' },
                            { id: 1, title: 'Kayseri', value: this.getRandomInt(10, 500), color: '#3fc42d' },
                            { id: 2, title: 'Muğla', value: this.getRandomInt(10, 500), color: '#c33178' },
                            { id: 3, title: 'Uşak', value: this.getRandomInt(10, 500), color: '#423bce' },
                            { id: 4, title: 'Sivas', value: this.getRandomInt(10, 500), color: '#c8303b' },
                            { id: 5, title: 'Konya', value: this.getRandomInt(10, 500), color: '#2c2c2c' }
                        ]}
                        backgroundColor="#fffffff8"
                        width = "700"
                        valueStyle={{ font: 'normal 400 11px Arial', color: '#FF0000' }}
                    /> */}

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
