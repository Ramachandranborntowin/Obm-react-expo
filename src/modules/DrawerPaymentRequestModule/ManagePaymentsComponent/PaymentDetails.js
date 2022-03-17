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
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import CustomDollerIcon from "../../../../config/customIcon/customDollerIcon";
import { StyledTransactionAmountText } from "../../../../config/customStylesComponents/customTransactionList";
import { StyledHorizontalline } from "../../../../config/customStylesComponents/customHorizontalLine";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
import { styles } from "../DrawerPaymentRequestStyles/PaymentDetailsStyles";
const PaymentDetails = (props) => {
  const data1 = [
    { key: "Request URL", value: "https://beep.solutions.pay" },
    { key: "Transaction id", value: "N/A" },
    {
      key: "URL Status",
      value: "N/A",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingContainer}>
          <CustomDollerIcon
            source={require("../../../../assets/icons/doller.png")}
          />
          <StyledTransactionAmountText fontSize={fontSize.Beep_large_font}>
            0.00
          </StyledTransactionAmountText>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{"Pending"}</Text>
          </View>
        </View>
        <StyledHorizontalline />
        <View style={styles.listContainer}>
          {data1.map((item, index) => (
            <View style={styles.listvaluescontainer}>
              <Text style={styles.listKeyText}>{item.key}</Text>
              <Text style={styles.listValueText}>
                {item.value ? item.value : "N/A"}
              </Text>
            </View>
          ))}
        </View>
        <StyledHorizontalline />
      </ScrollView>
    </View>
  );
};
const ModefiedPaymentDetails = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={PaymentDetails}
      headerTitle={"Payment Details"}
      headerprops={props}
      {...props}
    />
  );
};
export default ModefiedPaymentDetails;
