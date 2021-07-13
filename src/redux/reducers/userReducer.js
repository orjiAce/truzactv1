import {
    CLEAR_ERRORS, CLEAR_KYC_ERRORS, CLEAR_PASS_ERROR, LOADING_KYC, LOADING_PASS,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_ERRORS, SET_KYC, SET_KYC_ERROR, SET_PASS_ERROR, SET_SUCCESS,
    SET_UNAUTHENTICATED,
    SET_USER, UPDATE_PASS, UPDATE_USER_ERR, UPDATE_USER_IMAGE
} from "../types";

const initialState = {
    userData: [],
    loading: false,
    loadingPass: false,
    loadingKYC: false,
    kycData: null,
    updatePass: null,
    allData:[],
    authenticated: false,

    //errors
    errors: null,
    passError: null,
    kycError: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                loading: false
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            }
        case LOADING_PASS:
            return {
                ...state,
                loadingPass: true
            }
            case LOADING_KYC:
            return {
                ...state,
                loadingKYC: true
            }
       /* case LOADING_DATA:
            return {
                ...state,
                loadingData: true
            }*/
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case SET_SUCCESS:
            return {
                ...state,
                loading: false,
                successRes: action.payload
            }
        case SET_KYC:
            return {
                ...state,
                loadingKYC: false,
                kycData: action.payload,
                kycError: null
            }
        case SET_KYC_ERROR:
            return {
                ...state,
                loadingKYC: false,
                kycError: action.payload,
                kycData: null
            }
        case CLEAR_KYC_ERRORS:
            return {
                ...state,
                kycError: null,
                kycData:null
            }
        case UPDATE_PASS :
            return {
                ...state,
                loadingPass: false,
                updatePass: action.payload,
                passError: null,
            }
        case SET_PASS_ERROR:
            return {
              ...state,
                loadingPass: false,
                passError: action.payload,
                updatePass: null
            }

        case CLEAR_PASS_ERROR:
            return {
                ...state,
                passError: null,
                updatePass: null
            };
            case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case SET_UNAUTHENTICATED:

            //return initialState;
            return  initialState
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                userData: action.payload,
            }
        case UPDATE_USER_IMAGE:
            return {
                ...state,
                loading: false,
                errors: null,
                userData: action.payload,
            }
            case UPDATE_USER_ERR:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            }
        default:
            return state
    }

}