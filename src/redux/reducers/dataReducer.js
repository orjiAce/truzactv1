import {
    TOGGLE_AUTH_UI,
    MOB_MENU_UI,
    LOADING_UI,
    CLEAR_BANK_ERROR,
    DEPOSIT_FUND_ERROR,
    TOGGLE_HOME_MENU,
    DEPOSIT_FUND,
    LOADING_DATA,
    RESET_UI,
    TOGGLE_NOTIFICATION,
    ADD_BANK,
    ADD_BANK_ERR,
    BUY_CRYPTO,
    BUY_CRYPTO_ERROR,
    CLEAR_CRYPTO_ERRORS, SELL_CRYPTO_ERROR, SELL_CRYPTO
} from "../types";
import {noAuto} from "@fortawesome/fontawesome-svg-core";


const initialState = {
    isLoginUi: true,
    mobMenuState: false,
    errors: null,
    homeMenu: false,
    loading: false,
notificationState: false,
    loadingData: false,
    depositFund:null,
    depositFundError: null,
    addedBank: null,
    addBankErr:null,
    loadingAddBank: null,
    buyCrypto: null,
    buyCryptoErr: null,
    sellCrypto: null,
   sellCryptoErr: null,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_UI:
            return initialState
        case LOADING_UI :
            return {
                ...state,
                loading: true
            }
        case TOGGLE_NOTIFICATION:
            return {
                ...state,
                notificationState: !state.notificationState
            }
        case LOADING_DATA :
            return {
                ...state,
                loadingData: true
            }
        case TOGGLE_AUTH_UI:
            return {
                ...state,
                loading: false,
                isLoginUi: action.payload,
            }
        case MOB_MENU_UI:
            return {
                ...state,
                mobMenuState: !state.mobMenuState,
                loading: false
            }
        case TOGGLE_HOME_MENU:
            return {
                ...state,
                loading: false,
                homeMenu: !state.homeMenu,
            }
        case DEPOSIT_FUND:
            return {
            ...state,
                depositFund: action.payload,
                depositFundError: null,
                loadingData: false
        }
        case DEPOSIT_FUND_ERROR:
            return {
            ...state,
                depositFund:null,
                depositFundError: action.payload,
                loadingData: false
        }
        case ADD_BANK:
            return {
                ...state,
                loadingData: false,
                addBankErr: null,
                addedBank:action.payload
            }
        case ADD_BANK_ERR:
            return {
            ...state,
                loadingData: false,
                addBankErr: action.payload,
                addedBank: null
        }
        case CLEAR_BANK_ERROR:
            return {
                ...state,
                loadingData: false,
                addBankErr: null,
                addedBank: null

            }
        case CLEAR_CRYPTO_ERRORS:
            return {
                ...state,
                loadingData: false,
                buyCrypto: null,
                sellCrypto:null,
                buyCryptoErr:null,
                sellCryptoErr:null

            }
        case BUY_CRYPTO:
            return {
                ...state,
                loadingData: false,
                buyCrypto: action.payload,
                buyCryptoErr:null
            }
            case SELL_CRYPTO:
            return {
                ...state,
                loadingData: false,
                sellCrypto: action.payload,
                sellCryptoErr:null
            }
            case BUY_CRYPTO_ERROR:
            return {
                ...state,
                loadingData: false,
                buyCrypto: null,
                buyCryptoErr: action.payload
            }
            case SELL_CRYPTO_ERROR:
                console.log(action.payload)
            return {
                ...state,
                loadingData: false,
                sellCrypto: null,
                sellCryptoErr: action.payload
            }
        default:
            return state
    }
}