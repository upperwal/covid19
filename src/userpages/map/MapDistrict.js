import React, { useState, useEffect, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import ChoroplethMap from './Cholo';

import './MapDistrict.scss'

import state_code_to_name from './state_code_to_name.json'

const Stats = (props) => {
    const stateData = props.data.stateData
    const disData = props.data.disData
    const districtName = props.data.districtName
    const stateCode = props.data.stateCode

    console.log(stateCode)
    console.log(stateData)
    console.log(disData)
    return(
        <>
            <div className="info-container-box">
                <div className="info-container-box-title">District</div>
                <h2>{districtName}</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="stats-box active">
                            <span className="title">Active</span>
                            <span className="number">{disData[districtName.toLowerCase()] || '-'}</span>
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
                            <span className="number">{stateData[stateCode].activePositiveCases || '-'}</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-box cured">
                            <span className="title">Cured</span>
                            <span className="number">{stateData[stateCode].curedCases || '-'}</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-box death">
                            <span className="title">Deaths</span>
                            <span className="number">{stateData[stateCode].deathCases || '-'}</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-box others">
                            <span className="title">Total</span>
                            <span className="number">{stateData[stateCode].totalPositiveCases || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MapDistrictComponent(props) {

    //const [maxDistrictCount, setMaxDistrictCount] = useState(0)
    const [mapStateDistrictData, setMapStateDistrictData] = useState({})
    const [displayDistrict, setDisplayDistrict] = useState({
        name: 'South Delhi',
        stateCode: 'IN-DL'
    })

    /* constructor(props) {
        super(props)
        this.state = {
            displayDistrict: {
                name: 'South Delhi',
                stateCode: 'IN-DL'
            }
        }
    } */

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

    /* function toCamelCase(str) {
        str = str.toLowerCase()
        str = str[0].toUpperCase() + str.substr(1)
        return str.replace(/ (.)/, function($1) {return ' ' + $1.toUpperCase()})
            
    } */

    

    
        // const { t } = this.props;

        /* let districtName = displayDistrict.name || '-'
        
        let stateCode = {}
        let disData = {}
        let stateData = {
            mapData: {}
        }
        if(this.props.data.states !== undefined) {
            stateData = this.props.data.states
            stateCode = displayDistrict.stateCode
            disData = this.props.data.states.mapDataStates[stateCode] || {}
        }
         
        this.statsView = <Stats/> */

        function hover(d) {
            setDisplayDistrict({
                name: d.properties.dtname,
                stateCode: d.properties.st_code
            })
        }

        function mapView() {
            if(mapStateDistrictData.mapDataDistricts === undefined) {
                return <h1>Loading...</h1>
            } else {
                return (
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Map</h3>
                            <ChoroplethMap 
                                mapData={mapStateDistrictData.mapDataDistricts}
                                range={{min: 0, max: mapStateDistrictData.maxDistrictCount}}
                                onHoverRegion={(d) => hover(d)}
                            />
                        </div>
                        <div className="col-md-6">
                            <Stats
                                data = {{
                                    stateData: mapStateDistrictData.mapDataStates,
                                    disData: mapStateDistrictData.mapDataDistricts,
                                    districtName: displayDistrict.name,
                                    stateCode: displayDistrict.stateCode
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }

        useEffect(() => {
            if(props.data.states !== undefined) {
                setMapStateDistrictData(props.data.states)
            }
        }, [props.data.states])
        
        return (
            <>
                <div className="container">
                    {mapView()}
                </div>
            </>
        );
}

const MapDistrictTrans = withTranslation()(MapDistrictComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function MapDistrict(props) {
    return (
        <Suspense fallback="loading">
        <MapDistrictTrans data={props.data}/>
        </Suspense>
    );
}
