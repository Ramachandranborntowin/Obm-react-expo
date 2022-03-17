import React, { Component, useState, useEffect } from "react";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../../../config/color";
import { connect } from "react-redux";
import fontSize from "../../../../config/fontSize";
import {
  RefundRequest,
  Transactiondetial,
} from "../../../services/Transaction";
import CustomDollerIcon from "../../../../config/customIcon/customDollerIcon";
import { StyledTransactionAmountText } from "../../../../config/customStylesComponents/customTransactionList";
import { StyledQrImage } from "../../../../config/customStylesComponents/customQrgenerator";
import CustomTimeLine from "../../../../config/customComponents/cutom_Timeline";
import { StyledSmallQrImage } from "../../../../config/customStylesComponents/customAlipyIconSmall";
// import Modal from 'react-native-modal';
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
import { styles } from "../PaymentRequestStyles/TransactionDetailStyles";
import { StyledHorizontalline } from "../../../../config/customStylesComponents/customHorizontalLine";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import custom_Alert from "../../../../config/customComponents/custom_Alert";

const TransactionDetials = (props) => {
  const [displayQr, setDisplayQr] = useState(false);
  const [transactiondetial, setTransactiondetials] = useState({});
  const [transactiondetialstatusarray, setTransactiondetialstatusarray] =
    useState([]);
  const [transactiondetialpaytypearr, setTransactiondetialpaytypearr] =
    useState([]);
  const [data, setData] = useState([]);
  const [statusName, setStatusName] = useState();
  useEffect(() => {
    Transactiondetial(
      props.loginData.data.merchant.id,
      props.route.params.transactionid
    ).then((res) => {
      console.log("result", res.data.data.statusarr);
      setStatusName(res.data.data.statusarr[res.data.data.result.status]);
      setTransactiondetials(res.data.data.result);
      setTransactiondetialstatusarray(res.data.data.statusarr);
      setTransactiondetialpaytypearr(res.data.data.paytypearr);
      let d = [];
      res.data.data.result.paymenthistory.map((item) => {
        if (item.date_time) {
          d.push({
            title: res.data.data.statusarr[item.status],
            description: item.date_time,
            circleColor:
              res.data.data.statusarr[item.status] == "Qr Generated"
                ? colors.secondary
                : res.data.data.statusarr[item.status] == "Confirmed or success"
                ? colors.green
                : res.data.data.statusarr[item.status] == "Refund Rejected"
                ? colors.danger
                : res.data.data.statusarr[item.status] == "Refund Requested"
                ? colors.orange_combo
                : res.data.data.statusarr[item.status] == "Refunded"
                ? colors.success
                : colors.grey,
          });
          setData(d);
        }
      });
    });
  }, []);
  const issueRefund = () =>
  custom_Alert({
    status: "Refund the Amount",
    description: "Are sure you want to refund the amount?",
    onPress:  () => {
      RefundRequest(
        props.route.params.transactionid,
        props.loginData.data.merchant.id
      ).then((res) => {
        console.log(res.data.data.succ_msg);
        Alert.alert("Success", res.data.data.succ_msg),
          [{ text: "Okay" }];
        return;
      });
    },
  });
    // Alert.alert(
    //   "Refund the Amount",
    //   "Are sure you want to Refund",
    //   [
    //     {
    //       text: "NOT NOW",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "destructive",
    //     },
    //     {
    //       text: "YES",
    //       onPress: () => {
    //         RefundRequest(
    //           props.route.params.transactionid,
    //           props.loginData.data.merchant.id
    //         ).then((res) => {
    //           console.log(res.data.data.succ_msg);
    //           Alert.alert("Success", res.data.data.succ_msg),
    //             [{ text: "Okay" }];
    //           return;
    //         });
    //       },
    //     },
    //   ],
    //   {
    //     cancelable: true,
    //   }
    // );

  const data1 = [
    { key: "Transaction ID", value: transactiondetial.transaction_id },
    { key: "Date", value: props.route.params.date },
    {
      key: "Provider",
      value: transactiondetialpaytypearr[transactiondetial.pay_type],
    },
    { key: "Fee", value: transactiondetial.comm_amt },
    { key: "Reference", value: transactiondetial.device_id },
  ];
  const information_array = [
    { key: "Device ID", value: transactiondetial.device_id },
    { key: "External ID", value: transactiondetial.trans_no },
    { key: "Api Version", value: transactiondetial.api_version },
    { key: "Version", value: transactiondetial.app_version },
  ];
  return (
    <>
      <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomDollerIcon
                  source={require("../../../../assets/icons/doller.png")}
                />
                <StyledTransactionAmountText
                  fontSize={fontSize.Beep_large_font}
                >
                  {transactiondetial.pay_amount}
                </StyledTransactionAmountText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.qrCodeGenerator}>
                  <Text style={styles.qrCodetext}>{statusName}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ marginLeft: "auto", alignSelf: "center" }}
              onPress={() => setDisplayQr(!displayQr)}
            >
              <View>
                <StyledSmallQrImage
                  source={{ uri: transactiondetial.qr_img }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {displayQr && (
            <View style={{ alignItems: "center" }}>
              <StyledQrImage source={{ uri: transactiondetial.qr_img }} />
            </View>
          )}
          <StyledHorizontalline />
          <View style={styles.List}>
            {data1.map((item, index) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemKey}>{item.key}</Text>
                <Text style={{ color: colors.dark_grey, flex: 0.8 }}>
                  {item.value ? item.value : 'N/A'}
                </Text>
              </View>
            ))}
          </View>
          <StyledHorizontalline />
          <View style={{ margin: 15 }}>
            <Text style={styles.Headingtext}>Information</Text>
            {information_array.map((item) => (
              <View style={styles.listForIformation}>
                <Text style={styles.listItemKey}>{item.key}</Text>
                <Text style={{ color: colors.dark_grey, flex: 0.8 }}>
                  {item.value ? item.value : 'N/A'}
                </Text>
              </View>
            ))}
          </View>
          <StyledHorizontalline />
          <View style={styles.containerforTracking}>
            <Text style={styles.Headingtext}>History</Text>
            <ScrollView>
              <CustomTimeLine data={data} />
            </ScrollView>
          </View>
          <StyledHorizontalline />
          {/* {data.map((item)=>(
              <View style={{minHeight: 70, borderLeftColor: 'grey', borderLeftWidth: 1, position: 'relative', marginLeft: 20}}>
              <IonIcon name={'ellipse'} style={{position: 'absolute', top: -5, left: -7, color: 'grey', fontSize: 15}}/>
              <View style={{position: 'absolute', top: -5, left: 10}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
              <Text>{item.description}</Text>
              </View>
            </View>
          ))} */}
        </ScrollView>
        {transactiondetial.status == 2 && (
          <TouchableOpacity
            onPress={() => issueRefund()}
            style={{
              borderWidth: 2,
              borderColor: colors.dot_light_screen1,
              borderRadius: 7,
              margin: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: colors.dot_light_screen1,
                padding: 20,
                fontSize: fontSize.Beep_iconSize_2,
              }}
            >
              ISSUE REFUND
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("stateTransaction", state);
  return {
    loginData: state.Login.data,
  };
};
const ModefiedTransactionDetials = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={TransactionDetials}
      headerTitle={"Transaction Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedTransactionDetials);
// export default connect(mapStateToProps, null)(TransactionDetials);
