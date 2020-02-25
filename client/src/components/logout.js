import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const LogoutButton = (props) => {
    var logout=function (){
        axios.get(`/api/logout`).then(request =>{
            window.location='/login'
        })
    } 
   
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button color="inherit" onClick={logout}>
                Logout <ExitToAppRoundedIcon />
            </Button>
        </div>
    );
};

export default LogoutButton;