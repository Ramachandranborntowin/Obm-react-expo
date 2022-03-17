import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import colors from "../color";
import {
  StyledTextButton,
  StyledTouchableOpacityButtonContainer,
} from "../customStylesComponents/customCancelButton";
import {
  StyledFooterButton,
  StyledFooterButtonText,
  StyledFooterPasswordContainer,
  StyledFooterPasswordText,
} from "../customStylesComponents/customForgetPasswordStyleComponent";
import CustomAddIcon from "../customIcon/customAddIcon"
import fontSize from "../fontSize";
const styles = StyleSheet.create({
  button: {
    margin: 20,
  },
  textLeft: {
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  containerForIcons: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}
});

const CustomFooterButton = (props) => {
  const { title, onPress, isValid, dirty, textalignLeft } = { ...props };
  return (
    <StyledFooterButton
      style={[styles.button, textalignLeft && styles.textLeft]}
      onPress={onPress}
      // disabled={!(isValid && dirty)}
    >
      <StyledFooterButtonText>{title}</StyledFooterButtonText>
    </StyledFooterButton>
  );
};
export default React.memo(CustomFooterButton);
export const CustomFooterButtonWithoutBorderRadius = React.memo((props) => {
  const { title, onPress, isValid, dirty, icon, iconName } = { ...props };
  return (
    <StyledFooterPasswordContainer
      onPress={onPress}
      // disabled={!(isValid && dirty)}
      paddingSize={8}
    >
      {icon ? <View style={styles.containerForIcons}>
      {iconName == 'Add' && <CustomAddIcon />}
      <StyledFooterPasswordText>{title}</StyledFooterPasswordText>
      </View> : <StyledFooterPasswordText>{title}</StyledFooterPasswordText>}
      
    </StyledFooterPasswordContainer>
  );
});
export const CustomFooterButtonWithNestedButton = React.memo((props) => {
  const { title, paddingSize, textSize } = props;
  return (
    <StyledTouchableOpacityButtonContainer
      Color={colors.orange_combo}
      Padding={paddingSize}
      nestedbutton={true}
    >
      <StyledTextButton textSize={textSize}>{title}</StyledTextButton>
    </StyledTouchableOpacityButtonContainer>
  );
});
export const CustomFooterButtonIncludesNestedButton = React.memo((props) => {
  const { titleLeft, titleRight, enableRejectButton } = props;
  return (
    <TouchableHighlight
      style={{
        justifyContent: "center",
        marginTop: 0,
        // borderRadius: ,
        borderColor: colors.secondary,
        borderRadius: 7,
        backgroundColor: colors.secondary,
        margin: 20,
        padding: 7,
      }}
      // underlayColor="#04639f"
      // onPress={() => this.submit()}
    >
      <View style={{ flexDirection: "row" }}>
        <CustomFooterButtonWithNestedButton title={titleLeft} paddingSize={10} textSize={fontSize.Beep_primaryButtonText}/>
        {enableRejectButton && (
          <View style={{ marginLeft: "auto" }}>
            <CustomFooterButtonWithNestedButton title={titleRight} paddingSize={10} textSize={fontSize.Beep_primaryButtonText}/>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
});
