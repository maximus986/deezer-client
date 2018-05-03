import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './components/Profile/Profile';
import Gallery from './containers/Gallery/Gallery';

class App extends Component {

    state = {
        query: '',
        artist: null,
        tracks: []
    }

    search() {
        const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}`;
        const ALBUM_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/';
            fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(response =>response.json())
            .then(json => {
                const artist = json.data;
                this.setState({artist});

                FETCH_URL = `${ALBUM_URL}${artist[0].artist.id}/top?limit=50`;
                fetch(FETCH_URL, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(json => {
                    const tracks = json.data;
                    this.setState({tracks});
                });
            });
        }

    inputChanged = (event) => {
        this.setState({query: event.target.value});
    }
    
    inputKeyPressed = (event) => {
        if(event.key === "Enter") {
            this.search();
        }
    }

    renderArtist() {
        return(
        <div>
            <Profile 
                artist={this.state.artist}
            />
            <Gallery 
                tracks={this.state.tracks}/>
        </div> 
        )
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
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
                        : <div></div>
                    }
            </div>
        )
    }
}

export default App;
