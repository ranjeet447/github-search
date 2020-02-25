import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    text:{
        textDecoration: 'none', color: 'blue',
        textAlign: 'center',
    },
    paper: {
		
        alignItems: 'center',
        width: '100%',
	},
  }));

const SearchResults = (props) =>{
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
            { props.users && props.users.length > 0 ?
                props.users.map( item => (
                    <div className={classes.paper} key={item.id}>
                        
                        <Link to={`/user/${item.login}`} username={item.login} key={item.id} className={classes.text} >
                            <ListItem button>
                                <Avatar alt={item.login} src={item.avatar_url} />   
                                <ListItemText primary={item.login} />
                            </ListItem>
                        </Link>
                        <Divider/>
                        </div>
                )) : null
            }
            </List>
        </div>
    )
}

export default SearchResults;