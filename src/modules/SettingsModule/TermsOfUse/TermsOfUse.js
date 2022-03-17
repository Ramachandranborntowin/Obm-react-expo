import React, { Component, useState } from "react";
import { WebView } from "react-native-webview";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";

const TermsOfUse = ()=>  <WebView source={{ uri: "https://beep.solutions/terms" }} />;
const ModefiedTermsofUse = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={TermsOfUse}
    headerTitle={"TermsOfUse"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default ModefiedTermsofUse;
