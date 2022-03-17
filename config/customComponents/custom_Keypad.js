import React from 'react';
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
    FlatList, StatusBar, TouchableOpacity, Keyboard
  } from 'react-native';
  import IonIcon from 'react-native-vector-icons/Ionicons';
  import colors from '../color';
  import CustomBackspaceIcon from '../customIcon/customBackspaceIcon'
  import { StyledTouchableOpacityKeypad,StyledTextKeypad } from '../customStylesComponents/customPaymentRequest';
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const Numbers = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 'x' },
    { number: 0 },
    { number: '.' },
  ];
  const Item = ({ item, onPress, textColor }) => (
    <StyledTouchableOpacityKeypad onPress={item.number !== "." ? onPress : () => { }} >
      <StyledTextKeypad >{item.number === 'x' ? <CustomBackspaceIcon /> : item.number}</StyledTextKeypad>
    </StyledTouchableOpacityKeypad>
  );
const Keypad = (props) => {
    const {onPress, selectedNumber} = {...props}
    const renderItem = ({ item }) => {
        const backgroundColor = colors.primary;
        const color = 'black';
        let s = "hello";
        return (
          <Item
            item={item}
            onPress={item.number !== 'x' ?
              () => {
                onPress([...selectedNumber, item.number])
              } :
              () => {
                selectedNumber.pop()
                onPress([...selectedNumber])
              }}
            textColor={{ color }}
          />
        );
      };
    return (
        <View>
            <FlatList
                data={Numbers}
                renderItem={renderItem}
                numColumns={3}
                contentContainerStyle={{ borderRadius: 7 }}
                keyExtractor={item => item.number}
            />
        </View>
    )
}
export default Keypad