import React from 'react';
import { ConfigContext } from '../../App'
import { generateRandomString } from '../../functions/utils';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
  }
}));

export default function LoginButton() {
  const authParams = React.useContext(ConfigContext);
  const classes = useStyles();

  const handleLogin = () => {
    const state = generateRandomString(16);

    sessionStorage.setItem(authParams.stateKey, state);

    let url = 'https://accounts.spotify.com/authorize?';
    url += 'response_type=token';
    url += '&client_id=' + encodeURIComponent(authParams.clientID);
    url += '&scope=' + encodeURIComponent(authParams.scopes.join("%20"));
    url += '&redirect_uri=' + encodeURIComponent(authParams.redirectURI);
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