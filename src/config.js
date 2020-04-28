// Our authentication variables, replace with your own.
const authParams = {
  clientID: "831aea7ff9284acda329df6f826f1697",
  redirectURI: "http://localhost:3000/",
  stateKey: 'spotify_auth_state',
  scopes: [
    'user-read-private', 
    'user-read-email',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-top-read',
    'user-read-recently-played'
  ]
};

export default authParams;

