import React, {
  Component,
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../../../config/color";
import axios from "axios";
import { connect } from "react-redux";
import {
  QrgeneratorApi,
  TransactionSuccessApi,
} from "../../../services/QrgeneratorApi";
import IonIcon from "react-native-vector-icons/Ionicons";
// import * as DeviceInfo from "expo-device";
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import CustomQrSanner from "../../../../config/customIcon/customScannerIcon";
import CustomDollerIcon from "../../../../config/customIcon/customDollerIcon";
import CustomFooterButton from "../../../../config/customComponents/custom_Footer_Button";
import Qr from './Qr'
import QrScanner from "../../../../config/projectDependency/QrScanner";
import { styles } from "../PaymentRequestStyles/Orgeneratorstyles";
import QrSucessful from "./QrSucessfulpage";
import Constants from 'expo-constants';
import {CustomBlackHeader} from "../../../../config/customComponents/custom_Header";
import custom_Alert from "../../../../config/customComponents/custom_Alert";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const QrgeneratorLandingPage = (props) => {
  // console.log('qrgeneratorprops',props.loginData.data)
  const [qrImage, setQrImage] = useState();
  const [displayqrcode, setDisplayqrcode] = useState(true);
  const [recived, setRecived] = useState();
  const [provider, setProvider] = useState();
  const [date, setDate] = useState();
  const [displayQr, setDisplayQr] = useState(false);
  const isFocused = props.navigation.isFocused();
  console.log("isfocused", isFocused);
  // return () => {
  //     // Do something when the screen is unfocused
  //     // Useful for cleanup functions
  //   };
  const sendScanedData = () => {
  }
  useFocusEffect(
    useCallback(() => {
      let data = new FormData();
      data.append("amount", props.route.params);
      data.append("user_id", props.loginData.data.user.id);
      data.append("merchant_id", props.loginData.data.merchant.id);
      data.append("device_id", Constants.deviceId);
      let interval;
      QrgeneratorApi(data).then((res) => {
        console.log("res", res);
        setQrImage(res.data.link);
        let count = 0;

        interval = setInterval(() => {
          count = count + 1;
          TransactionSuccessApi(
            props.loginData.data.merchant.id,
            res.data.data.id
          ).then((res) => {
            console.log(
              res.data.data.paytypearr[res.data.data.result.pay_type],
              res.data.data.result.paid_at
            );
            if (+res.data.success && res.data.data.result.status == 2) {
              setDisplayqrcode(false);
              clearInterval(interval);
              setRecived(res.data.data.result.pay_amount);
              setDate(res.data.data.result.paid_at);
              setProvider(
                res.data.data.paytypearr[res.data.data.result.pay_type]
              );
            } else if (+res.data.success && res.data.data.result.status > 2) {
              clearInterval(interval);
              custom_Alert({
                status: "Failed",
                description: res.data.data.result.status,
                onPress: () => {
                  props.navigation.navigate("Transaction", {
                    rebuildTransaction: true,
                  });
                },
              });
              // Alert.alert("Failed", res.data.data.result.status),
              //   [
              //     {
              //       text: "Okay",
              //       onPress: () => {
              //         props.navigation.navigate("Transaction", {
              //           rebuildTransaction: true,
              //         });
              //       },
              //     },
              //   ];
              return;
            } else {
              if (count >= 10) {
                clearInterval(interval);
                props.navigation.navigate("Transaction", {
                  rebuildTransaction: true,
                });
              }
            }
          });
        }, 30000);
      });
      return () => {
        clearInterval(interval);
        console.log("demount qr");
      };
    }, [])
  );
  return (
    <>
    {/* <CustomBlackHeader Title={"Qr Generated"} leftIconType={"back"} props={props}/> */}
      {!displayQr ? (
        <View style={styles.container}>
          {/* <Text>{qrImage}</Text> */}
          <TouchableOpacity
            style={styles.orscannericoncontainer}
            onPress={() => setDisplayQr(true)}
          >
            <CustomQrSanner textAlign={"center"} />
          </TouchableOpacity>
          <View style={{ height: deviceHeight, marginTop: 5, flex: 6 }}>
            <View style={styles.card_header}>
              <CustomDollerIcon />
              <Text style={styles.card_header_number}>
                {" "}
                {props.route.params}{" "}
              </Text>
            </View>
            {displayqrcode ? (
              <Qr qrimage={qrImage} />
            ) : (
              <QrSucessful received={recived} provider={provider} date={date} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <CustomFooterButton
              onPress={() => props.navigation.navigate("New sale")}
              title={"START NEW SALE"}
            />
          </View>
        </View>
      ) : (
        <QrScanner sendScanedData={sendScanedData} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};

const ModefiedQrgeneratorLandingPage = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={QrgeneratorLandingPage}
    headerTitle={"Qr Generated"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    headerSecondary={true}
    {...props}
    />
  )
  }
export default connect(mapStateToProps, null)(ModefiedQrgeneratorLandingPage);

// export default connect(mapStateToProps, null)(QrgeneratorLandingPage);
