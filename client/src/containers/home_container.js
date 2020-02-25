import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersList,auth } from '../actions';
import { bindActionCreators } from 'redux';

import SearchBox from '../components/search_box';
import SearchResults from '../components/search_results';
import LogoutButton from '../components/logout'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

class HomeContainer extends Component { 

    // componentWillMount() {
    //     this.props.usersList()
    // }


    getKeywords = (event) => {
        let key = event.target.value;
        this.props.usersList(key)
    }


    render(){
        console.log(this.props.users) 
        const {classes} = this.props; 
        let auth = this.props.auth;    
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <PersonIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            user
                        </Typography>
                        <LogoutButton/>
                        </Toolbar>
                    </AppBar>
                </div>
                
                <SearchBox keywords={this.getKeywords}/>
                <SearchResults users={this.props.users.usersList}/>
            </div>
        )
    }
    
}


function mapStateToProps(state){
    return {
        users:state.users,
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({usersList,auth},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(HomeContainer))