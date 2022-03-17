import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import IonIcon from "react-native-vector-icons/Ionicons";
import CustomDate from "../../../../config/customComponents/custom_Date_Picker";
import { connect } from "react-redux";
import store from "../../../redux/store";
import colors from "../../../../config/color";
import { Modal, Checkbox } from "react-native-paper";
import {
  StyledTransactionFilterContainerHeader,
  StyledTransactionFilterHeader,
  StyledTransactionFilterContainerHeaderText,
  StyledTransactionFilterDoneButton,
  StyledTransactionFilterDateContainer,
  StyledTransactionFilterDateText,
} from "../../../../config/customStylesComponents/customTransactionFilter";
import CustomDatePickerContainer1 from "../../../../config/customComponents/custom_Date_Picker_Container";
import CustomCheckbox from "../../../../config/customComponents/custom_Checkbox";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const TransactionFilterModel = memo((props) => {
  const { isModalVisible, onPress, filterDatas } = props;

  const Lists = ({ name, subList, ...listsparams }) => {
    // const {name, ...listsparams} = params
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // paddingLeft: 10,
          // paddingRight: 10
          padding: 10,
        }}
      >
        <Text
          style={[
            subList && { paddingLeft: 20, color: colors.grey },
            { marginRight: "auto" },
          ]}
        >
          {name}
        </Text>
        <CustomCheckbox {...listsparams} />
      </View>
    );
  };
  // const CustomCheckbox = (props) => {
  //   return (
  //     <Checkbox
  //       containerStyle={{ marginLeft: "auto" }}
  //       uncheckedColor={colors.green}
  //       color={colors.green}
  //       {...props}
  //       //   darkgreen
  //     />
  //   );
  // };

  const [provider, setProvider] = useState(false);
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSelector, setDateSelector] = useState();
  const [subStatus, setSubStatus] = useState([]);
  const [subProvider, setSubProvider] = useState([]);
  const [statusValue, setStatusValue] = useState(null);
  const [providerValue, setProviderValue] = useState(null);
  useEffect(() => {
    if (props.filterData.statusarray) {
      let status = [];
      for (let key in props.filterData.statusarray) {
        if (props.filterData.statusarray.hasOwnProperty(key)) {
          status.push({
            key: props.filterData.statusarray[key],
            value: false,
          });
        }
      }
      console.log("ststus", status);
      setSubStatus(status);
    }
    if (props.filterData.paytypearr && props.filterData.paytypearr.length > 0) {
      let payType = [];
      props.filterData.paytypearr.map((item) => {
        payType.push({
          key: item,
          value: false,
        });
      });
      setSubProvider(payType);
    }
  }, [store.getState().TransactionFilterData]);
  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  const hideDate = useCallback(
    (dateStatus, date) => {
      if (dateSelector === "startDate") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setDisplayDate(dateStatus);
    },
    [displayDate]
  );
  const tostmsg = (msg) => {
    // ToastAndroid.showWithGravity(
    //   `${msg}`,
    //   ToastAndroid.LONG,
    //   ToastAndroid.BOTTOM
    // );
    custom_Toast({message: `${msg}`});
  };
  const done = () => {
    const data = {
      startDate: startDate || "",
      endDate: endDate || "",
      status: statusValue || "",
      paytype: providerValue || "",
    };
    // setModalVisible(!isModalVisible);
    console.log(data.status);
    if (!provider && !status && !date) {
      tostmsg("Nothing was selected");
    } else if (date && data.startDate && data.endDate == null) {
      tostmsg("Enter end date");
    } else if (date && data.startDate == null && data.endDate) {
      tostmsg("Enter start date");
    } else if (date && data.startDate > data.endDate) {
      tostmsg("Start date not greater than endDate");
    } else if (date && data.startDate == null && data.endDate == null) {
      tostmsg("please Enter the Dates");
    } else if (status && data.status == null) {
      tostmsg("Status not equal to null");
    } else if (provider && data.provider == null) {
      tostmsg("provider not equal to null");
    } else {
      // console.log('hello', data)
      // store.dispatch(TransactionFilterAction(data));
      filterDatas(data);
      clear();
      onPress();
    }
  };
  const enableList = (...props) => {
    const [enableprovider, enablestatus, enabledate] = props;
    console.log(enableprovider, enablestatus);
    setProvider(enableprovider);
    setStatus(enablestatus);
    setDate(enabledate);
  };
  const clear = () => {
    setProvider(false);
    setStatus(false);
    setDate(false);
    let clearProvider = [];
    let clearStatus = [];
    subProvider.map((item, index) => {
      item.value = false;
      clearProvider.push(item);
    });
    setSubProvider(clearProvider);
    subStatus.map((item) => {
      item.value = false;
      clearStatus.push(item);
    });
    setSubStatus(clearStatus);
    setStartDate(null);
    setEndDate(null);
    setStatusValue(null);
  };

  // const initialValues = {
  //   provider: false,
  //   status: false,
  //   date: false,
  // };

  // const onSubmit = (values, onSubmitProps) => {
  //   console.log(values);
  //   onSubmitProps.setSubmiting(false);
  //   onSubmitProps.resetForm();
  // };

  // const validationYup = Yup.object({
  //   // provider: Yup.string().required('Required'),
  // });
  console.log('filter',isModalVisible);
  return (
    <Modal
      visible={isModalVisible}
      // overlayStyle={{ width: deviceWidth / 1.5 }}
      // onBackdropPress={() => setModalVisible(false)}
      onDismiss={onPress}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView
        style={{ backgroundColor: colors.primary, width: deviceWidth / 1.7 }}
      >
        <StyledTransactionFilterContainerHeader
          style={{
            padding: 15,
            flexDirection: "row",
          }}
        >
          <StyledTransactionFilterContainerHeaderText>
            Filter
          </StyledTransactionFilterContainerHeaderText>
          <TouchableOpacity onPress={clear} style={{ marginLeft: "auto" }}>
            <StyledTransactionFilterContainerHeaderText>
              Clear
            </StyledTransactionFilterContainerHeaderText>
          </TouchableOpacity>
        </StyledTransactionFilterContainerHeader>
        {/* <Lists
          name={"provider"}
          status={provider ? "checked" : "unchecked"}
          onPress={() => setProvider(!provider)}
        /> */}

        {/* {provider && (
          <FlatList
            key={subProvider.key}
            data={subProvider}
            renderItem={({ item, index }) => (
              <Lists
                name={item.key}
                subList={true}
                status={item.value ? "checked" : "unChecked"}
                // onPress={() => setProvider(!provider)}
                onPress={() => {
                  let newSubprovider = [...subProvider];
                  newSubprovider[index].value = !newSubprovider[index].value;
                  setSubProvider(newSubprovider);
                  setProviderValue(index);
                }}
              />
            )}
          />
        )} */}
        <Lists
          name={"Status"}
          status={status ? "checked" : "unChecked"}
          onPress={() => setStatus(!status)}
        />

        {status && (
          <FlatList
            data={subStatus}
            renderItem={({ item, index }) => (
              <Lists
                name={item.key}
                subList={true}
                status={item.value ? "checked" : "unChecked"}
                onPress={() => {
                  let newSubStatus = [...subStatus];
                  // newSubStatus.map((data) => {
                  //   data.value = false;
                  // });
                  newSubStatus[index].value = !newSubStatus[index].value;
                  setSubStatus(newSubStatus);
                  setStatusValue(index);
                }}
              />
            )}
          />
        )}
        <Lists
          name={"Date"}
          status={date ? "checked" : "unChecked"}
          onPress={() => setDate(!date)}
        />
        {date && (
          <View>
            <Text style={{ color: colors.grey, paddingLeft: 15 }}>Between</Text>
            <View style={{ padding: 15, flexDirection: "row" }}>
            <View style={{flex: 4}}>
              <CustomDatePickerContainer1
                date={startDate}
                onPress={() => {
                  setDisplayDate(true);
                  setDateSelector("startDate");
                }}
              />
            </View>
              <View style={{ flex: 1, alignSelf: 'center'}}>
                <Text
                  style={{
                    color: colors.grey,
                    textAlign: "center",
                  }}
                >
                  to
                </Text>
              </View>
              <View style={{flex: 4}}>
              <CustomDatePickerContainer1
                date={endDate}
                onPress={() => {
                  setDisplayDate(true);
                  setDateSelector("endDate");
                }}
              />
              </View>
            </View>
          </View>
        )}
        {displayDate && (
          <CustomDate hideDate={hideDate} removeFutureDate={true} />
        )}
        <View
          style={{
            backgroundColor: colors.date_bg,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity onPress={done}>
            <StyledTransactionFilterDoneButton
              style={{
                padding: 15,
              }}
            >
              DONE
            </StyledTransactionFilterDoneButton>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
});
const mapStateToProps = (state) => {
  console.log("s", state);
  return {
    loginData: state.Login.data,
    filterData: state.TransactionFilterData,
    // transactionFilter: state.TransactionFilter,
  };
};
export default connect(mapStateToProps, null)(TransactionFilterModel);
