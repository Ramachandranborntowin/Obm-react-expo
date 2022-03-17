import React from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
import { Modal } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { CustomCheckboxSecondary } from "../../../../config/customComponents/custom_Checkbox";
import CustomFooterButton from "../../../../config/customComponents/custom_Footer_Button";
import Custom_virtual_store_textfield from "../../../../config/customComponents/custom_virtual_store_textfield";
import { StyledLoyaltyTextArea } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import { StyledViewForLink } from "../../../../config/customStylesComponents/DrawerPaymentRequest";
import CustomFileIconWithBackgroundBlue from "../../../../config/customIcon/CustomFileIconWithBackgroundBlue";
import CustomCheckboxWithText from "../../../../config/customComponents/CustomCheckboxWithText";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const PaymentRequestedForBNDModel = (props) => {
  return (
    <Modal
      visible={true}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      onDismiss={() => {
        props.onPress(false);
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          minWidth: deviceWidth / 1.2,
          maxWidth: deviceWidth / 1.2,
        }}
      >
        <View style={{ margin: 20, marginBottom: 0 }}>
          <Text
            style={{ fontSize: fontSize.Beep_subHeading, fontWeight: "bold" }}
          >
            Payment Request for BND 1.00
          </Text>
          <Text style={{ marginTop: 15 }}>Your Link</Text>

          <StyledViewForLink style={{ marginTop: 10 }}>
            <TextInput value={"https://www.google.com"} />
            <CustomFileIconWithBackgroundBlue />
          </StyledViewForLink>

          <Text style={{ marginTop: 15 }}>Send Link Via Email</Text>

          <Custom_virtual_store_textfield />

          <StyledLoyaltyTextArea
            multiline={true}
            numberOfLines={3}
            placeholder={
              "You can optionally add reference for this payment that will be shared with the customer."
            }
          />
          <CustomCheckboxWithText name={'Send a copy to my self'}/>
        </View>
        <CustomFooterButton title={"SEND"} />
      </View>
    </Modal>
  );
};
export default PaymentRequestedForBNDModel;
