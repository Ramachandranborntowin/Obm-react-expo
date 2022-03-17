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
import colors  from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
import { Button, Dialog, Portal, Paragraph } from "react-native-paper";
import store from "../../../redux/store";
const MarketPlaceModel = (props) => {
  
  const { choosePortal, setChoosePortal, setIsModel, isModel} = props
  return (
      <Dialog visible={isModel} onDismiss={()=>setIsModel(!isModel)}>
        <Dialog.Content>
          <TouchableOpacity style={{margin: 5, padding: 5}} onPress={()=>{
            // choosePortalMethod("Pasar")
            setIsModel(!isModel)
            store.dispatch({type: 'marketplacePortalSelection', data: "Pasar"});
            }}>
            <Text style={[{fontSize: fontSize.Beep_subHeading, color: colors.black}, choosePortal == "Pasar" && {color: colors.secondary}]}>Pasar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 5, padding: 5}} onPress={()=>{
            // choosePortalMethod("OneBrunei")
            setIsModel(!isModel)
            store.dispatch({type: 'marketplacePortalSelection', data: "One Brunei"});
            }}>
            <Text style={[{fontSize: fontSize.Beep_subHeading, color: colors.black}, choosePortal == "One Brunei" && {color: colors.secondary}]}>One Brunei</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
  );
};
export default MarketPlaceModel;
