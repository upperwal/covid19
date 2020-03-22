import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

import './TwitterNearFeed.css'

class TwitterNearFeed extends React.Component {
    render() {
        return (
            <div className="feed">
                <h1 className="feed-header">Events near you</h1>
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="PlugInDelhi"
                    noHeader
                    noFooter
                />
            </div>
            
        )
    }
}

export default TwitterNearFeed