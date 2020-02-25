import React,{ Component } from 'react';
import { auth } from '../actions'
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';


export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component {
        state = {
            loading:true
        }

        componentWillMount(){
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps){
            this.setState({loading:false})

            if(!nextProps.auth.login.auth){
                if(reload){
                    this.props.history.push('/login');
                }
            } else {
                if(reload === false) {
                    this.props.history.push('/')
                }
            }
        }

        render(){
            if(this.state.loading){
                return (
                <Container component="main" maxWidth="lg">
                    <CircularProgress disableShrink />
                </Container>
                )
                
            }
            return(
                <ComposedClass {...this.props} auth={this.props.auth}/>
            )
        }
    }
    

    function mapStateToProps(state){
        return{
            auth:state.auth
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}