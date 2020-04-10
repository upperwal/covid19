import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import ChoroplethMap from './Cholo';

import './MapDistrict.scss'

import state_code_to_name from './state_code_to_name.json'

class MapDistrictComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayDistrict: {
                name: 'South Delhi',
                stateCode: 'IN-DL'
            }
        }
    }

    /* extractData() {
        let res = {}
        let stateData = {}
        let max = 0
        covidData.item.countries[0].states.forEach(function(s) {
            stateData[s.code] = s.stats
            if(s.districts === undefined) {
                return
            }
            s.districts.forEach((d) => {
                res[d.code] = d.stats.activePositiveCases
                if(max < d.stats.activePositiveCases) {
                    max = d.stats.activePositiveCases
                }
            })
        })
        this.setState({
            mapData: res,
            mapDataStates: stateData,
            maxDistrictCount: max
        })
    } */

    /* componentWillMount() {
        this.extractData()
    } */

    hover(d) {
        this.setState({
            displayDistrict: {
                name: d.properties.dtname,
                stateCode: d.properties.st_code
            }
        })
    }

    toCamelCase(str) {
        str = str.toLowerCase()
        str = str[0].toUpperCase() + str.substr(1)
        return str.replace(/ (.)/, function($1) {return ' ' + $1.toUpperCase()})
            
    }

    render() {
        // const { t } = this.props;

        let districtName = this.state.displayDistrict.name || '-'
        
        let stateCode = {}
        let disData = {}
        let stateData = {
            mapData: {}
        }
        if(this.props.data.states !== undefined) {
            console.log(this.props.data)
            stateData = this.props.data.states
            stateCode = this.state.displayDistrict.stateCode
            disData = this.props.data.states.mapDataStates[stateCode] || {}
        }
         
         
        
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Map</h3>
                            <ChoroplethMap 
                                mapData={stateData.mapData}
                                range={{min: 0, max: this.state.maxDistrictCount}}
                                onHoverRegion={(d) => this.hover(d)}
                            />
                        </div>
                        <div className="col-md-6">

                            <div className="info-container-box">
                                <div className="info-container-box-title">District</div>
                                <h2>{districtName}</h2>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="stats-box active">
                                            <span className="title">Active</span>
                                            <span className="number">{stateData.mapData[districtName.toLowerCase()] || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box cured">
                                            <span className="title">Cured</span>
                                            <span className="number">-</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box death">
                                            <span className="title">Deaths</span>
                                            <span className="number">-</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box others">
                                            <span className="title">Total</span>
                                            <span className="number">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="info-container-box">
                                <div className="info-container-box-title">State</div>
                                <h2>{state_code_to_name[stateCode]}</h2>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="stats-box active">
                                            <span className="title">Active</span>
                                            <span className="number">{disData.activePositiveCases || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box cured">
                                            <span className="title">Cured</span>
                                            <span className="number">{disData.curedCases || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box death">
                                            <span className="title">Deaths</span>
                                            <span className="number">{disData.deathCases || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="stats-box others">
                                            <span className="title">Total</span>
                                            <span className="number">{disData.totalPositiveCases || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const MapDistrictTrans = withTranslation()(MapDistrictComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function MapDistrict(props) {
    console.log(props.data)
    return (
        <Suspense fallback="loading">
        <MapDistrictTrans data={props.data}/>
        </Suspense>
    );
}
