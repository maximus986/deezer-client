import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

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
            console.log("FETCH_URL", FETCH_URL);
            fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(response =>response.json())
            .then(json => {
                const artist = json.data;
                console.log('artist', artist);
                this.setState({artist});

                FETCH_URL = `${ALBUM_URL}${artist[0].artist.id}/top?limit=50`;
                console.log("FETCH_URL", FETCH_URL);
                fetch(FETCH_URL, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(json => console.log('artist top tracks:', json));
                const tracks = json.data;
                this.setState({tracks});
            });
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
                                onChange={event => this.setState({query: event.target.value})} 
                                onKeyPress={event => {
                                    if(event.key === "Enter") {
                                        this.search();
                                    }
                                }}/> 
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    {
                        this.state.artist !== null
                        ? 
                        <div>
                            <Profile 
                                artist={this.state.artist}
                            />
                            <Gallery 
                                tracks={this.state.tracks}/>
                        </div>                        
                        : <div></div>
                    }
            </div>
        )
    }
}

export default App;