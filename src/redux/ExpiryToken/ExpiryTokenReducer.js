import { Add_Exp_Token_Date } from "./ExpiryTokenTypes";
const ExpiryTokenDateReducer = (state = null, action) => {
    switch (action.type) {
        case Add_Exp_Token_Date:
            return action.data;
            break;
        default:
            return state;
    }
}

export default ExpiryTokenDateReducer;