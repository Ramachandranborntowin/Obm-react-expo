import React from "react";
import axios from "axios";
import store from "../redux/store";
import LoaderAction from "../redux/loader/LoaderAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UatBaseUrl, DevelopmentBaseUrl, ProductionBaseUrl } from "./URL";
import { Alert } from "react-native";

axios.interceptors.request.use(
  async (request) => {
    if (request.url == "refreshtoken") {
      console.log("refreshtoken");
      const token = await AsyncStorage.getItem("refreshToken");
      request.headers.Authorization = `Bearer ${token}`;
    } else if (request.url.split("?")[0] !== "user/login") {
      const token = await AsyncStorage.getItem("userToken");
      request.headers.Authorization = `Bearer ${token}`;
    } else {
      request.headers.Authorization = "";
    }
    // if(request.url.split('?')[0] !== "transaction/verify"){
    //   store.dispatch(LoaderAction(true));
    //   }
    request.url = `${UatBaseUrl}${request.url}`;
    console.log("request hello", request);

    return request;
  },
  function (error) {
    // store.dispatch(LoaderAction(false));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("response", response);
    // store.dispatch(LoaderAction(false));
    return response;
  },
  (error) => {
    if (error.response.status === 401 && error.response.data.error != 10) {
      Alert.alert("FAILD", "Unauthorized", [{ text: "OK" }]);
    } else if (error.response.status === 500) {
      Alert.alert("FAILD", "Internal Server Error", [{ text: "OK" }]);
    } else if (error.response.status === 404) {
      Alert.alert("FAILD", "Page Not Found", [{ text: "OK" }]);
    } else if (error.response.status === 403) {
      Alert.alert("FAILD", "Access Forbidden", [{ text: "OK" }]);
    } else if (error.response.status === 503) {
      Alert.alert("FAILD", "Service Unavailable", [{ text: "OK" }]);
    }
    return error;
    // console.log(error);

    // if(error.response.data.error == 10 && error.response.data.err_msg == "Expired token"){
    //   axios.get(`refreshtoken`).then(async(res)=>{
    //     console.log('oooo', res.data.access_token)
    //     await AsyncStorage.setItem('userToken', res.data.access_token)
    //     if(await AsyncStorage.getItem('userToken') !== null){
    //       console.log('ooo', await AsyncStorage.getItem('userToken'))
    //       store.dispatch({type: 'setToken', data:await AsyncStorage.getItem('userToken')});
    //     }
    //    })
    // }
    // store.dispatch(LoaderAction(false));
    // return Promise.reject(error);
    // return error;
  }
);

// https://uat.beep.solutions/mob/api/
