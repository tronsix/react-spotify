import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ContentContext } from '../../../pages/Home'
import ErrorContent from './ErrorContent'
import SearchContent from './SearchContent'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: (104, 148),
    background: "linear-gradient(0deg, rgba(24,24,24,1) 0%, rgba(24,24,24,1) 75%, rgba(60,60,60,1) 100%)",
    minHeight: window.innerHeight,
    height: 'fit-content',
    color: '#FFFFFF'
  },
  // necessary for content to be below app bar
  toolbarSpace: {
    marginTop: theme.spacing(1),
  }
}));

export default function Content() {
  const classes = useStyles();
  const {contentState} = React.useContext(ContentContext);
  const main = React.useRef(null);
  const data = contentState.data;
  const response = contentState.response;
  const endpoint = contentState.endpoint;

  const resizeContent = () => {
    let wh = window.innerHeight;
    main.current.style.minHeight = `${wh}px`;
  }
  window.onresize = resizeContent;

  let content;
  if (response !== null){
    if (response.ok !== true){
      content = <ErrorContent data={data} status={response.status}/>
    } else if (endpoint === 'search'){
      content = <SearchContent data={data} />
    }
  } else {
    content = <div> Null </div>;
  }

  return (
    // need to wrap content in a container to limit window width
    <main ref={main} className={classes.content}>
      <div className={classes.toolbarSpace} />
      {content}
    </main>
  )
}