import { authConstants } from "./constants";
import axios from "../helpers/axios"

export const login = (user) => {

    console.log(user)
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/admin/signin', {
            ...user

        });
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))

            dispatch({
                type: authConstants.LOGIN_SUCCESSS,
                payload: {
                    token, user
                }

            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }


    }

}

{/*export const signup = (user) => {

        console.log(user)
        return async (dispatch)=>{
            dispatch({type:authConstants.LOGIN_REQUEST})
            const res = await axios.post('/admin/signup',{
                ...user
    
            });
            if(res.status === 200){
                const{message} = res.data;
                
                dispatch({
                    type:authConstants.LOGIN_SUCCESSS,
                    payload:{
                        token,user
                }
                
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload: {error:res.data.error}
                })
            }
        }
            
    
        }   
    
        }*/}



export const isUserLoggedin = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = localStorage.getItem('token')
            dispatch({
                type: authConstants.LOGIN_SUCCESSS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'failed tp login'

                }
            })

        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({type:authConstants.LOGOUT_REQUEST})
        const res = await axios.post('/admin/signout');
        if(res.status === 200){
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCESS })
    

        }else{
            dispatch({
                type : authConstants.LOGOUT_FAILURE,
                payload:{error:res.data.error}
            });

        }
    }



}
