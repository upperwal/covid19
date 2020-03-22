import React from 'react'

import './UserEngagementForm.css'

class UserEngagementForm extends React.Component {
    render() {
        return (
            <div className="user-engagement-form">
                <h1>Which of these best describe your interest in Delhi's Electric Vehicle Policy?</h1>
                <div className="btn-group">
                    <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <p className="starter-box">I am interested in</p>
                    </button>
                    <div className="dropdown-menu">
                        <a href="#/hello">Two wheeler EVs</a>
                        <a href="#/hello">Three wheeler EVs</a>
                        <a href="#/hello">Four wheeler EVs</a>
                        <a href="#/hello">Electric Buses</a>
                        <a href="#/hello">Private EV charging infrastructure</a>
                        <a href="#/hello">Public EV charging infrastructure</a>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default UserEngagementForm