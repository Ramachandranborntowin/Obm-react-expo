import React, {useState, memo} from 'react';
import {View, Button, Platform, Text, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
import colors from '../color'
const CustomDate = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  console.log('show',show)

  const onChange = (event, selectedDate) => {
    console.log('event', event)
    let currentDate = selectedDate || date;
    setDate(currentDate);
    if(event.type === "dismissed"){
      if(props.isForm){
        props.setDisplayDate(false)
      }else{
        props.hideDate(false, "")
      }
    }else{
      if(props.isForm){
        console.log('hello', new Date(formatDate(currentDate, "form")))
        props.setFieldValue(props.fieldName, currentDate)
        props.setDisplayDate(false)
      }else{
      props.hideDate(false, formatDate(currentDate))
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  // const cancel = ()=>{
  //   console.log("cancel")
  //   props.hideDate(false, "")
  // }

  // style={Platform.OS === 'ios' && props.primaryDateDisplay && {backgroundColor: colors.Beepplus_container_background,
  //   position: 'absolute',
  //   bottom: 0,
  //   height: 200,
  //   width: deviceWidth
  //   }}
  
  return (
    <View >
      <View>
        {/* <Text>{formatDate(date)}</Text> */}
      </View>
      {/* <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}
      {show && (
        <DateTimePicker
        dateFormat={"day month year"}
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display={Platform.OS == 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          minimumDate={props.removePreviousDate && new Date()}
          maximumDate={props.removeFutureDate && new Date()}
        />
      )}
    </View>
  );
};
const formatDate = (date, isform) => {
  if(isform == "form"){
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  }else{
    return `${date.getDate()}-${date.getMonth() +
      1}-${date.getFullYear()}`;
  }
  };
export default memo(CustomDate);