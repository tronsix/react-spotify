import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from '../components/Login/LoginButton';

const useStyles = makeStyles((theme) => ({
  coverHeight: {
    minHeight: window.innerHeight,
  },
  bgCover: {
    flexGrow: 1,
    background: "linear-gradient(135deg, rgba(247,175,86,1) 0%, rgba(252,93,159,1) 100%)",
    color: '#FFFFFF'
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));


export default function Login(props) {
  const classes = useStyles();
  const bgCover = React.useRef(null);
  const container = React.useRef(null);

  const refs = [bgCover, container];

  const resizeContent = () => {
    let wh = window.innerHeight;
    refs.forEach(i => {
      i.current.style.minHeight = `${wh}px`;
    });
  }
  window.onresize = resizeContent;


  return (
    <div ref={bgCover} className={`${classes.bgCover} ${classes.coverHeight}`}>
      <Container ref={container} className={`${classes.container} ${classes.coverHeight}`} maxWidth='md' disableGutters={true}>
        <Typography variant='h2'>Music for everyone.</Typography>
        <Typography variant='body1'>Millions of songs. No credit card needed.</Typography>
        <LoginButton params={props.params} />
      </Container>
    </div>
  );
}