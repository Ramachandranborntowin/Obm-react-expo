import * as redux from 'redux'
import LoaderReducer from './loader/LoaderReducer';
import { CommonDataReducer, LoginReducer } from './login/LoginReducer';
import EipiryAccessTokenDateReducer from './ExpiryAccessTokenReducer/ExpiryAccessTokenDateReducer';
import UserTokenReducer from './UserToken/UserTokenReducer';
import ExpiryTokenDateReducer from './ExpiryToken/ExpiryTokenReducer';
import {TransactionFilterDataReducer} from './TansactionFilter/TransactionFilterReducer';
import MarketPlaceReducer from './MarketPlace/MarketPlaceReducer';
import BiometricsReducer from './BiometricsValue/BiometricsReducer';
// import UserTokenReducer from './UserTokenReducer';
// import TransactionFilterReducer, { TransactionFilterDataReducer } from './TransactionFilterReducer'
// import TouchIdReducer from './TouchId/TouchIdReducer'
// import EipiryAccessTokenDateReducer from './ExpiryAccessTokenReducer'
// import MarketPlaceReducer from './MarketPlaceReducer'
// import EipiryTokenDateReducer from './ExpiryTokenReducer'
const RootReducer = redux.combineReducers({
    Login: LoginReducer,
    Loader: LoaderReducer,
    Token: UserTokenReducer,
    // TransactionFilter: TransactionFilterReducer,
    TransactionFilterData: TransactionFilterDataReducer,
    // TouchId:TouchIdReducer,
    EipiryAccessTokenDate: EipiryAccessTokenDateReducer,
    ExpiryToken: ExpiryTokenDateReducer,
    MarketPlace:MarketPlaceReducer,
    CommonData: CommonDataReducer,
    Biometrics: BiometricsReducer
    })
export default RootReducer;
