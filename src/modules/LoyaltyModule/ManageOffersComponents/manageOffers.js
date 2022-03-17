import React, {
  Component,
  useCallback,
  useState,
  useWindowDimensions,
} from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Text,
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
  ScrollViewComponent,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import fontSize from "../../../../config/fontSize";
// import TabNavigator from './tabs';
import colors from "../../../../config/color";
import { useFocusEffect } from "@react-navigation/core";
import { ManageOfferApi } from "../../../services/LoyaltyApi";
import { connect } from "react-redux";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found";
import axios from "axios";
import CustomAddIcon from "../../../../config/customIcon/customAddIcon";
import CustomTabview from "../../../../config/customComponents/custom_Tabview";
import {styles} from "../LoyaltyStyles/ManageOffers";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import { StyledGreenText } from "../../../../config/customStylesComponents/customLoyaltyComponents";
// import ViewPager from '@react-native-community/viewpager';
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").Width);

// const CheckImageURL = (...params) => {
//   const [url] = params;
//   fetch(url)
//     .then((res) => {
//       if (res.status == 404) {
//         return (
//           <Image
//             source={require("../../../../assets/image/dummyimage.jpg")}
//             style={styles.img}
//           />
//         );
//       } else {
//         return <Image source={{ uri: `${url}` }} style={styles.img} />;
//       }
//     })
//     .catch((err) => {
//       return (
//         <Image
//           source={require("../../../../assets/image/dummyimage.jpg")}
//           style={styles.img}
//         />
//       );
//     });
//   //  return <Image source={require('../../../images/dummyimage.jpg')} style={styles.img}/>
// };
let uploadUrl = '';

const filtermerchanPortals = (props) => {
  let merchant_portals_id;
  let merchant_portals_external_id;
  props.loginData.data.merchant_portals.map((obj, index) => {
    if (obj.id == 6) {
      merchant_portals_id = obj.id;
      merchant_portals_external_id = obj.external_id;
    }
  });
  return {
    merchant_portals_id,
    merchant_portals_external_id,
  };
};

const List = (...params) => {
  const [props, item, status] = params;
  console.log("n", item.item);
  console.log("hello", item.item);
  return (
    <>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("LoyaltyDetails", item)}
      >
        <View style={styles.listContainer}>
          {console.log('hello', item.item)}
          {/* {checkImageURL(`https://brpatrick.beepxs.solutions/uploads/${item.item.img}`)} */}
          {/* <CheckImageURL url={`https://brpatrick.beepxs.solutions/uploads/${item.item.img}`}/> */}
          <Image
            source={
              item.item && item.item.img
                ? {
                    uri: `${uploadUrl}${item.item.img}`,
                  }
                : require("../../../../assets/image/dummyimage.jpg")
            }
            // { uri: `https://brpatrick.beepxs.solutions/uploads/${item.item.img}` }
            style={styles.img}
          />
          <View style={styles.content}>
            <Text>{item.item.merchant_name}</Text>
            <Text
              style={{ marginTop: 10, fontSize: fontSize.Beep_description }}
            >
              {item.item.title}
            </Text>
            <Text
              style={{ marginTop: 10, fontSize: fontSize.Beep_description }}
            >
              {item.item.branch_names != null && item.item.branch_names}
            </Text>
          </View>
          <View
            style={{ marginLeft: "auto", paddingTop: 5, alignSelf: "center" }}
          >
            <StyledGreenText style={{textAlign: 'center'}}>{item.item.code}</StyledGreenText>
            <Text
              style={{
                color: colors.BeepplusTextColor,
                fontSize: fontSize.Beep_description,
              }}
            >
              {item.item.start_on}
            </Text>
            <Text
              style={{
                color: colors.BeepplusTextColor,
                fontSize: fontSize.Beep_description,
              }}
            >
              {item.item.end_on}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
const commonTabGetData = (props, tabPageNo)=>{
      const { merchant_portals_id, merchant_portals_external_id } =
        filtermerchanPortals(props);
        return ManageOfferApi(
          merchant_portals_id,
          props.loginData.data.merchant.id,
          merchant_portals_external_id,
          tabPageNo
        )
}
const Tab = (props, tabvalue)=>{
  const [data, setData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      commonTabGetData(props, tabvalue).then((res) => {
        if (res.data.success == 1) {
          uploadUrl = res.data.data.upload_url;
          setData(res.data.data.results);
        }
      });
    }, [])
  );
  return data.length > 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(item) => List(props, item, 1)}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <NorecordFound />
    );
}
const ManageOffers = (props) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={styles.container}
        >
          <Text
            style={[styles.headingText, {
              textAlign: "center",
              flex: 1,
              alignSelf: "center",
            }]}
          >
            Manage Offers
          </Text>
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => props.navigation.navigate("AddOffer")}
          >
            <View>
              <Text
                style={styles.headingText}
              >
                Add New Offer
              </Text>
              <CustomAddIcon textAlign={"center"} />
            </View>
          </TouchableOpacity>
        </View>
        <CustomTabview
          renderScene_parent={{
            pending: () => index == 0 && Tab(props, 0),
            ongoing: () => index == 1 && Tab(props, 1),
            expired: () => index == 2 && Tab(props, 8),
          }}
          routes_parent={[
            { key: "pending", title: "PENDING" },
            { key: "ongoing", title: "ONGOING" },
            { key: "expired", title: "EXPIRED" },
          ]}
          index={index}
          setIndex={setIndex}
        />
      </View>
    </>
  );
};
// export default ManageOffers;
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedManageOffer = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={ManageOffers}
    headerTitle={"Manage Offers"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default connect(mapStateToProps, null)(ModefiedManageOffer);
