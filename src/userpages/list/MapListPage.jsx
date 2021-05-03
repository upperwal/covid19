import React, { Suspense } from 'react';
import Map from './Map';

function MapListPage(props) {
    console.log(props)
    return (
        <Map locationState={props.locationState} item={props.match.params.item}/>
    )
}

export default MapListPage;
