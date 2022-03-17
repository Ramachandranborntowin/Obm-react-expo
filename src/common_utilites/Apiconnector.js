// import { connect } from 'react-redux';
import * as React from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import LoaderAction from '../redux/loader/LoaderAction'
import { set_Token, remove_Token } from "../redux/UserToken/UserTokenTypes";
// import { useNavigation } from '@react-navigation/native';
const updatedAccessToken = (...props) => {
  // const navigation = useNavigation();
  const [method, url, data, headers, dissableLoader] = props;
  console.log('dissableLoader', dissableLoader)
  // if(dissableLoader){
  // store.dispatch(LoaderAction(false));
  // }else{
  //   store.dispatch(LoaderAction(true));
  // }

  if (method == "Get") {
    dissableLoader ? store.dispatch(LoaderAction(false)) : store.dispatch(LoaderAction(true))
    return axios.get(url).then((response) => {
      console.log("Apiconnectorsuccess", response.status);
      store.dispatch(LoaderAction(false));
      // validation(response.status, response.response.data.error)
      if(response.status == 200){
        return new Promise((resolve, reject) => {
              console.log('resolve', response)
              resolve(response);
            })
      }

      if (response.response.data.error == 10) {
        store.dispatch(LoaderAction(true));
        return axios.get(`refreshtoken`).then(async (res) => {
          // console.log('refreshtoken welcome', res.response.data.error)
          store.dispatch(LoaderAction(false));
          if(res.status == 200){
            await AsyncStorage.setItem("userToken", res.data.access_token);
            if ((await AsyncStorage.getItem("userToken")) !== null) {
              store.dispatch({
                type: "setToken",
                data: await AsyncStorage.getItem("userToken"),
              });
              store.dispatch({
                type: "AddUpdateTokenDate",
                data: res.data.access_token_exp,
              });
              console.log('method', method);
                return axios.get(url)
            }
          }
          if (res.response.data.error == 10) {
            console.log("refreshToken hello", res.response.data.error);
            store.dispatch({
              type: remove_Token,
              data: await AsyncStorage.removeItem("userToken"),
            });
            // navigation.navigate("Login")
          }
        });
      }
    })
    
  } if (method == "Post") {
    dissableLoader ? store.dispatch(LoaderAction(false)) : store.dispatch(LoaderAction(true))
    return axios.post(url, data, headers).then((response) => {
      console.log("Apiconnectorsuccess", response.status);
      store.dispatch(LoaderAction(false));
      // validation(response.status, response.response.data.error)
      if(response.status == 200){
        return new Promise((resolve, reject) => {
              console.log('resolve', response)
              resolve(response);
            })
      }

      if (response.response.data.error == 10) {
        store.dispatch(LoaderAction(true));
        return axios.get(`refreshtoken`).then(async (res) => {
          // console.log('refreshtoken welcome', res.response.data.error)
          store.dispatch(LoaderAction(false));
          if(res.status == 200){
            await AsyncStorage.setItem("userToken", res.data.access_token);
            if ((await AsyncStorage.getItem("userToken")) !== null) {
              store.dispatch({
                type: "setToken",
                data: await AsyncStorage.getItem("userToken"),
              });
              store.dispatch({
                type: "AddUpdateTokenDate",
                data: res.data.access_token_exp,
              });
              console.log('method', method);
                return axios.post(url, data, headers);
            }
          }
          if (res.response.data.error == 10) {
            console.log("refreshToken hello", res.response.data.error);
            store.dispatch({
              type: remove_Token,
              data: await AsyncStorage.removeItem("userToken"),
            });
            // navigation.navigate("Login")
          }
        });
      }
    })
  }
};
export default updatedAccessToken;
