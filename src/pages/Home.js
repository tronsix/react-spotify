import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ConfigContext, AppContext } from '../App';
import { hash, getItem, setItem } from '../functions/utils'
import { getLogin } from '../functions/getApi';
import { MyAppBar as AppBar } from '../components/Home/AppBar';
import { Drawer } from '../components/Home/Drawer/';
import { Content } from '../components/Home/Content/';
export const ContentContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const initialContentState = {
  data: null,
  response: null,
  endpoint: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return state;
    case 'success':
      return {
        data: action.payload.data,
        response: action.payload.response,
        endpoint: action.payload.endpoint,
      };
    case 'error':
      return {
        data: action.payload.data,
        response: action.payload.response
      };
    default:
      return state;
  }
}

export default function Home(props) {
  const classes = useStyles();
  const { dispatch } = React.useContext(AppContext);
  const authParams = React.useContext(ConfigContext);
  const stateKey = authParams.stateKey;
  const [contentState, contentDispatch] = React.useReducer(reducer, initialContentState);
  
  React.useEffect(() => {
    
    if (hash.access_token) { // if hash contains token on home
      let token = hash.access_token;
      let state = hash.state;
      let storedState = getItem(stateKey);
      let isLoggedIn = getItem("isLoggedIn");

      if (token && (state == null || state !== storedState)) { // bad credentials
        alert("Sorry, there was an error during the authentication. Try again.");
        props.history.push('/login');
        dispatch({ type: "error authenticating" });
      } else if (token && state != null && state === storedState && isLoggedIn !== "true") { // good credentials
        setItem('token', token);
        getLogin()
          .then(data => 
            dispatch({
              type: "login",
              payload: { 
                token, 
                state, 
                isLoggedIn: true, 
                user: data.user,
                playlists: data.playlists
              }
            })
          )
          .catch( e => {
            console.error(e);
          });      
      }
    } else { // if hash doesn't contain token on home
      let seshToken = getItem("token");
      let seshState = getItem("state");
      let seshLoggedIn = getItem("isLoggedIn");

      if (seshToken == null || seshLoggedIn !== "true" || seshState == null) { // no credentials
        alert("Sorry, but you'll need to login to use this app.");
        props.history.push('/login');
        dispatch({ type: "missing credentials" });
      } else if (seshToken && (seshLoggedIn !== "true" || seshState == null)) { // missing some credentials
        alert("Sorry, but there was an error validating your authentication credentials. Log in again.");
        props.history.push('/login');
        dispatch({ type: "validation error" });
      }
    }

  }, [dispatch, props.history, stateKey]);

  return (
    <ContentContext.Provider value={{ contentState, contentDispatch }}>
      <div className={classes.root}>
        <AppBar history={props.history} />
        <Drawer />
        <Content />
      </div>
    </ContentContext.Provider>
  );
}