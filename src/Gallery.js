import React, {Component} from 'react';

class Gallery extends Component {
    state = {
        playingUrl: '',
        audio: null,
        playing: false
    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        if(!this.state.playing) {
            audio.play();
            this.setState({
                playingUrl: previewUrl,
                playing: true,
                audio
            })
        } else {
            if(this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
            this.state.audio.pause();
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
                })
            }
        }
    }

    render() {
        const {tracks} = this.props;
        return(
            <div>
                {
                    tracks.map((track, i) => {
                        const trackImg = track.album.cover;
                        return(
                            <div 
                                key={i}
                                className="track"
                                onClick={() => this.playAudio(track.preview)}
                            >
                            <img 
                                src={trackImg}
                                className="track-img"
                                alt="track"
                            />
                            <div className="track-play">
                                <div className="track-play-inner">
                                    {
                                        this.state.playingUrl === track.preview
                                        ? <span>| |</span>
                                        : <span>&#9654;</span>
                                    }
                                </div>
                            </div>
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