import { getItem } from '../functions/utils'

async function getResponse(url, endpoint) {
  const authToken = getItem('token');
  try {
    const response = await fetch(url,{ // submit get request
      headers: { Authorization: `Bearer ${authToken}` }
    })
    const data = await response.json();
    return {response, data, endpoint}
  } catch(err) { // bubbles error up to component
    throw err;
  }
}

export default async function getApi (endpoint, params) {
  const endpointLC = endpoint.toLowerCase();
  let url = '';

  // Endpoint creation
  if (endpointLC === 'users') { // Users
    url += 'https://api.spotify.com/v1/me';
  } else if (endpointLC === 'playlists') {
    url += `https://api.spotify.com/v1/me/playlists`;
  } else if (endpointLC === 'search') { // Search
    url += 'https://api.spotify.com/v1/search?';
    url += `q=${params.query}`;
    url += '&type=album,artist,playlist,track,show,episode';
    url += '&market=from_token'
    url += '&limit=4';
  }
  // getData(endpointTitle, url, token, callback);
  const obj = await getResponse(url, endpointLC);
  return obj;
}

// makes request to user and playlists endpoints to return
// initial user login data
export async function getLogin() {
  const userUrl = 'https://api.spotify.com/v1/me';
  const playlistsUrl = `https://api.spotify.com/v1/me/playlists`
  
  const userObj = await getResponse(userUrl);
  const playlistsObj = await getResponse(playlistsUrl);

  return { user: {...userObj.data}, playlists:{...playlistsObj.data}};
}