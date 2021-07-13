import {
    TOGGLE_AUTH_UI,
    TOGGLE_HOME_MENU,
    LOADING_DATA,
    DEPOSIT_FUND,
    DEPOSIT_FUND_ERROR,
    BUY_CRYPTO,
    BUY_CRYPTO_ERROR,
    SELL_CRYPTO,
    SELL_CRYPTO_ERROR, TOGGLE_NOTIFICATION, ADD_BANK, ADD_BANK_ERR,

} from "../types";
import axios from "axios";
import redaxios from "redaxios";


const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
    }
};

export const toggleAuth = (toggleValue) => (dispatch) => {
    dispatch({
        type: TOGGLE_AUTH_UI,
        payload: toggleValue
    })
}

export const toggleHomeMenu = () => (dispatch) => {
    dispatch({
        type: TOGGLE_HOME_MENU,
    })
}

export const depositFund = (depositData) => async (dispatch) => {
    dispatch({type: LOADING_DATA})
    await axios.post('', depositData).then((res) => {
        if (res.data.status === '200') {
            dispatch({
                type: DEPOSIT_FUND,
                payload: res.data
            })
        } else {
            dispatch({
                type: DEPOSIT_FUND_ERROR,
                payload: res.data
            })
        }
    }).catch((err) => console.log(err))
}


export const buyCryptoFunc = (depositData) => async (dispatch) => {
    dispatch({type: LOADING_DATA})
    await redaxios.post('https://truzact.com/api/v0/php/buy.php', depositData).then((res) => {
        if (res.data.status === '200') {
            dispatch({
                type: BUY_CRYPTO,
                payload: res.data
            })
        } else {
            dispatch({
                type: BUY_CRYPTO_ERROR,
                payload: res.data
            })
        }
        console.log(depositData)
        console.log(res.data)
    }).catch((err) => console.log(err))
}


export const sellCryptoFunc = (depositData) => async (dispatch) => {
    dispatch({type: LOADING_DATA})
    await redaxios.post('https://truzact.com/api/v0/php/sell.php', depositData).then((res) => {
        if (res.data.status === '200') {
            dispatch({
                type: SELL_CRYPTO,
                payload: res.data
            })
        } else {
            dispatch({
                type: SELL_CRYPTO_ERROR,
                payload: res.data
            })
        }
       // console.log(res.data)
    }).catch((err) => console.log(err))
}

export const addBankFunc = (addBankDetails) => async (dispatch) => {
    dispatch({type: LOADING_DATA})
    await redaxios.post('https://truzact.com/api/v0/php/add-bank.php', addBankDetails, config)
        .then((res) => {
            if(res.data.status === '200'){
                dispatch({
                    type: ADD_BANK,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: ADD_BANK_ERR,
                    payload:res.data
                })

            }

console.log(res.data)
    }).catch((err) => console.log(err))
}

export const toggleNotification = () => (dispatch) => {
    dispatch({
        type: TOGGLE_NOTIFICATION
    })
}
