import { Add_Exp_Token_Date } from "./ExpiryTokenTypes";
const expiryTokenAction  = (...props)=>{
    const [access_token] = props
    return (dispatch) => {
        dispatch({ type: Add_Exp_Token_Date, data: access_token });
    }
}
export default expiryTokenAction