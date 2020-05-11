import React from 'react';
import { generateRandomString } from '../../functions/utils';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
  }
}));

export default function LoginButton() {
  const stateKey = process.env.REACT_APP_STATE_KEY;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const scopes = JSON.parse(process.env.REACT_APP_SCOPES);
  const redirectURI = process.env.REACT_APP_REDIRECT_URI;
  const classes = useStyles();

  const handleLogin = () => {
    const state = generateRandomString(16);

    sessionStorage.setItem(stateKey, state);

    let url = 'https://accounts.spotify.com/authorize?';
    url += 'response_type=token';
    url += '&client_id=' + encodeURIComponent(clientID);
    url += '&scope=' + encodeURIComponent(scopes.join("%20"));
    url += '&redirect_uri=' + encodeURIComponent(redirectURI);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=true';

    window.location = url;
  }
  const button =
    <Button
      className={classes.root}
      variant='contained'
      size='large'
      onClick={handleLogin}>
      Login to Spotify
    </Button>;

  return (
    <>
      {button}
    </>
  );
}