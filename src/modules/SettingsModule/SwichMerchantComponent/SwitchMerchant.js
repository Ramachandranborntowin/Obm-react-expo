import React, { Component, useEffect, useState } from "react";
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
  Modal,
  Pressable,
} from "react-native";
import colors from "../../../../config/color"
import fontSize from "../../../../config/fontSize";
import { connect } from "react-redux";
import store from "../../../redux/store"
import { merchantDetails } from "../../../services/MerchantDetails";
import { Post_Data } from "../../../redux/login/LoginTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchMerchantCart from "../../../../config/customComponents/custom_SwitchMerchant"
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_c,
    height: deviceHeight,
  },
});

const selectMerchantId = (id, props) => {
  console.log(id, props)
  merchantDetails(id).then(async (res) => {
    console.log(res.data.data.merchant_portals);
    props.loginData.data.merchant = res.data.data.data;
    props.loginData.data.merchant_portals = res.data.data.merchant_portals;
    console.log(res.data.data.merchant_portals[0].id);
    // store.dispatch({ type: Post_Data, payload: props.loginData });
    if(res.data.data.merchant_portals[0].id == 6){
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Loyalty" }],
      });
    }else{
      props.navigation.reset({
        index: 0,
        routes: [{ name: "New sale" }],
      });
    }
    await AsyncStorage.setItem("Login", JSON.stringify(props.loginData));
  });
};
const SwitchMerchant = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <FlatList
          data={props.loginData.data.merchantlist}
          renderItem={({ item }) => (
            <SwitchMerchantCart
              onPress={selectMerchantId}
              props={props}
              item={item}
            />
          )}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  console.log("stateTransaction", state);
  return {
    loginData: state.Login.data,
  };
};

const ModefiedSwitchMerchant = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={SwitchMerchant}
    headerTitle={"SwitchMerchant"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default connect(mapStateToProps, null)(ModefiedSwitchMerchant);

// export default connect(mapStateToProps, null)(SwitchMerchant);
