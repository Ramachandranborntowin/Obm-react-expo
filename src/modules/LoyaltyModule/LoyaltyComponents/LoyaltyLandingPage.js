import React, { Component, useState, useEffect, useCallback } from "react";
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
  Linking,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../../../config/color";
import CustomDate from "../../../../config/customComponents/custom_Date_Picker";
import { LoyaltyListApi } from "../../../services/LoyaltyApi";
import useDateAndMonth from "../../../../config/customHooks/useDateAndMonth";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found";
import { StyledLoyaltyDateImage, StyledLoyaltyDateText, StyledLoyaltyDateTouchableOpacity, StyledLoyaltyHeaderIconButton } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import { CustomDatePickerContainer2 } from "../../../../config/customComponents/custom_Date_Picker_Container";
import { StyledAccessIcon } from "../../../../config/customStylesComponents/customAccessIcon";
import LoyaltyTransactionHistoryCard from "./LoyaltyTransactionHistoryCard";
import {styles} from "../LoyaltyStyles/Styles";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import { StyledSettingsHeading } from "../../../../config/customStylesComponents/customSettingsStylesComponent";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const LoyaltyLandingpage = (props) => {
    const baseasserts = `../../../../assets/`;
    const [monthNames, weekday] =useDateAndMonth()
  const renderItem = ({ item }) => {
    let split_date = item.created_at.split(" ");
    let d = split_date[0].split("-");
    let t = split_date[1].split(":");
    var date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
    let dateandTime = `${monthNames[
      date.getMonth()
    ].toUpperCase()} ${date.getDate()},${date.getFullYear()}`;
    return (
      <LoyaltyTransactionHistoryCard
      split_date={split_date}
      props={props} 
      dateandTime={dateandTime} 
      item={item}/>
    );
  };

  console.log("loginData", props.loginData.data.merchant.id);
  const [displayDate, setDisplayDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSelector, setDateSelector] = useState();
  const [transactionList, setTransactionList] = useState([]);
  const [norecordsFound, setNorecordsFound] = useState(false);
  // let sDate = startDate != null && startDate.split("-");
  // let EDate = endDate != null && endDate.split("-");
  // console.log(sDate[0], sDate[1] - 1, sDate[2]);
  // let startD = startDate != null && new Date(sDate[0], sDate[1] - 1, sDate[2]);
  // let endD = endDate != null && new Date(EDate[0], EDate[1] - 1, EDate[2]);
  // console.log("daaaaaa", startD, endD);
  const toastmsg = (msg)=> {
    custom_Toast({message: msg});
  }
  useFocusEffect(
    useCallback(() => {
      if (startDate !== null || endDate !== null) {
        if (startDate !== null && endDate !== null && startDate < endDate) {
          let merchant_portals_id;
          let merchant_portals_external_id;
          props.loginData.data.merchant_portals.map((obj, index) => {
            if (obj.id == 6) {
              merchant_portals_id = obj.id;
              merchant_portals_external_id = obj.external_id;
            }
          });
          console.log(
            "p",
            merchant_portals_id,
            props.loginData.data.merchant.id,
            merchant_portals_external_id
          );
          LoyaltyListApi(
            merchant_portals_id,
            props.loginData.data.merchant.id,
            merchant_portals_external_id,
            startDate !== null && startDate,
            endDate !== null && endDate
          ).then((res) => {
            if (res.data.success == 1) {
              if (res.data.data.result.results.length > 0) {
                setTransactionList(res.data.data.result.results);
              }
            } else {
              setNorecordsFound(true);
            }
            console.log(res);
          });
        } else if (startDate > endDate) {
          toastmsg("start date is max than end date")
          // ToastAndroid.show(
          //   "start date is max than end date",
          //   ToastAndroid.SHORT
          // );
        }
      } else {
        let merchant_portals_id;
        let merchant_portals_external_id;
        props.loginData.data.merchant_portals.map((obj, index) => {
          if (obj.id == 6) {
            merchant_portals_id = obj.id;
            merchant_portals_external_id = obj.external_id;
          }
        });
        console.log(
          "p",
          merchant_portals_id,
          props.loginData.data.merchant.id,
          merchant_portals_external_id
        );
        LoyaltyListApi(
          merchant_portals_id,
          props.loginData.data.merchant.id,
          merchant_portals_external_id,
          startDate == null && "",
          endDate == null && ""
        ).then((res) => {
          if (res.data.success == 1) {
            if (res.data.data.result.results.length > 0) {
              setTransactionList(res.data.data.result.results);
            }
          } else {
            setNorecordsFound(true);
          }
          console.log(res);
        });
      }
    }, [startDate, endDate])
  );
  const IssuePoints = () => {
    props.navigation.navigate("IssuePoints");
  };
  const manageOffers = () => {
    props.navigation.navigate("ManageOffers");
  };
  const ValidateOffers = () => {
    props.navigation.navigate("ValidateOffers");
  };
  const hideDate = (dateStatus, date) => {
    console.log('ddd', dateStatus, date)
    setDisplayDate(dateStatus);
    if (dateSelector === "startDate") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  const headerOnPress = [{
      name: "Issue Point",
      onPress: IssuePoints,
  },
  {
    name: "Validate Offers",
    onPress: ValidateOffers,
 },
{
    name: "Manage Offers",
    onPress: manageOffers,
}]
  return (
    <>
    <View style={{ backgroundColor: colors.gray_c, height: "100%" }}>
      <View style={styles.container}>
          {headerOnPress.map((value)=>(
              <View>
              <TouchableOpacity onPress={value.onPress}>
                <StyledLoyaltyHeaderIconButton
                  source={value.name == 'Issue Point' ? require(`${baseasserts}image/issues_points_ic.png`)
                  :
                  (value.name == 'Validate Offers' ?require(`${baseasserts}image/validate_offer_ic.png`)
                  :
                  require(`${baseasserts}image/manage_offer_ic.png`))}
                />
              </TouchableOpacity>
              <StyledSettingsHeading style={{textAlign: 'center'}}>{value.name}</StyledSettingsHeading>
              {/* <Text style={styles.touchable_iconname}>{value.name}</Text> */}
            </View>
          ))}
      </View>
      <View style={styles.content_transaction_history}>
        <View style={{ backgroundColor: colors.primary }}>
          <View>
            <Text style={styles.content_transaction_history_text}>
              Transaction History
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <CustomDatePickerContainer2 
            date={startDate} 
            name={"Start Date"}
            onPress={() => {
                setDisplayDate(true);
                setDateSelector("startDate");
              }}/>
            <CustomDatePickerContainer2 
            // startD={startD}
            // endD={endD}
            date={endDate} 
            name={"End Date"}
            onPress={() => {
              setDisplayDate(true);
              setDateSelector("endDate");
            }}/>
            {displayDate ? (
              <CustomDate hideDate={hideDate} removeFutureDate={true} />
            ) : null}
          </View>
        </View>
      </View>
      {!norecordsFound ? (
        <FlatList
          data={transactionList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <NorecordFound />
      )}
    </View>
   {/* <QRscanner /> */}
    </>
  );
};
// export default Loyalty;
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedLoyaltyLandingpage = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={LoyaltyLandingpage}
    headerTitle={"Loyalty"}
    headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default connect(mapStateToProps, null)(ModefiedLoyaltyLandingpage);
