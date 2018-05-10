import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './components/Profile/Profile';
import Gallery from './containers/Gallery/Gallery';
import deezerAPI from './deezerAPI';
import Spinner from './components/Spinner/Spinner';

class App extends Component {

    state = {
        query: '',
        artist: null,
        tracks: [],
        loading: false
    }

    inputChanged = (event) => {
        this.setState({query: event.target.value});
    }
    
    inputKeyPressed = (event) => {
        if(event.key === "Enter") {
            this.setState({artist: null,tracks: [], loading: true});
            deezerAPI.search(this.state.query)
                .then(result => {
                    this.setState({artist: result.artist, tracks: result.tracks, loading: false})
                });
        }
    }

    renderArtist() {
        let artist = {name: '', picture: ''};
        if(this.state.artist !== null) {
            artist = this.state.artist[0].artist;
        }

        return(
            <div>
                <Profile 
                    picture={artist.picture}
                    name={artist.name}
                />
                <Gallery 
                    tracks={this.state.tracks}/>
            </div>
        )
    }

    render() {
        
        return (
            <div className="App">
                <div className="App-title">Deezer Client</div>
                    <FormGroup>
                        <InputGroup>
                            <FormControl 
                                type="text" 
                                placeholder="Search for an artist..." 
                                value={this.state.query}
                                onChange={this.inputChanged} 
                                onKeyPress={this.inputKeyPressed}
                                /> 
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    {
                        this.state.artist !== null 
                        ? 
                        this.renderArtist()
                        :
                        this.state.loading
                        ?
                        <Spinner />
                        : <div></div> 
                    }
            
            </div>
        )
    }
}

export default App;
