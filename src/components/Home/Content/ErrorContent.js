import React from 'react';
import {Typography} from '@material-ui/core';

export default function ErrorContent(props) {
  const error = props.data.error;
  const status = props.status;
  console.log(error);

  let heading;
  let message;
  
  if (status === 404){
    if (error.message === 'Service not found'){
      heading = "Oh no, there was an issue completing your request. ";
      message = `Error: ${status} ${error.message}`;
    } else{
      heading = "Oh no it looks like we couldn't find any results.";
      message = error.message;
    }
  }else if (status === 401){
    if (error.message === 'The access token expired'){
      heading = 'Your access token has expired.';
      message = 'Please login again to renew your access token.'
    }else {
      console.log(error);
    }
  }

  return (
    <>
      <Typography variant='h4'>{heading}</Typography>
      <Typography variant='body1'>{message}</Typography>
    </>
  )
}
