import { combineReducers } from 'redux';
import users from './user_reducer';
import auth from './auth_reducer';

const rootReducer = combineReducers({
    users,auth
})

export default rootReducer;