import React from 'react';
import { AppContext } from '../../../App';
import {
  Avatar,
  Typography,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    backgroundColor: '#282828',
  },
  menuItem: {
    minWidth: 200,
    paddingLeft: 32,
    paddingRight: 32,
    color: '#B3B3B3',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .16)',
      color: '#FFFFFF',
    },
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  profileAvatar: {
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
  },
  profileName: {
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
  },
  profileArrow: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
  }
}));

export default function ProfileMenu(props) {
  const { state, dispatch } = React.useContext(AppContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  // const user = state.user;
  let name;
  let avatar;
  if (state.isLoggedIn === true) {
    name = state.user.display_name;
    avatar = state.user.images[0].url;
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen );
  };
  
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // using handle close for click away, because if handleToggle is used
  // the function will be called twice everytime the icon button is clicked. 
  // this function recognizes that if the anchorRef is the event target, then don't update state. 
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    props.history.push('/login');
    dispatch({ type: 'logout' });
  }

  // return focus to the button when we transition from true -> false
  // ie. opened to closed
  // prevOpen is assigned so there is refrence to the previous state of open.
  // so that on rerender the state isn't assigned to the initial state.
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.profile} ref={anchorRef}>
      <Avatar className={classes.profileAvatar} alt={name} src={avatar}></Avatar>
      <Typography className={classes.profileName} variant="body1">{name}</Typography>
      <IconButton
        aria-label="open profile menu"
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.arrowButton}>
        <KeyboardArrowDownIcon className={classes.profileArrow} />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} placement='bottom-end' transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={400}>
            <Paper className={classes.menuPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem className={classes.menuItem} 
                  onClick={handleLogout}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}