import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    content: {
      margin: 20,
      marginBottom: 0,
      marginTop: 10,
    },
    heading: {
      color: colors.grey,
      paddingTop: 10,
    },
    contentBorder: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.grey, margin: 20
    },
    logoContent: {
    //   backgroundColor: '#fffdf1',
      paddingLeft: 10,
      width: '62%',
    },
    img: {
      height: 115,
      width: 115,
      borderRadius: 60,
      marginRight: 10,
    },
    logoContentHeading: {
      fontSize: fontSize.Beep_subHeading,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    homeicon: {
      alignSelf: 'center',
      fontSize: fontSize.Beep_subHeading,
      color: colors.grey,
      marginRight: 5,
    },
    text_StoreTime: {
      color: colors.grey,
      fontWeight: 'bold',
      fontSize: fontSize.Beep_subHeading,
    },
    text_edit: {
      color: colors.secondary,
      fontSize: fontSize.Beep_heading,
      marginLeft: 'auto',
      fontWeight: 'bold',
    },
    list_heading: {
      fontWeight: 'bold',
      fontSize: fontSize.Beep_subHeading,
      marginLeft: 50,
    },
    list_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    list_name: {
      fontSize: fontSize.Beep_subHeading,
      color: colors.grey,
      paddingLeft: 10,
    },
    pickuphourList: {
      marginTop: -10,
      marginLeft: 60,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    selected_pickup_hours: {
      borderWidth: 1,
      borderColor: colors.grey,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 7,
    },
    camera_icon:{
      position: "absolute",
                // alignItems: "center",
                // justifyContent: "center",
                // height: 30,
                // width: 30,
                // backgroundColor: colors.grey,
                // borderRadius: 25,
                left: 80,
                top: 10,
    },
    iconEditerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    iconEditor: {
      alignItems: "center",
      flexGrow: 1,
      marginTop: 10,
    },
    iconUrlTextField: { flexGrow: 9, marginLeft: 10 }
  });