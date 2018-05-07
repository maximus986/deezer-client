import React from 'react';
import './Profile.css';

const profile = (props) => {
        return(
            <div className="profile">
                <img 
                    alt="Profile"
                    className="profile-img"
                    src={props.picture}/>
                <div className="profile-info">
                    <div className="profile-name">{props.name}</div>
                </div>
            </div>
        );
}

export default profile;     