import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import UserView from './components/user_view';
import LogIn from './components/login';
import SignUp from './components/signup';

import Auth from './components/auth';

const Routes = () => {
        return(
            <Switch>
                <Route path="/" exact component={Auth(Home,true)}/>
                <Route path="/user/:username" exact component={Auth(UserView,true)}/>
                <Route path="/login" exact component={Auth(LogIn,false)}/>
                <Route path="/signup" exact component={Auth(SignUp,false)}/>
            </Switch>
        )
}

export default Routes;