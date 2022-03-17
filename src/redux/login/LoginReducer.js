import * as redux from 'redux'
import {Post_Data, Set_Token, Add_Token_Date, Add_ExpToken_Date, Common_Data} from '../login/LoginTypes'
const loginData = {
    data: {}
}
export const LoginReducer = (state = loginData, action)=>{
    switch(action.type){
        case Post_Data : {
            return {...state, data: action.payload}
            break;
        }
        default: {
            return {...state}
        }
    }
}
export const CommonDataReducer =  (state = {}, action)=>{
    switch(action.type){
        case Common_Data : {
            return {...state, data: action.payload}
            break;
        }
        default: {
            return {...state}
        }
    }
}