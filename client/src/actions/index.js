import axios from 'axios';
const URL = 'https://api.github.com';


export function usersList(keywords){
    const request = axios.get(`${URL}/search/users?q=${keywords}`).then(response => response.data.items)
    return {
        type: 'GET_USERS',
        payload: request
    }
}


export function usersListAll(keywords){
    const request = axios.get(`${URL}/search/users?q=${keywords}`).then(response => response.data)
    return {
        type: 'GET_USERS_ALL',
        payload: request   
    }
}

export function userDetail(username){
    const request = axios.get(`${URL}/users/${username}`).then(response => response.data)
    return {
        type: 'GET_USER_DETAIL',
        payload: request   
    }
}


export function clearUserDetail(){
    return{
        type:'CLEAR_USER_DETAIL',
        payload:null
    }
}
export function getRepos(url){
    const request = axios.get(url).then(response => response.data)
    return{
        type:'GET_REPOs',
        payload:request
    }
}

/*========= USER ===========*/

export function loginUser({email,password}){
    console.log('login',{email,password});
    const request = axios.post('/api/login',{email,password},{withCredentials:true}).then(response => response.data)
    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth',{withCredentials:true}).then(response => response.data);
    return {
        type:'USER_AUTH',
        payload:request
    }

}


export function userRegister(user){
    const request = axios.post(`/api/signup`,user,{withCredentials:true}).then(response => response.data);
    return {
        type:'USER_REGISTER',
        payload:request
    
    }
}