import React from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  ToastAndroid,
} from "react-native";
import colors from "../../../../config/color";
import CustomHeadingSmall from "../../../../config/customComponents/custom_Heading_Small";
import CustomSwitchButton from "../../../../config/customComponents/cutom_Switch_Button";
import fontSize from "../../../../config/fontSize";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import SmallIcon from "../SettingsComponent/smallicon";
import SubHeading from "../SettingsComponent/SubHeading";
import {styles} from "../SettingsStyles/PaaymentMethodStyles"
const imageBase = `../../../../assets/image/`;
const PaymentMethod = (props) => {
  const listOfPaymentSettings = [
    {
      name: "Alipay",
      icon: require(`${imageBase}ali_pay.png`),
    },
    {
      name: "Visa/Mastercard",
      icon: require(`${imageBase}visamastercard.png`),
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }}>
          <SubHeading title={'Payment Settings'}/>
          {listOfPaymentSettings.map((obj, index) => (
            <View
              style={[
                styles.touchIdContainer,
                { marginLeft: 0, marginRight: 0 },
              ]}
            >
              <SmallIcon icon={obj.icon} />
              <Text style={{ color: colors.black, alignSelf: "center" }}>
                {obj.name}
              </Text>
              <CustomSwitchButton />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const ModefiedPaymentMethodPage = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={PaymentMethod}
    headerTitle={"Settings"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default ModefiedPaymentMethodPage;
