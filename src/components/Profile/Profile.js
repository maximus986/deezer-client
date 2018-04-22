import React from 'react';
import './Profile.css';

const profile = (props) => {
        let artist = {name: '', picture: ''};
        if(props.artist !== null) {
            artist = props.artist[0].artist;
        }
        return(
            <div className="profile">
                <img 
                    alt="Profile"
                    className="profile-img"
                    src={artist.picture}/>
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                </div>
            </div>
        );
}

export default profile;     