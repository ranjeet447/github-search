export default function(state={},action){

    switch(action.type){
        case 'GET_USERS':
            return {...state,usersList:action.payload}
        case 'GET_USER_DETAIL':
            return {...state,userData:action.payload}
        case 'GET_REPOS':
            return {...state,repos:action.payload}
        case 'CLEAR_USER_DETAIL':
            return {...state,userData:action.payload}   
        default:
            return state;
    }

}