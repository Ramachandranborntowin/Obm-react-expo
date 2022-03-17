import React, { Component, useState, useEffect, memo } from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SectionList,
  Modal,
  Pressable,
} from "react-native";
const PrimaryTransactionList = ({data, ...props})=>{
    console.log('previousProps.data.length', data.length)
    console.log('nextProps.data.length', data.length)
    return(
        <SectionList
            progressViewOffset={100}
            sections={data}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={0}
            {...props}
            
          />
    )
}
const areEqual = (previousProps, nextProps) => {
    if (previousProps.data.length !== nextProps.data.length) {
      return false;
    } else {
      return true;
    }
  };
export default memo(PrimaryTransactionList, areEqual)