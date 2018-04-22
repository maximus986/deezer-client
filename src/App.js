import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class App extends Component {

    state = {
        query: '',
        artist: null
    }

    search() {
        const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}`;
            console.log("FETCH_URL", FETCH_URL);
            fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(response =>response.json())
            .then(json => {
                const artist = json.data[0].artist.name;
                this.setState({artist});
                console.log('this.state', this.state);
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
                <div className="Profile">  
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;