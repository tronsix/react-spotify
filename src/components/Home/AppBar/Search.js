import React from 'react';
import { ContentContext } from '../../../pages/Home';
import {
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../functions/getApi';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: 20,
    backgroundColor: theme.palette.common.white,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0, 0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#000000',
  },
  inputInput: {
    padding: theme.spacing(.5, .5, .5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const { contentDispatch } = React.useContext(ContentContext);
  const [value, setValue]= React.useState(''); 
  const prevVal = React.useRef(value);
  const inputRef = React.useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const updateContent = React.useCallback((obj) => {
    // on return of data from getApi dispatch content state update
    const data = obj.data;
    const response = obj.response;
    const endpoint = obj.endpoint;

    if (response.ok === false){
      contentDispatch({
        type: 'error',
        payload: {
          data,
          response
        }
      });
      return;
    }
    contentDispatch({
      type: 'success',
      payload: {
        data,
        response,
        endpoint
      }
    });
    // update prevVal to current value to prevent looping re-render
    prevVal.current = value;
  },[contentDispatch, prevVal, value]);

  React.useEffect(() => {
    // on initial render do nothing
    if (value === ''){ 
      return;
    } else if (prevVal.current !== value){ // on typing setTimeout
      const timer = setTimeout(() => {
        prevVal.current = inputRef.current.value;
        let params = {query: value};
        // when typing is finished getSearch
        // provide context, params, callback
        getApi('search', params)
          .then(updateContent)
          .catch( e => {
            console.error(e);
          })
      }, 2000);
      // on component unmount clear timer
      // this happens if user isn't finished typing
      return () => clearTimeout(timer); 
    }
  }, [value, prevVal, updateContent]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        inputRef={inputRef}
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </div>
  );
}
