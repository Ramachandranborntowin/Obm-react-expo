import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, memo, useCallback } from "react";
import {connect} from 'react-redux'
import React, { Component, useState } from "react";
import store from "../../src/redux/store";
import { SHOW_BIOMETRICS, HIDE_BIOMETRICS } from "../../src/redux/BiometricsValue/BiometricsTypes";
import BiometricsAction from "../../src/redux/BiometricsValue/BiometricsAction";
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  BackHandler,
  AppStateEvent,
  AppState
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/core";
import { Paragraph, Dialog, Portal } from 'react-native-paper';
const biometrics = async (props) => {
  console.log('biometrics', props)
  // const [count, setCount] = useState(0)
  // useFocusEffect(
  //   function NotImplementedError(message = "") {
  //     this.name = "NotImplementedError";
  //     this.message = message;
  // }
  // NotImplementedError.prototype = Error.prototype;
  let bio = {}
    console.log('touch id use bio', JSON.parse(await AsyncStorage.getItem("TouchId")))
    let touchid = JSON.parse(await AsyncStorage.getItem("TouchId"))
    if (touchid) {
      const supotedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (supotedBiometrics[0]) {
        const biometricRecords = await LocalAuthentication.isEnrolledAsync();
        if (biometricRecords) {
           let result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Beepplus Biometrics',
            cancelLabel: '',
            fallbackLabel: 'Fallback',
            // disableDeviceFallback: true
        });
        if(!result.success){
          // await AsyncStorage.setItem("setBiometrics", JSON.stringify(true))
          store.dispatch(BiometricsAction({...bio, value: true}))
          // BackHandler.exitApp()
          // let  a = test.connect.close;
          // console.log(a)
          // return true
        }else{
          store.dispatch(BiometricsAction({...bio, value: false}))
          // await AsyncStorage.setItem("setBiometrics", JSON.stringify(false))
          return false
        }
        // if(result.error){
        //   setCount((previousCount)=>previousCount+1)
        // }
        // setBiometricsRepeat({...biometricsRepeat, value: !result.success})
           console.log(result)
          // return result.success;
        }
      }
    }
  }
// const mapStateToProps = (state) => {
//   return {
//     Touchid: state.TouchId,
//   };
// };
// export default connect(mapStateToProps, null)(UseBiometrics);
export default biometrics

export const Biometrics = (props)=>{
  // props.navigation.addListener('didFocus',()=>{
  //   console.log('hello')
  // })
  useFocusEffect(
    useCallback(() => {
      biometrics()
    }, [])
  )
  return <></>
}
