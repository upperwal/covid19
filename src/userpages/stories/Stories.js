import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import { LocationSearching } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CurfewMessage from '../../views/CurfewMessage'

import './Stories.scss'

import StoriesData from './stories.json'

class StoriesComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            truncated: true,
            dialogDisplay: false
        };

        this.handleClose = this.handleClose.bind(this);

        this.staticState = {
            StoriesData: StoriesData,
            dialog: {
                title: '',
                story: ''
            }
        }
        this.state = {
            StoriesData: StoriesData
        }
    }

    renderItems() {
        let cols = []
        let rows = []
        let rowCount = 1
        for(let i in this.state.StoriesData) {
            let item = this.state.StoriesData[i]
            if(item === undefined) {
                continue
            }

            let cat = []
            item.category.forEach((item, idx) => {
                cat.push(
                    <Chip
                        size="small"
                        variant="outlined"
                        icon={<CenterFocusStrongIcon color="primary"/>}
                        label={item}
                        key={idx}
                        color="secondary"
                    />
                )
            })
            cols.push(
                <div className="col-md-6 stories-item" key={i}>
                    <h4>{item.title}</h4>
                    <Chip
                        size="small"
                        variant="outlined"
                        icon={<LocationSearching color="primary"/>}
                        label={item.region}
                    />
                    <Chip
                        size="small"
                        variant="outlined"
                        icon={<PersonIcon color="primary"/>}
                        label={item.name === '' ? 'Anonymous' : item.name}
                        color="primary"
                    />
                    {cat}
                    <div className="message">
                        {item.story}
                    </div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.handleReadClick(i)}>Open in a Dialog</button>
                </div>
            )
            if(cols.length === 3) {
                rows.push(
                    <div className="row stories-section" key={rowCount}>
                        {cols}
                    </div>
                )
                cols = []
                rowCount++
            }
        }
        if(cols.length > 0) {
            rows.push(
                <div className="row stories-section" key={rowCount}>
                    {cols}
                </div>
            )
        }
        return rows
    }

    handleSearchInput(e) {
        let searchString = e.target.value
        let res = []
        this.staticState.StoriesData.forEach(i => {
            if( i.title.toLowerCase().includes(searchString.toLowerCase()) || 
                i.region.toLowerCase().includes(searchString.toLowerCase())
            ) {
                res.push(i)
            }
        })

        this.setState({
            StoriesData: res
        })
    }

    handleReadClick(i) {
        this.staticState.dialog = {
            title: this.staticState.StoriesData[i].title,
            story: this.staticState.StoriesData[i].story
        }
        
        this.setState({
            dialogDisplay: true
        })
    }

    handleClose() {
        this.setState({
            dialogDisplay: false
        })
    }

    render() {
        //const { t } = this.props;
        
        return (
            <>
                <div className="container stories">
                    <CurfewMessage/>
                    <h1>Citizen Stories</h1>
                    <h5>If you have an experience or story to share which can help someone, submit it here: <a href="http://stories.form.cov.social" rel="noopener noreferrer" target="_blank">stories.form.cov.social</a></h5>
                    <input className="form-control form-control-lg" type="text" placeholder="Search" onChange={(e) => this.handleSearchInput(e)}/>
                    {this.renderItems()}
                    <Dialog
                        open={this.state.dialogDisplay || false}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-title">{this.staticState.dialog.title || ''}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.staticState.dialog.story}
                        </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
            </>
        );
    }
}

const StoriesTrans = withTranslation()(StoriesComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Stories() {
  return (
    <Suspense fallback="loading">
      <StoriesTrans />
    </Suspense>
  );
}
