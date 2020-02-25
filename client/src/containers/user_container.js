import React,{ Component } from 'react';

import { connect } from 'react-redux';
import { userDetail,clearUserDetail,getRepos } from '../actions';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import LogoutButton from '../components/logout'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RepoList from '../components/repo_list'

import axios from 'axios';

const useStyles =  theme => ({
    media: {
      height: 460,
    },
    root: {
        flexGrow: 1,
      },
      backButton: {
        marginRight: theme.spacing(2),
        textDecoration: 'none',
        color:'white'
      },
      title: {
        flexGrow: 1,
      },
  });

class UserContainer extends Component {

    

    componentDidMount() {
        this.props.userDetail(this.props.match.params.username);
    }

    componentWillUnmount(){
        this.props.clearUserDetail();
    }

    getReposList=(url)=>{
        var repos=[];
        axios.get(url).then(response =>{
            repos=response.data
            console.log(repos)
            return this.repo(repos)
            // (
            //     <div>
            //     <List component="nav" aria-label="secondary mailbox folders">
            //         {repos.length > 0?
            //             repos.map((repo)=>(
            //                 <div key={repo.id}>
            //                 <Link to={repo.html_url} >
            //                     <ListItem button>
            //                     <Typography gutterBottom variant="h5" component="h2">
            //                         {repo.name}
            //                     </Typography>
            //                         <ListItemText primary={`Language ${repo.language}`} />
            //                     </ListItem>
            //                 </Link>
            //                 <Divider/>
            //                 </div>
            //             ))
            //          :<h6>No data</h6>
            //          }
            //    </List>
            //    </div>
            // )
        });
        
    }

    repo=(repos)=>(
        repos.length > 0?
            repos.map((repo)=>(
                <div key={repo.id}>
                <Link to={repo.html_url} >
                    <ListItem button>
                    <Typography gutterBottom variant="h5" component="h2">
                        {repo.name}
                    </Typography>
                        <ListItemText primary={`Language ${repo.language}`} />
                    </ListItem>
                </Link>
                <Divider/>
                </div>
            ))
            :<h6>No data</h6>

    )
    userTemplate = (data,classes) => {
        return data.userData ? 
            <div>
            
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <Link to="/">
                    <IconButton edge="start" className={classes.backButton} color="inherit">
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        {data.userData.login}
                    </Typography>
                    <LogoutButton/>
                    </Toolbar>
                </AppBar>
            </div>
            <br/>
            <div>
                <Container component="main" maxWidth="xs">
                    <Card>
                    <CardMedia
                        className={classes.media}
                        image={data.userData.avatar_url}
                        title={data.userData.login}
                        />
                    </Card> 
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.userData.name}
                    </Typography>
                </Container>
            </div>
            <div>
            <Typography gutterBottom variant="h4" component="h2">
                Repos
            </Typography>
            </div>
                <RepoList url={data.userData.repos_url}/>
            </div>
        :null

    }
    
    render(){
        const {classes} = this.props; 
        return (
            <div>
            {this.userTemplate(this.props.users,classes)}
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        users:state.users
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({userDetail,clearUserDetail,},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(UserContainer))