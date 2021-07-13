import axios from 'axios'
import redaxios from 'redaxios'
import {
    CLEAR_ERRORS,
    SET_ERRORS,
    SET_USER,
    LOADING_USER,
    SET_UNAUTHENTICATED,
    SET_KYC,
    UPDATE_PASS,
    SET_PASS_ERROR,
    CLEAR_KYC_ERRORS,
    SET_KYC_ERROR,
    LOADING_PASS,
    LOADING_KYC, TOGGLE_AUTH_UI, DEPOSIT_FUND, RESET_UI, UPDATE_USER_IMAGE, UPDATE_USER_ERR
} from "../types";


const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
    }
};
export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/signupuser.php', newUserData, config)
        .then((res) => {
            // dispatch(getUserData());
            //dispatch({type: CLEAR_ERRORS});

            console.log(res.data)
            if (res.data.status === '200') {
                setAuthorizationHeader(res.data.member.Token);
                dispatch({
                    type: SET_USER,
                    payload: res.data
                });
                dispatch({type: CLEAR_ERRORS})
                history.push('/dashboard')
                //window.location.href = '/dashboard'
            } else {
                dispatch({
                    type: SET_ERRORS,
                    payload: res.data
                });
            }

        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            console.log(err)
        });
};


export const loginUser =  (userData, history) => async (dispatch) => {
    dispatch({type: LOADING_USER});

    await axios
        .post('/loginuser.php', userData, {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Credentials': 'true'
        })
        .then((res) => {

            if (res.data.status === '200') {
                setAuthorizationHeader(res.data.member.Token);
                dispatch({
                    type: SET_USER,
                    payload: res.data
                });
                dispatch({type: CLEAR_ERRORS})
                dispatch({
                    type: TOGGLE_AUTH_UI,
                    payload:true
                })
                history.push('/dashboard')
            } else {
                dispatch({
                    type: SET_ERRORS,
                    payload: res.data
                });
                setTimeout(() =>{
                    dispatch({
                        type: CLEAR_ERRORS
                    })
                }, 7000)
            }


        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};


export const setKyc = (kycData) => async (dispatch) => {
    dispatch({type: LOADING_KYC})
    await redaxios.post('https://truzact.com/api/v0/php/kyc.php', kycData)
        .then((res) => {
            if (res.data.status === '200') {
                dispatch({
                    type: SET_KYC,
                    payload: res.data
                });
                dispatch({type: CLEAR_KYC_ERRORS})
            } else {
                dispatch({
                    type: SET_KYC_ERROR,
                    payload: res.data
                })
                dispatch({
                    type: SET_KYC,
                    payload: []
                });
            }
        }).catch((err) => {
            console.log(err.response)
        })
}


export const updatePassword = (data) => async (dispatch) => {
    dispatch({type: LOADING_PASS})
     await redaxios.post('https://truzact.com/api/v0/php/updatepass.php', data).then((res) => {

        if (res.data.status === '200') {
            dispatch({
                type: UPDATE_PASS,
                payload: res.data
            });
        } else {
            dispatch({
                type: SET_PASS_ERROR,
                payload: res.data
            });

        }

         console.log(data)
    }).catch(err => {
        console.log(err.response)
    })
}


export const getUserData = (token) => (dispatch) => {
    dispatch({type: LOADING_USER});
    redaxios.post('/user.php', token, config)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

export const updateUserImage = (userData) => (dispatch) =>{
    dispatch({type: LOADING_USER})
    redaxios.post('/updateuser.php',userData)
        .then((res) =>{
            if(res.data.status === '200'){
                dispatch({
                    type: UPDATE_USER_IMAGE,
                    payload: res.data
                })


            }else{
                dispatch({
                    type: UPDATE_USER_ERR,
                    payload: res.data
                })
            }
            console.log(res.data)

        }).catch((err) =>{

    })
}


export const logoutUser = (history) => (dispatch) => {
    history.push('/')
    localStorage.removeItem('TRZACTIdToken');
    localStorage.removeItem('persist:truzactMember');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    dispatch({type: RESET_UI})

    //window.location.href = '/'

};


const setAuthorizationHeader = (token) => {
    const TRZACTIdToken = `${token}`;
    localStorage.setItem('TRZACTIdToken', TRZACTIdToken);
    axios.defaults.headers.common['Authorization'] = TRZACTIdToken;
};