import React from 'react';
import { getItem, setItem } from './functions/utils'
import { 
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { Home, Login } from './pages'

require('dotenv').config();

console.log(process.env);

export const AppContext = React.createContext();

const initialState = {
  token: null,
  state: null,
  isLoggedIn: false,
  user: [],
  playlists: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login': 
      setItem('state', action.payload.state);
      setItem('isLoggedIn', action.payload.isLoggedIn);
      setItem('user', JSON.stringify(action.payload.user));
      setItem('playlists', JSON.stringify(action.payload.playlists));
      return {
        token: action.payload.token,
        state: action.payload.state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        playlists: action.payload.playlists
      };
    case 'inSession':
      return {
        token: action.payload.token,
        state: action.payload.state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        playlists: action.payload.playlists
      };
    case 'logout': 
    case 'missing credentials': 
    case 'error authenticating': 
    case 'validation error':
        sessionStorage.clear();
        return{
          token: null,
          state: null,
          isLoggedIn: false
        };
    default:
      return state;
  }
}

export default function App() {
  const history = useHistory();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //Persist state on re-render
  React.useEffect(() => {
    // if session data !== state data then set state to session
    if (JSON.parse(getItem('isLoggedIn')) !== state.isLoggedIn){
      dispatch({
        type: 'inSession',
        payload: { 
          token: getItem('token'), 
          state: getItem('state'),
          isLoggedIn: JSON.parse(getItem('isLoggedIn')),
          user: JSON.parse(getItem('user')),
          playlists: JSON.parse(getItem('playlists')),
        } 
      })
    }
  },[state, dispatch])

  return (
      <Switch>
        <AppContext.Provider value={{state, dispatch}}>
          <Route exact path='/'  render={ () => <Home history={history}/> }></Route>
          <Route exact path='/login' render={ () => <Login history={history} /> }></Route>
        </AppContext.Provider>
      </Switch>
  );
}