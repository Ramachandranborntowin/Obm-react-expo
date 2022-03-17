import { transaction_Filter, transaction_Filter_Data } from "./TransactionFilterTypes";

export const TransactionFilterDataReducer = (state = {}, action)=>{
    switch (action.type) {
        case transaction_Filter_Data:
            return action.data;
            break;
        default:
            return state;
    }
}