import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import CurfewMessage from '../../views/CurfewMessage'

import './Us.scss'

import colab from '../../images/colab.svg'
import telegram from '../../images/telegram.svg'
import github from '../../images/github.svg'

// import VData from './Us.json'

// import Content from './mk.md'

/* import coverFace from '../../images/cover_face.svg'
import handwash from '../../images/handwash.svg'
import dTouchFace from '../../images/dont_touch_face.svg'
import handRub from '../../images/handrub.svg'
import faceMask from '../../images/face_mask.svg'
import socialDistancing from '../../images/social_distancing.svg' */

class UsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0
        }
    }

    getSteps() {
        return ['Reaching out to us', 'Submitting an Idea or contributing to an existing one', 'Things you can contribute to'];
    }

    getStepContent(step) {
        switch (step) {
            case 0:
            return  <div className="step-box">
                        <h3>You can either reach out to us on Telegram or through Github.</h3>
                        <a href="https://t.me/covid_init" rel="noopener noreferrer" target="_blank"><img alt="" className="connect-icon" src={telegram}/></a>
                        <a href="https://github.com/upperwal/covid19" rel="noopener noreferrer" target="_blank"><img className="connect-icon" alt="" src={github}/></a>
                    </div>;
            case 1:
            return <div className="step-box">
                        <h3>You can submit a new idea by opening an issue on Github or start collaborating with someone by commenting on an existing one.</h3>
                        <a href="https://github.com/upperwal/covid19/issues" rel="noopener noreferrer" target="_blank">Github Issues</a>
                    </div>
            case 2:
            return <div className="step-box">
                        <h3>
                            You can help us:
                        </h3>
                        <ul>
                            <li>Add new ideas to the platform.</li>
                            <li>Translate content in an Indian language.</li>
                            <li>Write new content.</li>
                            <li>Aggregate and preprocess data.</li>
                            <li>Build amazing visualisations.</li>
                            <li>Build interactive demos for educational purpose.</li>
                            <li>Collect citizen stories.</li>
                        </ul>
                    </div>;
            default:
            return 'Unknown step';
        }
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        })
    };

    render() {
        let steps = this.getSteps()
        return (
            <>
                <div className="container us">
                    <h1>We are super excited to get you involved.</h1>
                    <div className="row">
                        <div className="col-md-5">
                            <img src={colab} alt=""/>
                        </div>
                        <div className="col-md-7">
                            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                    {this.getStepContent(index)}
                                    <div>
                                        <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={this.handleBack}
                                            className=""
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className="step-button"
                                        >
                                            {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        </div>
                                    </div>
                                    </StepContent>
                                </Step>
                                ))}
                            </Stepper>
                            {this.state.activeStep === steps.length && (
                                <Paper square elevation={0} className="">
                                <Typography>Looking forward to your contribution :)</Typography>
                                <Button onClick={this.handleReset} className="">
                                    Reset
                                </Button>
                                </Paper>
                            )}
                        </div>
                    </div>
                </div>
                
                
                {/* <UserEngagementForm/>
                <CityGraphics/>
                <MarkdownContent className="content" text={Content} /> */}
            </>
        );
    }
}

const UsTrans = withTranslation()(UsComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Us() {
  return (
    <Suspense fallback="loading">
      <UsTrans />
    </Suspense>
  );
}
