import React, { useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post_Data, Common_Data } from "../login/LoginTypes";
import store from "../store";
import expiryAccessTokenDateAction from "../ExpiryAccessTokenReducer/EipiryAccessTokenDateAction";
import expiryTokenAction from "../ExpiryToken/ExpiryTokenAction";
import setUserTokenAction from "../UserToken/UserTokenAction";
import LoaderAction from "../loader/LoaderAction";
import { commonData, LoginApi } from "../../services/LoginApi";
const LoginAction = (username, password) => {
  return (dispatch) => {
    LoginApi(username, password)
      .then(async (res) => {
        // handle success
        if (res.status === 200 && res.data.success) {
          console.log('hello')
          console.log("r", res.data.access_token_exp);
          console.log("re", res.data.refresh_token_exp);
          console.log("access", res.data.access_token);
          await AsyncStorage.setItem("userToken", res.data.access_token);
          await AsyncStorage.setItem("Login", JSON.stringify(res.data));
          await AsyncStorage.setItem("refreshToken", res.data.refresh_token);
          commonData().then( async(res)=>{
            console.log('common data', res.data)
            await AsyncStorage.setItem("commonData", JSON.stringify(res.data));
            // dispatch({ type: Common_Data, payload: res.data });
          })
          // dispatch({ type: Post_Data, payload: res.data });
          dispatch(
            setUserTokenAction(await AsyncStorage.getItem("userToken"))
          );
          dispatch(
            expiryAccessTokenDateAction(res.data.access_token_exp)
          );
          dispatch(expiryTokenAction(res.data.refresh_token_exp));
          // res.data.access_token
          // console.log(res.data.access_token);
          // console.log("store", store.getState());
        } else if (res.data.err_msg) {
          Alert.alert("Failed", res.data.err_msg), [{ text: "Okay" }];
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export default LoginAction;
