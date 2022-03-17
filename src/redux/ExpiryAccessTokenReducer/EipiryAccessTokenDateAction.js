import { Add_Token_Date } from "./ExpiryAccessTokenDateTypes";
const expiryAccessTokenDateAction  = (...props)=>{
    const [accessTokenExpDate] = props
    return (dispatch) => {
        dispatch({ type: Add_Token_Date, data: accessTokenExpDate });
    }
}
export default expiryAccessTokenDateAction