import React from 'react';
import marked from 'marked';

import './MarkdownContent.scss'

class MarkdownContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { markdown: '' };

        marked.setOptions({
            headerIds: false,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
    }

    componentWillMount() {
        let content = this.props.text
        fetch(content).then(res => res.text()).then(text => this.setState({ markdown: text }));
    }

    render() {
        const { markdown } = this.state,
        html = marked(markdown || '');

        let htmlR = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/<p>(<\/*div[ a-zA-z="]*>)[\n]*<\/p>/g, "$1")
        console.log(htmlR)
        return <div className={this.props.className + " content"}
        dangerouslySetInnerHTML={{
            __html: htmlR
        }}></div>;
    }
}

export default MarkdownContent