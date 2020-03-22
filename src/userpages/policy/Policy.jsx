import React from 'react';
import MarkdownContent from '../../views/MarkdownContent'

import './Policy.scss'

import content from './policy.md'

class Policy extends React.Component {

    render() {
        return (
            <MarkdownContent className="policy" text={content} />
        );
    }
}

export default Policy;
