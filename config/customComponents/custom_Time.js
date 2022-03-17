import React, {useState, memo} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomTime = (props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    console.log('time', selectedDate, event)
    if(event.type !== "dismissed"){
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(formatDate(currentDate))
    props.hideDate(false, formatDate(currentDate))
    }
    props.hideDate(false, null)
  };

  return (
    <View>
        <DateTimePicker
          testID="dateTimePicker"
          // timeZoneOffsetInMinutes={60}
          value={date}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
    </View>
  );
};
const formatDate = (date) => {
  let hours = +date.getHours() % 12 || 12
  let AmPm =  +date.getHours() < 12 ? 'AM' : 'PM';
  let minutes = +date.getMinutes()
  console.log('h,m', hours,  minutes,  AmPm)
    return `${hours}:${minutes} ${AmPm}`;
  };
export default memo(CustomTime);