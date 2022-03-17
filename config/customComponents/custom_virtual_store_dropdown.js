import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo
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
import colors from "../color";
import { Picker } from "@react-native-picker/picker";
import IonIcon from "react-native-vector-icons/Ionicons";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const Custom_virtual_store_dropdown = (props) => {
  const { dropdowncolor, dropdownData, setFieldValue, value } = { ...props };
  console.log('dropdown', dropdownData, value)
  const [branches, setBranches] = useState(value || "");
  return (
    <View
      style={Platform.OS == 'android' && {
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 10,
        position: "relative",
      }}
    >
      <Picker
        mode="dropdown"
        selectedValue={branches}
        style={{ color: colors.black}, Platform.OS == 'android' && {height: 45 }}
        onValueChange={(itemValue, itemIndex) => {
          setBranches(itemValue);
          setFieldValue(props.fieldname, itemValue)
        }}
      >
        {dropdownData.map((value) => (
          <Picker.Item label={value.Beeppluslabel} value={value.Beepplusvalue} />
        ))}
      </Picker>
      <Text
        style={{
          width: "100%",
          height: 60,
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        {""}
      </Text>
      {Platform.OS == 'android' && <IonIcon
        style={{
          position: "absolute",
          right: 13,
          bottom: 12,
          fontSize: 20,
          color: colors.grey,
        }}
        name={"caret-down-outline"}
      />}
    </View>
  );
};
export default memo(Custom_virtual_store_dropdown);
