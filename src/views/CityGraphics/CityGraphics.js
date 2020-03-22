import React from 'react'

import './CityGraphics.css'
import city from './city.svg'

class CityGraphics extends React.Component {
    render() {
        return (
            <div className="city-graphics">
                <img src={city} alt="City scape"/>
            </div>  
        )
    }
}

export default CityGraphics