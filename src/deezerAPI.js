class DeezerAPI {
    search(query) {
        const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?';
        let FETCH_URL = `${BASE_URL}q=${query}`;
        const ALBUM_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/';
        const results = {};

        return fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
                const artist = json.data;
                results.artist = artist;

                FETCH_URL = `${ALBUM_URL}${artist[0].artist.id}/top?limit=50`;
                return fetch(FETCH_URL, {
                    method: 'GET'
                });
            })
            .then(response => response.json())
            .then(json => {
                const tracks = json.data;
                results.tracks = tracks;
                return results;
            });
    }
}

export default new DeezerAPI();