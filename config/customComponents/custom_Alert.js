import React, { memo } from "react";
import { Alert } from "react-native";
const custom_Alert = (props) => 
      Alert.alert(
        props.status,
        props.description,
    !props.notDisplayLink && [
      {
        text: "NOT NOW",
        style: "destructive",
      },
      { text: "YES", onPress: props.onPress },
    ],
    {
      cancelable: true,
    }
  )
export default custom_Alert;

// const { status, description, notDisplayLink, onPress } = props;