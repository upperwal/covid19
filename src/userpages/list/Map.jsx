import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import L from 'leaflet'
import Tangram from 'tangram'
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CommentIcon from '@material-ui/icons/Comment';
import DirectionsIcon from '@material-ui/icons/Directions';

import 'leaflet/dist/leaflet.css'
import './Map.scss'

import Data from './res.json';

import scene from './scene.yaml';

function Map(props) {

    // console.log(props.item)

    const [mapState, setMapState] = useState({})
    const [drawerState, setDrawerState] = useState(false)
    const [activeMarkerState, setActiveMarkerState] = useState(0)
    const [findResponseState, setFindResponseState] = useState(undefined)
    

    const trafficLightMarkerMap = {};
    const laneTypeMap = {};
    const markerMap = {};
    const trafficSignalMap = {};

    useEffect(() => {
        if(props.locationState.locationObject != undefined) {
            var lat = props.locationState.locationObject.latitude
            var lon = props.locationState.locationObject.longitude
            
            fetch('http://localhost:4000/v1/info/find', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "tags": props.item,
                    "location": {
                        "type": "Point",
                        "coordinates": [lon, lat]
                    },
                    "max_distance": 1000000
                })
            }).then(res => res.json())
            .then(res => {
                if(res.length != 0) {
                    setFindResponseState(res)
                } else {
                    console.log('Sorry. Coudn\'t find any resources.')
                }
            })
        }
    }, [props])

    useEffect(() => {

        if(props.locationState.locationObject != undefined && findResponseState != undefined) {
            var lat = props.locationState.locationObject.latitude
            var lon = props.locationState.locationObject.longitude

            if(Object.keys(mapState).length === 0) {
                renderMap([lat, lon])
            } else {
                mapState.panTo(new L.LatLng(lat, lon));
            }
        }
        
    }, [findResponseState])

    // useEffect(() => {
    //     console.log(findResponseState)
    //     renderMarkers(mapState)
    // }, [])

    function renderMap(center) {
        var zoomDefault = 13
        var map = L.map('MapPlot', {
            tap: false
        });
        var tangramLayer = Tangram.leafletLayer({
            scene: scene,
            attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors'
        });
        tangramLayer.addTo(map);
        
        console.log(props)
        let latLon = center == undefined ? [28.3781432, 77.3066081] : center

        
        renderMarkers(map)
        
        map.setView(latLon, zoomDefault);

        setMapState(map)
    }

    function renderMarkers(map) {
        var greenIcon = L.icon({
            iconUrl: 'marker-avail.png',

            iconSize:     [20, 27], // size of the icon
            iconAnchor:   [3, 28], // point of the icon which will correspond to marker's location
            popupAnchor:  [1, -10] // point from which the popup should open relative to the iconAnchor
        });
        var redIcon = L.icon({
            iconUrl: 'marker-outs.png',

            iconSize:     [20, 27], // size of the icon
            iconAnchor:   [3, 28], // point of the icon which will correspond to marker's location
            popupAnchor:  [1, -10] // point from which the popup should open relative to the iconAnchor
        });
        var blueIcon = L.icon({
            iconUrl: 'marker-verified.png',

            iconSize:     [20, 27], // size of the icon
            iconAnchor:   [3, 28], // point of the icon which will correspond to marker's location
            popupAnchor:  [1, -10] // point from which the popup should open relative to the iconAnchor
        });
        console.log(findResponseState)
        if(findResponseState != undefined) {
            findResponseState.forEach((d,idx) => {
                var icon = blueIcon
                if(d.updates != undefined && d.updates.stock_availability > 0) {
                    icon = greenIcon
                } else if(d.updates != undefined && d.updates.stock_availability == 0) {
                    icon = redIcon
                }
                var marker = L.marker(d.location.coordinates.reverse(), {customId: idx, icon: icon}).addTo(map);
                marker.on('click', (e) => {
                    setActiveMarkerState(e.target.options.customId)
                    setDrawerState(true)
                    console.log(e.target.options.customId)})
                // marker.bindPopup("<b>Hello world!</b><br>I am a popup.")
            })
        }
    }

    function computeIconSize(zoomLevel) {
        var width = zoomLevel * 1.8
        return [width, 2.7*width]
    }

    function getCustomIcon(zoomDefault) {
        return L.Icon.extend({
			options: {
				iconSize:     computeIconSize(zoomDefault),
				shadowSize:   [50, 64],
				iconAnchor:   [10, 25],
				shadowAnchor: [4, 62],
				popupAnchor:  [0, 0]
			}
		});
    }

    // function getRedLightIcon(zoomDefault) {
    //     var red_light = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187.705 643.732"><path d="M107.7,635.732H80.1a4.269,4.269,0,0,1-4.3-4.3V48A17.669,17.669,0,0,1,93.5,30.3h.8A17.669,17.669,0,0,1,112,48V631.431A4.268,4.268,0,0,1,107.7,635.732Z" style="fill:#4e5a61"/><path d="M179.8,14.3V568.532a6.231,6.231,0,0,1-6.2,6.2H14.3a6.231,6.231,0,0,1-6.2-6.2V14.3a6.231,6.231,0,0,1,6.2-6.2H173.6A6.1,6.1,0,0,1,179.8,14.3Z" style="fill:#4e5a61"/><path d="M179.8,14.3V568.532a6.231,6.231,0,0,1-6.2,6.2H44.4a6.231,6.231,0,0,1-6.2-6.2V14.3a6.231,6.231,0,0,1,6.2-6.2H173.6A6.1,6.1,0,0,1,179.8,14.3Z" style="fill:#5f6c75"/><path d="M147.6,93.9A53.841,53.841,0,0,1,107,146a51.664,51.664,0,0,1-13.1,1.6,53.7,53.7,0,0,1,0-107.4A56.608,56.608,0,0,1,107,41.8,53.841,53.841,0,0,1,147.6,93.9Z" style="fill:#d63030"/><path d="M147.6,225.5A53.841,53.841,0,0,1,107,277.6a51.664,51.664,0,0,1-13.1,1.6,53.7,53.7,0,0,1,0-107.4,56.608,56.608,0,0,1,13.1,1.6A53.667,53.667,0,0,1,147.6,225.5Z" style="fill:#494949"/><path d="M147.6,357A53.841,53.841,0,0,1,107,409.1a51.664,51.664,0,0,1-13.1,1.6,53.7,53.7,0,0,1,0-107.4,56.608,56.608,0,0,1,13.1,1.6A53.667,53.667,0,0,1,147.6,357Z" style="fill:#494949"/><path d="M147.6,93.9A53.841,53.841,0,0,1,107,146a53.729,53.729,0,0,1,0-104.2A53.841,53.841,0,0,1,147.6,93.9Z" style="fill:#f95353"/><path d="M147.6,225.5A53.841,53.841,0,0,1,107,277.6a53.729,53.729,0,0,1,0-104.2A53.667,53.667,0,0,1,147.6,225.5Z" style="fill:#282828"/><path d="M147.6,357A53.841,53.841,0,0,1,107,409.1a53.729,53.729,0,0,1,0-104.2A53.667,53.667,0,0,1,147.6,357Z" style="fill:#282828"/><path d="M173.6,0H14.3A14.3,14.3,0,0,0,0,14.3V123.2a8,8,0,0,0,16,0V16.1H171.7V178.9a8,8,0,1,0,16,0V14.3A14,14,0,0,0,173.6,0Z"/><path d="M179.8,201a8.024,8.024,0,0,0-8,8V566.632H16.1V153.3a8,8,0,0,0-16,0V568.432a14.3,14.3,0,0,0,14.3,14.3H67.9v48.7a12.291,12.291,0,0,0,12.3,12.3h27.6a12.291,12.291,0,0,0,12.3-12.3v-48.7h53.5a14.3,14.3,0,0,0,14.3-14.3V209A8.045,8.045,0,0,0,179.8,201ZM104,627.732H83.9v-45H104Z"/><path d="M155.7,93.9c0-43.8-44.8-73.9-85.3-57C13.5,60.6,22.6,144.8,84,154.8,121.4,161.1,155.7,131.9,155.7,93.9ZM104,49.4c38.5,8.7,48.6,59.1,16.1,81.9a45.569,45.569,0,0,1-52.3,0C27.4,103,54.8,38.3,104,49.4Z"/><path d="M104,286.4c59.9-9.8,70.7-91.2,16.1-116.8-41-19.3-87.9,11-87.9,55.9A61.842,61.842,0,0,0,104,286.4ZM67.8,188.1c30.3-21.3,71.8.8,71.8,37.4A45.654,45.654,0,0,1,83.9,270C45.4,261.3,35.3,210.8,67.8,188.1Z"/><path d="M34.8,374.8a8.036,8.036,0,1,0,15.4-4.6c-12.4-41.3,34.5-75.4,69.9-50.6A45.572,45.572,0,0,1,139.6,357c0,38.7-45.9,60.3-75.6,34.4a7.96,7.96,0,0,0-11.3.8,8.086,8.086,0,0,0,.8,11.4c40.2,35,102.3,5.8,102.3-46.5,0-45.3-47.3-74.9-87.9-55.9A61.457,61.457,0,0,0,34.8,374.8Z"/><path d="M147.6,488.641a53.841,53.841,0,0,1-40.6,52.1,51.664,51.664,0,0,1-13.1,1.6,53.7,53.7,0,0,1,0-107.4,56.608,56.608,0,0,1,13.1,1.6A53.667,53.667,0,0,1,147.6,488.641Z" style="fill:#494949"/><path d="M147.6,488.641a53.841,53.841,0,0,1-40.6,52.1,53.729,53.729,0,0,1,0-104.2A53.667,53.667,0,0,1,147.6,488.641Z" style="fill:#282828"/><path d="M34.8,506.441a8.036,8.036,0,1,0,15.4-4.6c-12.4-41.3,34.5-75.4,69.9-50.6a45.572,45.572,0,0,1,19.5,37.4c0,38.7-45.9,60.3-75.6,34.4a7.96,7.96,0,0,0-11.3.8,8.086,8.086,0,0,0,.8,11.4c40.2,35,102.3,5.8,102.3-46.5,0-45.3-47.3-74.9-87.9-55.9A61.457,61.457,0,0,0,34.8,506.441Z"/><line x1="94" y1="387.65" x2="94" y2="334.527" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:13px"/><polygon points="115.819 359.388 94 337.556 72.181 359.388 72.181 340.861 94 319.043 115.819 340.861 115.819 359.388"/><polyline points="70.177 508.694 70.177 485.047 113.043 484.145" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:13px"/><polygon points="88.646 506.482 110.014 484.209 87.728 462.854 106.251 462.465 128.523 483.82 107.169 506.092 88.646 506.482"/></svg>'
    //     var url = "data:image/svg+xml," + encodeURIComponent(red_light);

    //     var CustomIcon = getCustomIcon(zoomDefault)
    //     return new CustomIcon({iconUrl: url});
    // }

    const searchOptions = [
        { title: 'Oxygen Cylinder', short: 'O2'},
        { title: 'ICU Bed', short: 'I'},
        { title: 'Ventilator Bed', short: 'V'}
    ]

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(open)
    };

    function renderPoC() {
        var poc = []
        findResponseState[activeMarkerState].poc.forEach((n, idx) => {
            poc.push(
                <div key={idx} className="item">
                    <p>{n.name}</p>
                    <p><span className="available"><a href={"tel:" + n.phone}>{n.phone}</a></span></p>
                </div>
            )
        })

        if(poc.length == 0) {
            poc = <p>Sorry, no contact available.</p>
        }

        return (
            <div className="detail-container">
                <ContactPhoneIcon/>
                <h5>Point of Contact</h5>
                <Divider />
                {poc}
            </div>
        )
    }

    function getUpdateTimeDiffMin(time) {
        let min = Math.round((new Date() - new Date(time)) / 60000)
        let text = ''
        let className = 'last-updated-green'
        if(min > 30 && min < 60) {
            className = 'last-updated-yellow'
            text = min
        } else if(min > 60 && min <= 1440) {
            className = ''
            text = Math.floor(min / 60) + ' hour(s) ' + Math.round(min % 60)
        } else if(min > 1440) {
            className = ''
            text = Math.round(min / 1440) + ' day(s) ' + Math.floor(min / 60) + ' hour(s) ' + Math.round(min % 60)
        }
        return <div className={"last-updated " + className}>Updated {text} mins ago</div>
    }

    function getReadableDate(updates) {
        if(updates.stock_availability == 0 && updates.next_restock_date != undefined) {
            let d = new Date(updates.next_restock_date)
            let str = d.toLocaleDateString() + ' ' + d.toLocaleTimeString('en-US')

            return <small>Next available on {str}</small>
        } else {
            return ''
        }
    }

    function renderAvailabilityView(updates) {
        if(updates == undefined) {
            return <span>Availability information not available</span>
        }
        let text = ''
        let className = ''
        if(updates.stock_availability > 0) {
            text = 'Available (' + updates.stock_availability + ')'
            className = 'available'
        } else if(updates.stock_availability == -1) {
            text = 'Availability information not available'
            className = ''
        } else {
            text = 'Not Available'
            className = 'not-available'
        }
        return (
            <>
                <span className={className}>{text}</span>
                <br/>
                {getReadableDate(updates)}
            </>
        )
    }

    function generateDirectionLink(d) {
        d = d.coordinates
        return 'https://www.google.com/maps/dir//' + d[0] + ',' + d[1]
    }

    function renderDetailedView() {
        console.log(findResponseState)
        if(findResponseState == undefined || findResponseState.length == 0) {
            return 'Loading...'
        } else {
            return (
                <>
                    <h2>{findResponseState[activeMarkerState].name}</h2>
                    
                    <DirectionsIcon fontSize="small"/><a className="direction-link" href={generateDirectionLink(findResponseState[activeMarkerState].location)} target="_blank">Get Direction</a>
                    <p className="address">{findResponseState[activeMarkerState].address}</p>
                    
                    {getUpdateTimeDiffMin(findResponseState[activeMarkerState].updates.date_updated)}
                    <div className="detail-container">
                        <AddBoxIcon/>
                        <h5>Availability</h5>
                        <Divider />
                        <div className="item">
                            <p>{props.item}</p>
                            <p>{renderAvailabilityView(findResponseState[activeMarkerState].updates)}</p>
                        </div>
                    </div>
                    
                    {renderPoC()}

                    <div className="detail-container">
                        <CommentIcon/>
                        <h5>General Comment</h5>
                        <Divider />
                        <div className="comments-box" dangerouslySetInnerHTML={{__html: findResponseState[activeMarkerState].comments.replace(/(?:ht|f)tps?:\/\/[-a-zA-Z0-9.]+\.[a-zA-Z]{2,3}(?:\/(?:[^"<=]|=)*)?/g, (a, b) => {return '<a target="_blank" href="' + a + '">' + a + '</a>'})}}></div>
                    </div>
                </>
            )
        }
    }



    return (
        <>
            <div className="MapPlot-container">
                <section id="MapPlot"></section>
                <div className="overlay-container">
                    <div className="back-button">
                        <Link to="/">
                            <IconButton aria-label="delete" >
                                <ArrowBackIcon style={{ color: '#fff' }}/>
                            </IconButton>
                        </Link>
                    </div>
                    <div className="input-box">
                        <Autocomplete
                            id="seek-input"
                            size="small"
                            fullWidth={true}
                            value={searchOptions.find(v => v.title === props.item) || {}}
                            options={searchOptions}
                            getOptionLabel={(option) => option.title}
                            style={{}}
                            renderInput={(params) => <TextField {...params} fullWidth={true} placeholder="Start typing for suggestions" required={true} label="" variant="outlined" />}
                        />
                    </div>
                </div>
            </div>
            <React.Fragment>
                {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                <Drawer anchor="right" open={drawerState} onClose={console.log} onClose={toggleDrawer(false)}>
                    <div className="detail-info">
                        {renderDetailedView()}
                    </div>
                </Drawer>
            </React.Fragment>
        </>
    )
}

export default Map;
