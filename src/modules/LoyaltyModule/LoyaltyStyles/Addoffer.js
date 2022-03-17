import { StyleSheet } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    flex: 1,
    zIndex: -1,
  },
  input_text: {
    fontSize: fontSize.Beep_subHeading,
    color: colors.black,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.Beepplus_background_color,
    margin: 0,
    padding: 0,
  },
  radiobutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
  },
  heading: {
    color: colors.Beepplus_background_color,
    fontSize: fontSize.Beep_description,
    marginTop: 25,
  },
  clickable_text: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.Beepplus_background_color,
  },
  icon: {
    alignSelf: "center",
    color: colors.Beepplus_icon_color,
  },
  // btn_upload: {
  //   shadowColor: colors.black,
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 1.41,

  //   elevation: 2,
  //   backgroundColor: colors.orange_combo,
  //   padding: 15,
  //   borderRadius: 7,
  // },
  img: {
    height: 110,
    width: 130,
    marginTop: 5,
  },
  // errMsg: {
  //   color: colors.danger,
  //   paddingLeft: 10,
  // },
});
