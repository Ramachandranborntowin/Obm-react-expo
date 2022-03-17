import {Add_Token_Date, Add_Update_Token_Date} from './ExpiryAccessTokenDateTypes'
const EipiryAccessTokenDateReducer = (state = null, action) => {
    switch (action.type) {
        case Add_Token_Date:
            return action.data;
            break;
        case Add_Update_Token_Date:
            return action.data;
            break;
        default:
            return state;
    }
}

export default EipiryAccessTokenDateReducer;