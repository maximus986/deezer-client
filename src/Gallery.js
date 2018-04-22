import React, {Component} from 'react';

class Gallery extends Component {
    render() {
        console.log('Gallery props', this.props);
        const {tracks} = this.props;
        return(
            <div>
                {
                    tracks.map((track, i) => {
                        const trackImg = track.album.cover;
                        console.log(trackImg);
                        return(
                            <div 
                                key={i}
                                className="track"
                            >
                            <img 
                                src={trackImg}
                                className="track-img"
                                alt="track"
                            />
                            <p className="track-text">
                                {track.title}
                            </p>
                        </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Gallery;