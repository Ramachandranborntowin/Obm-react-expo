import React, {useState} from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import Custom_virtual_store_textfield from "../../../../config/customComponents/custom_virtual_store_textfield";
import CustomFooterButton from "../../../../config/customComponents/custom_Footer_Button";
import { CustomCheckboxSecondary } from "../../../../config/customComponents/custom_Checkbox";
import CustomCalanderIcon from "../../../../config/customIcon/customCalanderIcon";
import custom_Alert from "../../../../config/customComponents/custom_Alert";
import PaymentRequestedForBNDModel from "./PaymentRequestedForBNDModel";
import {styles} from '../DrawerPaymentRequestStyles/CreatepaymentRequestStyles'
import { StyledDrawerpaymentDate } from "../../../../config/customStylesComponents/DrawerPaymentRequest";
import { CustomTextFieldWithPrefixBND } from "../../../../config/customComponents/custom_TextField";
import CustomCheckboxWithText from "../../../../config/customComponents/CustomCheckboxWithText";
const CreatePaymentRequest = (props) => {
  const [enableModel, setEnableModel] = useState(false)
  return (
    <>
    {enableModel && <PaymentRequestedForBNDModel onPress={setEnableModel}/>}
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: fontSize.Beep_subHeading }}>
        Share a payment link with you customer or client via email
      </Text>
      <Text style={{ fontSize: fontSize.Beep_subHeading, marginTop: 10 }}>
        They will receive an email or message with a link to securely pay the
        requeted amount
      </Text>
      <View>
        <Text style={{ marginTop: 10 }}>Payment Amount*</Text>
        <CustomTextFieldWithPrefixBND />
        <Text style={{ marginTop: 10 }}>Customer Reference (Optional)</Text>
        <Custom_virtual_store_textfield />
        <Text style={{ marginTop: 10 }}>Payment Expiry Date*</Text>
        <View style={{marginTop: 10}}>
          <StyledDrawerpaymentDate>
          <Text style={{ color: colors.BeepplusTextColor }}>DD/MM/YYYY</Text>
          <View style={{ marginLeft: "auto" }}>
            <CustomCalanderIcon />
          </View>
        </StyledDrawerpaymentDate>
        </View>
      </View>
      <CustomCheckboxWithText 
      name={'Authorize you customer preferred payment methods & capture the payment later'}/>
      <CustomFooterButton
        title={"CREATE LINK"}
        onPress={() =>
          custom_Alert({
            status: "Payment Request",
            description: "Payment request link has been created successfully",
            // notDisplayLink: true,
            onPress: ()=>setEnableModel(true)
          })
        }
      />
    </ScrollView>
    </>
  );
};
const ModefiedCreatePaymentRequest = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={CreatePaymentRequest}
      //   headeronPress={() => console.log('hello')}
      headerTitle={"Create Payment Request"}
      //   headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default ModefiedCreatePaymentRequest;
