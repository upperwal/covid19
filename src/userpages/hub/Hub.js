import React from 'react';
import MarkdownContent from '../../views/MarkdownContent'

import './Hub.scss'

import content from './hub.md'

class Hub extends React.Component {

    render() {
        return (
            <>
                <MarkdownContent className="hub" text={content} />
            </>
        );
    }
}

export default Hub;
