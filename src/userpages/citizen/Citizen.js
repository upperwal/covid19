import React from 'react';

import './Citizen.scss'

class Citizen extends React.Component {

    render() {
        return (
            <>
                <div className="container citizen-engagement">
                    <h2 className="center">Citizen Engagement</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box">
                                <h3>Interactive Maps</h3>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <h3>Pledges and Future Plans</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <a href="https://t.me/joinchat/O7ylD0vEzdLMOZxixgGkXQ" target="_blank" rel="noopener noreferrer">
                                <div className="box">
                                    <h3>Join us on Telegram</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <h3>Collaborate with us</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Citizen;
