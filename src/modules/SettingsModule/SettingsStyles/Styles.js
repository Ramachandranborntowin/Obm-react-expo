import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      height: "50%",
    },
    companydetialsContainer: {
      flexDirection: "row",
      marginTop: 20,
      justifyContent: "space-between",
    },
    companydetialsImage: {
      height: 75,
      width: 75,
      borderRadius: 40,
    },
    userdetialsContainer: {
      marginTop: 15,
      flexDirection: "row",
    },
    userdetaialsImage: {
      height: 75,
      width: 75,
      borderRadius: 40,
    },
    userData: {
      marginLeft: 20,
      alignSelf: "center",
    },
    touchIdContainer: {
      flexDirection: "row",
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      alignItems: 'center'
    },
    applicationInfoList: {
      flexDirection: "row",
      flex: 1,
      paddingLeft: 5,
      marginTop: 25,
    },
  });
