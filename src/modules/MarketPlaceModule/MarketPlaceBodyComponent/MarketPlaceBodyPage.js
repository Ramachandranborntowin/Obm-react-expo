import React, {
  Component,
  useState,
  useEffect,
  memo,
  useCallback,
  useReducer,
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
// import { SearchBar } from 'react-native-elements';
// import Search from 'react-native-search-box';
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../../../config/color";
import { connect } from "react-redux";
import { getPasarListApi } from "../../../services/OrdersApi";
import useDateAndMonth from "../../../../config/customHooks/useDateAndMonth";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
// import Orderpending from './Orders/Orderpending'
import CustomTabview from "../../../../config/customComponents/custom_Tabview";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found";
// import { Searchbar } from 'react-native-paper';
import CustomSearchBar from "../../../../config/customComponents/custom_SearchBar";
import MarketPlaceCard from "../MarketplaceCardComponent/MarketPlaceCard";
import MarketPlaceModel from "../MarketPlaceOrderComponent/MarketPlaceModel";
import store from "../../../redux/store";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  img: {
    height: 35,
    width: 100,
  },
});
var dropDownFunction;
var dropDownValue;

const List = (...params) => {
  const [props, item, portalid, status, portalexternalid] = params;
  console.log("params", params);
  return (
    <MarketPlaceCard
      props={props}
      item={item}
      portalid={portalid}
      status={status}
      portalexternalid={portalexternalid}
    />
  );
};

const Tab = (...parms) => {
  const [props, status, portalid, portalexternalid] = parms;
  const [inprogress, setInprogress] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const onChangeSearch = (query) => setSearchQuery(query);
  console.log("portalexternalid", portalexternalid);
  useFocusEffect(
    useCallback(() => {
      if (
        portalid &&
        portalid != null &&
        portalexternalid &&
        portalexternalid != null
      ) {
        getPasarListApi(
          portalid,
          portalexternalid,
          status,
          props.loginData.data.merchant.id
        ).then((res) => {
          // setInprogress(res.data.data.result);
          if (res.data.success == 1) {
            setData(res.data.data.result);
          }
        });
      }
    }, [])
  );
  return data && data.length > 0 ? (
    <View style={{ backgroundColor: colors.gray_c, flex: 1 }}>
      <CustomSearchBar onChangeText={onChangeSearch} value={searchQuery} />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(item) =>
          List(props, item, portalid, status, portalexternalid)
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  ) : (
    <NorecordFound />
  );
};
const MarketPlaceBodyPage = (props) => {
  // const [portalname, dispatch] = useReducer(reducer, initialState);
  const [portalid, setPortalId] = useState(null);
  const [portalExternalId, setPortalExternalId] = useState(null);
  const [index, setIndex] = useState(0);
  const [isModel, setIsModel] = useState(false);
  dropDownFunction = setIsModel;
  dropDownValue = isModel;
  const grtExternalId = (id) => {
    // const {
    //   merchant_portals_id,
    //   merchant_portals_external_id,
    //   merchant_portals_merchant_id,
    // } = useMerchantidExternalid(id, props.loginData);
    console.log("external id", id);
    let portals = props.loginData.data.merchant_portals.find((d) => d.id == id);
    if (portals) {
      // return portals.external_id;
      return portals.external_id;
    } else {
      return false;
    }
  };
  // const selectPortal = ()=>{
  //   if (choosePortal != null) {
  //     if (choosePortal == 'Pasar') {
  //       setPortalId(2);
  //       setPortalExternalId(grtExternalId(2));
  //       return
  //     } else {
  //       setPortalId(3);
  //       setPortalExternalId(grtExternalId(3));
  //       return
  //     }
  //   } else if (grtExternalId(2)) {
  //     setPortalId(2);
  //     setPortalExternalId(grtExternalId(2));
  //     return
  //   } else if (grtExternalId(3)) {
  //     setPortalId(3);
  //     setPortalExternalId(grtExternalId(3));
  //     return
  //   }
  // }
  // const choosePortalMethod = (name)=>{
  //   if (name != null) {
  //     if (name == "Pasar") {
  //       setPortalId(2);
  //       setPortalExternalId(grtExternalId(2));
  //       store.dispatch({type: 'marketplacePortalSelection', data: "Pasar"});
  //     } else {
  //       setPortalId(3);
  //       setPortalExternalId(grtExternalId(3));
  //       store.dispatch({type: 'marketplacePortalSelection', data: "One Brunei"});
  //     }
  //   }
  // }
  useEffect(() => {
    if (props.portalname == "Pasar" && grtExternalId(2)) {
      setPortalId(2);
      setPortalExternalId(grtExternalId(2));
    } else {
      setPortalId(3);
      setPortalExternalId(grtExternalId(3));
    }
  }, [props.portalname]);
  // useEffect(() => {
  //   if (choosePortal != null) {
  //     if (choosePortal == "Pasar") {
  //       setPortalId(2);
  //       setPortalExternalId(grtExternalId(2));
  //       // props.setHeaderName(choosePortal)
  //       // dispatch("pasar")
  //       setChoosePortal("Pasar")
  //       store.dispatch({type: 'marketplacePortalSelection', data: "Pasar"});
  //     } else {
  //       setPortalId(3);
  //       setPortalExternalId(grtExternalId(3));
  //       // props.setHeaderName(choosePortal)
  //       // dispatch("Onebrunei")
  //       setChoosePortal("OneBrunei")
  //       store.dispatch({type: 'marketplacePortalSelection', data: "One Brunei"});
  //     }
  //   }
  //   // } else if (grtExternalId(2)) {
  //   //   setPortalId(2);
  //   //   setPortalExternalId(grtExternalId(2));
  //   // } else if (grtExternalId(3)) {
  //   //   setPortalId(3);
  //   //   setPortalExternalId(grtExternalId(3));
  //   // }
  // }, [choosePortal]);

  return (
    <>
      <MarketPlaceModel
        // selectPortal={selectPortal}
        // choosePortalMethod={choosePortalMethod}
        choosePortal={props.portalname}
        // setChoosePortal={setChoosePortal}
        setIsModel={setIsModel}
        isModel={isModel}
      />
      <View style={{ flex: 1, zIndex: -1 }}>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            backgroundColor: colors.secondary,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              flex: 1,
              alignSelf: "center",
            }}
          >
            {props.props.route.name}
          </Text>
        </View>
        {props.props.route.name == "Refund" ? (
          <CustomTabview
            renderScene_parent={{
              pending: () =>
                index == 0 && Tab(props, 0, portalid, portalExternalId),
              completed: () =>
                index == 1 && Tab(props, 2, portalid, portalExternalId),
              rejected: () =>
                index == 2 && Tab(props, 8, portalid, portalExternalId),
            }}
            routes_parent={[
              { key: "pending", title: "Pending", i: "0" },
              { key: "completed", title: "Completed", i: "1" },
              { key: "rejected", title: "Rejected", i: "2" },
            ]}
            index={index}
            setIndex={setIndex}
            secondaryTab={true}
          />
        ) : (
          <CustomTabview
            renderScene_parent={{
              pending: () =>
                index == 0 && Tab(props, 0, portalid, portalExternalId),
              inprogress: () =>
                index == 1 && Tab(props, 1, portalid, portalExternalId),
              completed: () =>
                index == 2 && Tab(props, 2, portalid, portalExternalId),
              rejected: () =>
                index == 3 && Tab(props, 8, portalid, portalExternalId),
            }}
            routes_parent={[
              { key: "pending", title: "Pending", i: "0" },
              { key: "inprogress", title: "In Progress", i: "1" },
              { key: "completed", title: "Completed", i: "2" },
              { key: "rejected", title: "Rejected", i: "3" },
            ]}
            index={index}
            setIndex={setIndex}
            secondaryTab={true}
          />
        )}
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("s", state);
  console.log("props protal name", state.Login.data.data.merchant_portals);
  return {
    portalname: state.MarketPlace,
    loginData: state.Login.data,
  };
};
const ModefiedMarketplaceBodyPage = (props) => {
  // console.log('props protal name', props.portalname);
  return (
    <CommonHigherOrderHeaderComponent
      pagename={MarketPlaceBodyPage}
      headeronPress={() => dropDownFunction(!dropDownValue)}
      headerTitle={"My Marketplace"}
      headerLeftIconType={"menu"}
      headerprops={props.props}
      headerTitle={"Marketplace"}
      headerChoosePortal={props.portalname}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedMarketplaceBodyPage);
