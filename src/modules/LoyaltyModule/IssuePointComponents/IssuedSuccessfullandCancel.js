import React, {Component, useCallback, useState} from 'react';
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
  ToastAndroid,
} from 'react-native';
import colors from '../../../../config/color';
import {useFocusEffect} from '@react-navigation/core';
import IonIcon from 'react-native-vector-icons/Ionicons';
import fontSize from '../../../../config/fontSize';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: 20,
  },
  status: {
    color: colors.success,
    fontSize: fontSize.Beep_Text,
  },
});
// const data = {
//     Amount: '$0.50',
//     Date: '18 june 2021',
//     TransactionId: 26,
//     LoyaltyPoints: '5 XS',
//     userName: 'Beepxuser1',
//     userId: 1
// }

const IssuedSuccessfullandCancel = props => {
  const Keys = {
    amount: 'Amount',
    show_date: 'Date',
    transaction_id: 'TransactionId',
    xs_point: 'LoyaltyPoints',
    user_name: 'userName',
    user_id: 'userId',
  };
  const [data, setData] = useState();
  useFocusEffect(
    useCallback(() => {
      setData(JSON.parse(props.route.params.result));
    }, []),
  );
  console.log('data',data)
  return (
    <View style={{marginTop: 70, flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.status}>{data.xs_point} XS Points</Text>
        <IonIcon
          name={'checkmark-circle-outline'}
          style={{color: colors.success, fontSize: fontSize.Beep_iconSize_3}}
        />
        <Text style={styles.status}>ISSUED SUCCESSFUL!</Text>
      </View>
      <View style={{flex: 1}}></View>
      <View style={{backgroundColor: colors.grey, margin: 20}}>
        {data &&
          Object.keys(data).map((key, index) => {
            if (Keys[key]) {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 50,
                    padding: 5,
                  }}>
                  <Text style={{flex: 1, fontSize: fontSize.Beep_subHeading, marginVertical: 5}}>
                    {Keys[key]}
                  </Text>
                  <Text style={{flex: 1, fontSize: fontSize.Beep_subHeading, marginVertical: 5}}>
                    {key == 'xs_point'
                      ? `${data[key]} XS`
                      : key == 'amount'
                      ? `$ ${data[key]}`
                      : data[key]}
                  </Text>
                </View>
              );
            }
          })}
      </View>
      <View style={{flex: 1}}></View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.Beepplus_background_color,
          padding: 20,
          marginHorizontal: 20,
          alignItems: 'center',
        }}
        onPress={() => props.navigation.goBack(null)}>
        <Text style={{fontSize: fontSize.Beep_iconSize_2}}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};
export default IssuedSuccessfullandCancel;
