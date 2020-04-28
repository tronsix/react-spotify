import React from 'react';
import { AppContext } from '../../../App';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AlbumIcon from '@material-ui/icons/Album';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#121212',
  },
  drawerMenuItem: {
    padding: theme.spacing(1, 3),
    color: '#B3B3B3',
    '&:hover': {
      color: '#FFFFFF',
    },
  },
  drawerMenuListIcon: {
    minWidth: theme.spacing(5),
  },
  drawerMenuIcon: {
    color: '#B3B3B3',
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
  },
  drawerSubMenuTitle: {
    textTransform: 'uppercase',
    color: '#B3B3B3',
  },
  drawerSubMenuItem: {
    padding: theme.spacing(.5, 3),
    color: '#B3B3B3',
    '&:hover': {
      color: '#FFFFFF',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "linear-gradient(0deg, rgba(24,24,24,1) 0%, rgba(24,24,24,1) 75%, rgba(60,60,60,1) 100%)",
    height: 800,
  },
  // necessary for content to be below app bar
  toolbarSpace: {
    marginTop: theme.spacing(1),
  }
}));

export function MyDrawer(props) {
  const { state } = React.useContext(AppContext);
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open] = React.useState(false);
  const anchorRef = React.useRef(null);
  const isLoggedIn = state.isLoggedIn;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const playlists = (
    isLoggedIn === true ?
      <List>
        <ListItem className={classes.drawerSubMenuItem}>
          <ListItemText
            primaryTypographyProps={{
              variant: "caption",
              classes: {
                root: classes.drawerSubMenuTitle,
              }
            }}
          >
            Playlists
          </ListItemText>
        </ListItem>
        {state.playlists.items.map((playlist) => (
          <ListItem className={classes.drawerSubMenuItem} button key={playlist.id}>
            <ListItemText primary={playlist.name} />
          </ListItem>
        ))}
      </List>
      :
      <List><ListItemText primary='null' /></List>
  );

  const drawer = (
    <div>
      <div className={classes.toolbarSpace} />
      <List>
        {['Home', 'Browse'].map((text) => (
          <ListItem className={classes.drawerMenuItem} button key={text}>
            <ListItemIcon className={classes.drawerMenuListIcon}>
              {text === 'Home' ?
                <HomeIcon className={classes.drawerMenuIcon} />
                : <AlbumIcon className={classes.drawerMenuIcon} />
              }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {playlists}
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="navigation toolbar">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
