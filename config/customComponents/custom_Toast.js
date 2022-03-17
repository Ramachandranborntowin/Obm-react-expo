import React, { memo,  } from "react";
// import Toast from 'react-native-root-toast';
// import Toast from 'react-native-toast-native';
import Toast from 'react-native-root-toast'
import colors from '../color'
const custom_Toast = (props) => {
    console.log('Toast', Toast.show)
        Toast.show(props.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: colors.black_dark_grey
        })
}

export default custom_Toast;