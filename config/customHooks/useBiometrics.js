import * as LocalAuthentication from "expo-local-authentication";
// import { useEffect } from "react";
// import {connect} from 'react-redux'
// import React, { Component, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
export default useBiometrics = async ()=>{
    let enableRerender = true
    console.log('touch id use bio', JSON.parse(await AsyncStorage.getItem("TouchId")))
    let touchid = JSON.parse(await AsyncStorage.getItem("TouchId"))
    const setEnableRerender = async ()=>{
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
        });
        enableRerender = result.success
        // return result.success
        //    console.log(result)
          // return result.success;
        }
      }
    }
}
 !enableRerender && setEnableRerender()
}