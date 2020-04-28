import React from 'react';
import {Typography} from '@material-ui/core';

export default function ErrorContent(props) {
  const data = props.data;

  const albums = (
        <ul>
          {data.albums.items.map((item) => (
            console.log(item),
          <li key={item.id}>
            <img alt={item.name} src={item.images[2].url}/>
            <Typography>{item.name}</Typography>
            <Typography>{item.artists[0].name}</Typography>
          </li>
          ))}
        </ul>
  )

  return (
    <div>
      {albums}
    </div>
  )
}
