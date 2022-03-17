import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
const LoyaltyTransactionDetails = (props) => {
  const coupondetail = [
    {
      name: "Coupon Name",
      value: "Darkknight",
    },
    {
      name: "Coupon ID",
      value: "Darkknight",
    },
    {
      name: "Coupon Description",
      value: "Darkknight",
    },
    {
      name: "Coupon Validity",
      value: "Darkknight",
    },
    {
      name: "Coupon Images",
      value: "image",
    },
  ];
  const claimdetail = [
    {
      name: "Customer Name",
      value: "Darkknight",
    },
    {
      name: "Climed Date And Time",
      value: "Darkknight",
    },
  ];
  const policy = [
    {
      name: "Coupon Terms and Condition",
      value: "description",
      descripton: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.`,
    },
  ];
  return (
    <>
    <ScrollView
      style={{
        // justifyContent: 'center',
        // flex: 1,
        backgroundColor: colors.primary,
        padding: 10,
        paddingTop: 0,
      }}
    >
      <Card name={"Coupon detail"} lists={coupondetail} />
      <Card name={"Claim detail"} lists={claimdetail} />
      <Card name={"Policy"} lists={policy} />
    </ScrollView>
    </>
  );
};

const ModefiedLoyaltyTransactionDetails = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={LoyaltyTransactionDetails}
    headerTitle={"Transaction Details"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default ModefiedLoyaltyTransactionDetails

const Card = (props) => {
  const { name, lists } = props;
  return (
    <View
      style={{
        marginTop: 10,
        padding: 15,
        backgroundColor: colors.Beepplus_light_grey,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: fontSize.Beep_subHeading, fontWeight: "bold" }}>
        {name}
      </Text>
      {lists.map((value) => (
        <View
          key={value.name}
          style={[
            value.value == "description"
              ? {}
              : { flexDirection: "row", alignItems: "center" },
            { padding: 20 },
          ]}
        >
          <Text
            style={{
              justifyContent: "flex-start",
              color: colors.black,
              fontWeight: "bold",
              fontSize: fontSize.Beep_Text_Small,
            }}
          >
            {`${value.name}:`}
          </Text>
          {value.value == "image" ? (
            <Image
              source={require("../../../../assets/image/burger.jpg")}
              style={{
                maxHeight: 80,
                maxWidth: 100,
                marginLeft: "auto",
                borderRadius: 10,
              }}
            />
          ) : value.value == "description" ? (
            <Text
              style={{
                padding: 10,
                borderRadius: 7,
                borderColor: colors.black,
                borderWidth: 1,
              }}
            >
              {value.descripton}
            </Text>
          ) : (
            <Text style={{ marginLeft: "auto" }}>{value.value}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
