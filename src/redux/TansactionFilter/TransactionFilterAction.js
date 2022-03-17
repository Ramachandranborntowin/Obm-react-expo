import { transaction_Filter } from "./TransactionFilterTypes";
export const TransactionFilterAction = (data)=>{
    return (dispatch) => {
        dispatch({
            type: transaction_Filter,
            payload: data
          });
    }
  }
  export default TransactionFilterAction;