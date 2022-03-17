import React from "react";
import {
  StyledHeadingSmall,
  StyledHeadingSmallContainer,
} from "../customStylesComponents/HeadingSmall";
const CustomHeadingSmall = (props) => {
  const { title } = props;
  return (
    <StyledHeadingSmallContainer>
      <StyledHeadingSmall>{title}</StyledHeadingSmall>
    </StyledHeadingSmallContainer>
  );
};
export default CustomHeadingSmall
