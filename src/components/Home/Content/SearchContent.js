import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemText, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  resultsWrapper: {
    display: 'flex',
    flexFlow: 'column',
    width: `calc(50% - ${theme.spacing(1.5)}px)`
  },
  divider: {
    backgroundColor: 'rgba(255,255,255, 0.08)'
  },
  resultList: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  resultListItem: {
    width: `calc(50% - ${theme.spacing(1.5)}px)`,
    padding: 0,
    margin: theme.spacing(1.5, 1.5, 1.5, 0),
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.08)'
    }
  },
  LItextWrapper: {
    display: 'flex',
    flexFlow: 'column',
    marginLeft: theme.spacing(2.5),
  },
  LItextPrimary: {
    color: '#FFFFFF',
    fontWeight: 700,
  },
  LItextSecondary: {
    color: '#B3B3B3'
  },
  LIimg: {
    width: 64,
    height: 64,
    objectFit: 'cover'
  },
  LIartistImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    objectFit: 'cover'
  }
}));

export default function SearchContent(props) {
  const data = props.data;
  const classes = useStyles();
  
  const songs = (
    <div className={classes.resultsWrapper}>
      <Typography>Songs</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.tracks.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.album.images[2] ? 
              <img className={classes.LIimg} alt={item.name} src={item.album.images[2].url}/>
            : (item.album.images[1]
              ? <img className={classes.LIimg} alt={item.name} src={item.album.images[1].url}/>
              : <img className={classes.LIimg} alt={item.name} src={item.album.images[0].url}/>
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
                secondaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextSecondary,
                  }
                }}
                secondary={item.artists[0].name}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const artists = (
    <div className={classes.resultsWrapper}>
      <Typography>Artists</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.artists.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.images[2] ? 
              <img className={classes.LIartistImg} alt={item.name} src={item.images[2].url}/>
            : (item.images[1]
              ? <img className={classes.LIartistImg} alt={item.name} src={item.images[1].url}/>
              : (item.images[0]
                ? <img className={classes.LIartistImg} alt={item.name} src={item.images[0].url}/>
                : <img className={classes.LIartistImg} alt={item.name}/>
                )
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const albums = ( 
    <div className={classes.resultsWrapper}>
      <Typography>Albums</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.albums.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.images[2] ? 
              <img className={classes.LIimg} alt={item.name} src={item.images[2].url}/>
            : (item.images[1]
              ? <img className={classes.LIimg} alt={item.name} src={item.images[1].url}/>
              : <img className={classes.LIimg} alt={item.name} src={item.images[0].url}/>
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
                secondaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextSecondary,
                  }
                }}
                secondary={item.artists[0].name}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const playlists = ( 
    <div className={classes.resultsWrapper}>
      <Typography>Playlists</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.playlists.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.images[2] ? 
              <img className={classes.LIimg} alt={item.name} src={item.images[2].url}/>
            : (item.images[1]
              ? <img className={classes.LIimg} alt={item.name} src={item.images[1].url}/>
              : <img className={classes.LIimg} alt={item.name} src={item.images[0].url}/>
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
                secondaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextSecondary,
                  }
                }}
                secondary={item.followers}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const shows = (
    <div className={classes.resultsWrapper}>
      <Typography>{'Podcast & Videos'}</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.shows.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.images[2] ? 
              <img className={classes.LIimg} alt={item.name} src={item.images[2].url}/>
            : (item.images[1]
              ? <img className={classes.LIimg} alt={item.name} src={item.images[1].url}/>
              : <img className={classes.LIimg} alt={item.name} src={item.images[0].url}/>
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const episodes = (
    <div className={classes.resultsWrapper}>
      <Typography>Podcast Episodes</Typography>
      <Divider className={classes.divider}/>
      <List className={classes.resultList}>
        {data.episodes.items.map((item) => (
          <ListItem className={classes.resultListItem} button key={item.id}>
            {item.images[2] ? 
              <img className={classes.LIimg} alt={item.name} src={item.images[2].url}/>
            : (item.images[1]
              ? <img className={classes.LIimg} alt={item.name} src={item.images[1].url}/>
              : <img className={classes.LIimg} alt={item.name} src={item.images[0].url}/>
              )
            } 
            <div className={classes.LItextWrapper}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "caption",
                  classes: {
                    root: classes.LItextPrimary,
                  }
                }}
              >
              </ListItemText>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      {songs}
      {artists}
      {albums}
      {playlists}
      {shows}
      {episodes}
    </div>
  )
}
