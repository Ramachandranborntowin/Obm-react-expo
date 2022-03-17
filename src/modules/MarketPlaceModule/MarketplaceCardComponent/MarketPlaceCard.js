import React, {
  Component,
  useState,
  useEffect,
  memo,
  useCallback,
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
import useDateAndMonth from "../../../../config/customHooks/useDateAndMonth";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../../../config/color";
import { StyledGreenText } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import fontSize from "../../../../config/fontSize";
const styles = StyleSheet.create({
  img: {
    height: 35,
    width: 100,
  },
  headingText: {
    paddingHorizontal: 10, fontSize: fontSize.Beep_subHeading, fontWeight: 'bold'
  },
  headerTextContainer: {
    marginHorizontal: 10, backgroundColor: colors.grey, flexDirection: 'row', padding: 5
  }
});
const MarketPlaceCard = (params) => {
  const [monthNames, weekday] = useDateAndMonth();
  const { props, item, portalid, status, portalexternalid } = params;
  console.log("items", item, props);
  let split_date = String(item.item.created_at).split(" ");
  let d = String(split_date[0]).split("-");
  let t = String(split_date[1]).split(":");
  var date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
  let H_M = `${+date.getHours() % 12 || 12}:${date.getMinutes()} ${
    +date.getHours() < 12 ? "AM" : "PM"
  }`;
  return (
    <View>
      <View style={{ padding: 20, flexDirection: 'row' }}>
        <Text>
          {monthNames[date.getMonth()]} {date.getDate()},{date.getFullYear()}{" "}
          {H_M}
        </Text>
        <Text style={[{marginLeft: 'auto'}, {color: +item.item.order_type ? colors.success: colors.secondary }]}>
        {+item.item.order_type ? `Service`.toUpperCase() : `Product`.toUpperCase()}
        </Text>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headingText}>{+item.item.order_type ? `Service` : `Product`}</Text>
        <Text style={styles.headingText}>Customer</Text>
        <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
        <Text style={styles.headingText}>Order ID</Text>
        <Text style={styles.headingText}>Total$</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (status == 0) {
            props.props.navigation.navigate("Orderpending", {
              navigationData: { ...params },
            });
          } else if (status == 1) {
            props.props.navigation.navigate("Orderinprogress", {
              navigationData: { ...params },
            });
          } else if (status == 2) {
            props.props.navigation.navigate("Ordercompleted", {
              navigationData: { ...params },
            });
          } else {
            props.props.navigation.navigate("Orderrejected", {
              navigationData: { ...params },
            });
          }
        }}
      >
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            paddingBottom: 20,
            alignItems: "flex-end",
            backgroundColor: colors.primary,
            marginHorizontal: 10,
          }}
        >
          <Image
            source={
              portalid == 2
                ? require("../../../../assets/image/pasarp.png")
                : require("../../../../assets/image/oneBrunei.png")
            }
            style={styles.img}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>{item.item.cus_name}</Text>
            <Text style={{ color: colors.BeepplusTextColor2 }}>
              Items: {item.item.total_product}
            </Text>
          </View>
          <View style={{ marginLeft: "auto", flexDirection: "row" }}>
            <View>
              <StyledGreenText style={{ fontSize: fontSize.Beep_Text_Small }}>
                # {item.item.order_id}
              </StyledGreenText>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: colors.secondary }}>
                ${item.item.total_price}
              </Text>
            </View>
            <View style={{ marginLeft: 10, alignSelf: "center" }}>
              <IonIcon
                name="caret-forward-outline"
                style={{ color: colors.dark_grey }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default MarketPlaceCard;
