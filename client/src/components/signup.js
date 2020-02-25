import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

import { connect } from 'react-redux';
import { userRegister } from '../actions'

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component{

  state ={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
}

handleInputEmail = (event) => {
    this.setState({email:event.target.value})
} 
handleInputPassword= (event) => {
    this.setState({password:event.target.value})
} 
handleInputFirstName = (event) => {
    this.setState({firstname:event.target.value})
} 
handleInputLastname = (event) => {
    this.setState({lastname:event.target.value})
} 

componentDidUpdate(nextProps){
  if(nextProps.auth.login.auth){
      this.props.history.push('/')
  }
}

submitForm = (e) => {
    e.preventDefault();
    this.setState({error:''});
    this.props.dispatch(userRegister({
        email:this.state.email,
        password:this.state.password,
        firstname:this.state.firstname,
        lastname:this.state.lastname
    }))
    
}
  render(){
    const { classes } = this.props;
    let auth = this.props.auth;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.submitForm}>
            {
							auth.login ? 
							<Collapse in={auth.login.message}>
								<Alert severity="error"><div>{auth.login.message}</div></Alert>
							</Collapse>
							:null
						}
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={this.state.firstname}
                  onChange={this.handleInputFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputLastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleInputPassword}
                />
              </Grid>
              
            </Grid>
            <br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
       
      </Container>
    );
  }
}

function mapStateToProps(state){
	console.log(state)
	return {
			user:state.user
	}
}

export default connect(mapStateToProps)(withStyles(useStyles)(SignUp))