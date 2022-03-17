import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import colors from '../color';
import CustomCalanderIcon from '../customIcon/customCalanderIcon';
import { StyledLoyaltyDateText, StyledLoyaltyDateTouchableOpacity } from '../customStylesComponents/customLoyaltyComponents';
import { StyledTransactionFilterDateContainer, StyledTransactionFilterDateText } from '../customStylesComponents/customTransactionFilter';
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);
const CustomDatePickerContainer1 = (props) => {
    const {date, onPress} = props
    return(
        <StyledTransactionFilterDateContainer
        onPress={onPress}>
              <CustomCalanderIcon style={{ paddingRight: 5 }} color={colors.danger}/>
              <StyledTransactionFilterDateText > 
              {date ? date : "DD/MM/YY"}
              </StyledTransactionFilterDateText>
        </StyledTransactionFilterDateContainer>
    )
};

export default CustomDatePickerContainer1;

export const CustomDatePickerContainer2 = (props)=>{
    const {date, onPress, startD, endD, name} = props
    return(
        <StyledLoyaltyDateTouchableOpacity
        onPress={onPress}>
              <StyledLoyaltyDateText 
              style={[
                deviceHeight <= 640 && { paddingHorizontal: 35 }
              ]}>
                  {date ? date : name}
              </StyledLoyaltyDateText>
              <CustomCalanderIcon style={{ paddingRight: 5, marginLeft: 'auto' }} color={colors.secondary}/>
        </StyledLoyaltyDateTouchableOpacity>
    )
}

{/* <StyledLoyaltyDateTouchableOpacity
              onPress={() => {
                setDisplayDate(true);
                setDateSelector("startDate");
              }}
            >
              <StyledLoyaltyDateText
                style={[
                  deviceHeight <= 640 && { paddingHorizontal: 35 },
                ]}
              >
                {startDate !== null ? startDate : "Start Date"}
              </StyledLoyaltyDateText>
              <StyledLoyaltyDateImage
                source={require(`${baseasserts}icons/calender_ic.png`)}
                style={{marginRight: 5}}
              />
            </StyledLoyaltyDateTouchableOpacity> */}