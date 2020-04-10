import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';

import CurfewMessage from '../../views/CurfewMessage'

import './Volunteer.scss'

import VData from './volunteer.json'

// import Content from './mk.md'

/* import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg' */

class VolunteerComponent extends React.Component {

    constructor(props) {
        super(props)

        this.staticState = {
            volData: VData
        }
        this.state = {
            volData: VData
        }
    }

    renderItems() {
        let cols = []
        let rows = []
        let rowCount = 1
        for(let i in this.state.volData) {
            let item = this.state.volData[i]
            if(item === undefined) {
                continue
            }
            cols.push(
                <div className="col-md-4 item-box" key={i}>
                    <div className="text-item">
                        <h2>{item.name}</h2>
                        <p>by {item.org}</p>
                        <p>{item.desc}</p>
                        <span className="region-name">{item.region}</span>
                        <span className="cat-name">{item.cat}</span>
                    </div>
                    <div className="link-item">
                        <a href={item.link} target="_blank" rel="noopener noreferrer"><button>Contribute Now</button></a>
                    </div>
                </div>
            )
            if(cols.length === 3) {
                rows.push(
                    <div className="row row-margin-top" key={rowCount}>
                        {cols}
                    </div>
                )
                cols = []
                rowCount++
            }
        }
        if(cols.length > 0) {
            rows.push(
                <div className="row extra-margin-top" key={rowCount}>
                    {cols}
                </div>
            )
        }
        return rows
    }

    handleSearchInput(e) {
        let searchString = e.target.value
        let res = []
        this.staticState.volData.forEach(i => {
            if( i.name.toLowerCase().includes(searchString.toLowerCase()) || 
                i.desc.toLowerCase().includes(searchString.toLowerCase()) || 
                i.cat.toLowerCase().includes(searchString.toLowerCase()) || 
                i.region.toLowerCase().includes(searchString.toLowerCase())
            ) {
                res.push(i)
            }
        })

        this.setState({
            volData: res
        })
    }

    render() {
        //const { t } = this.props;
        
        return (
            <>
                <div className="container vol">
                    <CurfewMessage/>
                    <h1>Active Volunteering Opportunities</h1>
                    <input className="form-control form-control-lg" type="text" placeholder="Search" onChange={(e) => this.handleSearchInput(e)}/>
                    {this.renderItems()}
                </div>
                
                
                {/* <UserEngagementForm/>
                <CityGraphics/>
                <MarkdownContent className="content" text={Content} /> */}
            </>
        );
    }
}

const VolunteerTrans = withTranslation()(VolunteerComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Volunteer() {
  return (
    <Suspense fallback="loading">
      <VolunteerTrans />
    </Suspense>
  );
}
