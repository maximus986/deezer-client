import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
    render() {
        console.log(this.props);
        let artist = {name: '', picture: ''};
        if(this.props.artist !== null) {
            artist = this.props.artist[0].artist;
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
}

export default Profile;