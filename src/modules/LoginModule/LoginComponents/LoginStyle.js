import {StyleSheet} from 'react-native'
import colors from '../../../../config/color';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary, flex: 1, padding: 45
    },
    logo_container: {
        alignItems: 'center', justifyContent: 'center', flex: 1
    },
    headder: {
      fontSize: 30,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      height: 250,
      width: 250,
    },
    text_color: {
      // color: '#04639f',
      marginLeft: 15,
      paddingBottom: 3,
    },
    textInputStyle: {
      minHeight: 45,
      fontSize: 16,
      paddingLeft: 5,
      // color: '',
  
      paddingLeft: 15,
    },
    space_between_text: {
      marginTop: 30,
    },
    buttonSignup: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 55,
    },
    boxShadow: {
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: colors.primary,
      borderRadius: 7,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    errMsg: {
      color: 'red',
      paddingLeft: 10,
    },
  });
  