import {StyleSheet} from 'react-native'
import colors from '../../../../config/color';
export const styles = StyleSheet.create({
    container: {
        padding: 33,
        paddingRight: 20,
        paddingLeft: 25,
      },
      
      description: {
        marginTop: 20,
        paddingLeft: 5
      },
      footer: {
        backgroundColor: colors.Beepplus_light_grey,
        margin: 0,
      },
      errMsg: {
        color: "red",
        paddingLeft: 10,
      },
})