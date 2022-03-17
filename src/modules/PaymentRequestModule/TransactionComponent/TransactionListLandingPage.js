import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  memo,
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
  Modal,
  Pressable,
  SectionList,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { connect } from "react-redux";
import colors from "../../../../config/color";
import store from "../../../redux/store";
// import TransactionFilterAction from '../Actions/TransactionFilterAction'
import {
  TransactionList,
  TransactionFilter,
} from "../../../services/Transaction";
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found";
import useDateAndMonth from "../../../../config/customHooks/useDateAndMonth";
import BottomNavigation from "../../../../config/customComponents/custom_Bottom_Naviation";
import TransactionListCard from "../../../../config/customComponents/custom_Transaction_List_Card";
import styles from "../PaymentRequestStyles/TransactionStyles";
import TransactionFilterModel from "./TransactionFilter";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import useDateAndMonthOutputText from "../../../../config/customHooks/useDateAndMonthOutputText";
import PrimaryTransactionList from "./PrimaryTransactionList";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

let filterFunction;
let filterValue;
const TransactionLists = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [status_obj, setStatus_Obj] = useState();
  const [transactionList, setTransactionList] = useState();
  const [offset, setOffset] = useState(0);
  const isFocused = useIsFocused();
  const [displayMarketPlace, setDisplayMarketPlace] = useState(false);
  const [displayLoyalty, setDisplayLoyalty] = useState(false);
  const [headerRightModelVisible, setHeaderRightModelVisible] = useState(false);
  const [loadMoreDataCount, setLoadMoreDataCount] = useState(1);
  const [listerrorvalues, setListerrorvalues] = useState(0);

  const [filterdatas, setFilterDatas] = useState({
    startDate: "",
    endDate: "",
    status: "",
    payType: "",
  });

  const [monthNames, weekday] = useDateAndMonth();
  // useFocusEffect(
    useFocusEffect(
      useCallback(() => {
    console.log("transaction filter", props.transactionFilter);
    setFilterDatas({});
    TransactionList(props.loginData.data.merchant.id, "", "", "", 0, "").then(
      (res) => {
        console.log("resultssssss", res);
        if (res.data.error) {
          setListerrorvalues(res.data.error);
          setData([]);
          return;
        } else {
          setStatus_Obj(res.data.data.statusarr);
          setData(res.data.data.result);
          store.dispatch({
            type: "transactionFilterData",
            data: {
              statusarray: res.data.data.statusarr,
              paytypearr: res.data.data.paytypearr,
            },
          });
        }
      }
    );

    setDisplayMarketPlace(false);
    if (
      props.loginData.data.merchant_portals &&
      props.loginData.data.merchant_portals.length > 0
    ) {
      props.loginData.data.merchant_portals.map((obj, index) => {
        if (obj.id == 2 || obj.id == 3) {
          console.log("hello");
          if (
            obj.external_id !== null &&
            obj.external_id !== undefined &&
            +obj.external_id >= 0
          ) {
            setDisplayMarketPlace(true);
            // displayMarketPlace = true
          }
        }
        if (obj.id == 6) {
          if (
            obj.external_id !== null &&
            obj.external_id !== undefined &&
            +obj.external_id >= 0
          ) {
            setDisplayLoyalty(true);
          }
        }
      });
    }
  }, []));
  // );
  // useEffect(() => {
  //   // props.loginData.data.user.id,

  //   console.log("prrr", props.transactionFilter);
  //   let startdate = props.transactionFilter.startDate || "";
  //   let enddate = props.transactionFilter.endDate || "";
  //   let status = props.transactionFilter.status || "";
  //   let paytype = props.transactionFilter.paytype || "";
  //   TransactionList(props.loginData.data.merchant.id,
  //     startdate,
  //     enddate,
  //     status,
  //     paytype
  //     ).then((res) => {
  //       console.log("pass", res);
  //       if(res.data.error){
  //           Alert.alert('Failed', res.data.err_msg), [
  //                       { text: 'Okay' },
  //                   ];
  //                   return;
  //       }else{
  //       setStatus_Obj(res.data.data.statusarr);
  //       setTransactionList(res.data.data.result);
  //       store.dispatch({
  //         action: "transactionFilterData",
  //         data: {
  //           statusarray: res.data.data.statusarr,
  //           paytypearr: res.data.data.paytypearr,
  //         },
  //       });
  //     }
  //     });
  // }, [props.transactionFilter]);
  const filterDatas = useCallback(
    (data) => {
      console.log('filterdatas');
      console.log("data", data);
      setFilterDatas({
        ...filterdatas,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        payType: data.paytype,
      });
      setListerrorvalues(0)
      TransactionList(
        props.loginData.data.merchant.id,
        data.startDate,
        data.endDate,
        data.status,
        data.paytype
      ).then((res) => {
        console.log("pass", res);
        if (res.data.error) {
          setListerrorvalues(res.data.error);
          setData([]);
          return;
        } else {
          setLoadMoreDataCount(1);
          setData(res.data.data.result);
        }
      });
    },
    [filterdatas]
  );
  let c = 0;
  const renderItem = (item) => {
    console.log("item", item);
    const [date, H_M] = useDateAndMonthOutputText(item.created_at);
    return (
      <TransactionListCard
        status={"Alipay"}
        status_obj={status_obj}
        H_M={H_M}
        item={item}
        props={props}
        dateandTime={date}
      />
    );
  };
  const loadMoreData = () => {
    console.log("loadmoredata");
    setListerrorvalues(0);
    TransactionList(
      props.loginData.data.merchant.id,
      filterdatas.startDate || "",
      filterdatas.endDate || "",
      filterdatas.status || "",
      loadMoreDataCount,
      filterdatas.payType || ""
    ).then((res) => {
      console.log("resultssssss", res);
      // console.log('resultsss',res.data.data.result)
      //   store.dispatch(TransactionFilterAction({}));
      if (res.data.error) {
        // Alert.alert("Faid", res.data.err_msg), [{ text: "Okay" }];
        setListerrorvalues(1);
        return;
      } else {
        setLoadMoreDataCount(loadMoreDataCount + 1);
        setData([...data, ...res.data.data.result]);
      }
    });
  };
  const onRefreshing = () => {
    console.log("onRefreshing");
    setRefreshing(true);
    setListerrorvalues(0);
    setLoadMoreDataCount(0);
    TransactionList(
      props.loginData.data.merchant.id,
      filterdatas.startDate || "",
      filterdatas.endDate || "",
      filterdatas.status || "",
      0,
      filterdatas.payType || "",
      true
    ).then((res) => {
      if (res.data.error) {
        setRefreshing(false);
        setListerrorvalues(1);
        return;
      } else {
        setRefreshing(false);
        setData(res.data.data.result);
        return;
      }
    });
  };
  // const onEndReached = () => {
  //   if (!listerrorvalues) {
  //     loadMoreData();
  //   }
  // };

  // const PrimaryList = useCallback(()=>{
  //   return(
  //     <SectionList
  //           progressViewOffset={100}
  //           sections={data}
  //           refreshing={refreshing}
  //           removeClippedSubviews={true}
  //           onRefresh={onRefreshing}
  //           keyExtractor={(item, index) => item.id}
  //           ListEmptyComponent={<View style={{minHeight: deviceHeight}}><NorecordFound /></View>}
  //           renderItem={({ item }) => renderItem(item)}
  //           onEndReached={() => {
  //             if(!listerrorvalues){
  //               loadMoreData();
  //             }
  //           }}
  //           onEndReachedThreshold={0.5}
  //           renderSectionHeader={({ section: { date } }) => {
  //             let d = date.split("-");
  //             let dates = new Date(d[2], d[1] - 1, d[0]);
  //             return (
  //               <View style={{ backgroundColor: colors.date_bg }}>
  //                 <Text style={styles.dayDate}>
  //                   {weekday[dates.getDay()]}, {dates.getDate()}{" "}
  //                   {monthNames[dates.getMonth()].toUpperCase()}{" "}
  //                   {dates.getFullYear()}
  //                 </Text>
  //               </View>
  //             );
  //           }}
  //         />
  //   )
  // },[data])
  console.log("transaction list", transactionList);
  console.log("transaction list", headerRightModelVisible);
  filterFunction = setHeaderRightModelVisible;
  filterValue = headerRightModelVisible;
  return (
    <>
      <TransactionFilterModel
        isModalVisible={headerRightModelVisible}
        onPress={() => setHeaderRightModelVisible(!headerRightModelVisible)}
        filterDatas={filterDatas}
      />

      <View style={{ flex: 1, backgroundColor: colors.primary, zIndex: -1 }}>
        {console.log("datacomming repeat", data)}
        <PrimaryTransactionList
          data={data}
          refreshing={refreshing}
          onRefresh={onRefreshing}
          ListEmptyComponent={
            <View style={{ minHeight: deviceHeight }}>
              <NorecordFound />
            </View>
          }
          renderItem={({ item }) => renderItem(item)}
          onEndReached={()=>{
            if (!listerrorvalues) {
              loadMoreData();
            }
          }}
          renderSectionHeader={({ section: { date } }) => {
            let d = date.split("-");
            let dates = new Date(d[2], d[1] - 1, d[0]);
            return (
              <View style={{ backgroundColor: colors.date_bg }}>
                <Text style={styles.dayDate}>
                  {weekday[dates.getDay()]}, {dates.getDate()}{" "}
                  {monthNames[dates.getMonth()].toUpperCase()}{" "}
                  {dates.getFullYear()}
                </Text>
              </View>
            );
          }}
        />
        <BottomNavigation
          displayMarketPlace={displayMarketPlace}
          displayLoyalty={displayLoyalty}
          displayreceivedpayments={
            !Number(props.loginData.data.merchant.alipay_hide)
          }
        />
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("stateTransaction", state);
  return {
    loginData: state.Login.data,
    refreshToken: state.Token,
    // transactionHistory: state.Transaction,
    // transactionFilter: state.TransactionFilter,
  };
};

const ModefiedTransactionListsPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={TransactionLists}
      headeronPress={() => filterFunction(!filterValue)}
      headerTitle={"Transaction"}
      headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedTransactionListsPage);
// export default connect(mapStateToProps, null)(TransactionLists);
