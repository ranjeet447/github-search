import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import axios from 'axios';

const useStyles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    text:{
        textDecoration: 'none', color: 'black',
        textAlign: 'center',
    },
    paper: {
        alignItems: 'center',
        width: '100%',
	},
  });

class RepoList extends Component{

    constructor() {
        super()
        this.state = {
          repos: [],
        }
      }

      async componentDidMount() {
        const {data} = await axios.get(this.props.url)
        this.setState({repos: data})
      }
    
    render(){
        const {classes}=this.props;
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {this.state.repos.map( repo =>{
                        return(
                            <div className={classes.paper} key={repo.id}>
                            <a href={repo.html_url} >
                                <div className={classes.text}>
                                <ListItem button>
                                <Typography  variant="h5" component="h2">
                                    {repo.name}
                                </Typography>
                                <ListItemSecondaryAction>
                                    Language : 
                                    <Typography  variant="h6" component="h3">
                                    {repo.language}
                                    </Typography>
                                </ListItemSecondaryAction>
                                </ListItem>
                                </div>
                            </a>
                            <Divider/>
                        </div>
                        )
                    })}                            
                </List>
            </div>
        )
    }
   
}

export default withStyles(useStyles)(RepoList);