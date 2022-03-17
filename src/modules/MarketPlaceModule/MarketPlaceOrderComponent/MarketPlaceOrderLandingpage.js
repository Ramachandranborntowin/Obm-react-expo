import React, {
  Component,
  useState,
  useEffect,
  memo,
  useCallback,
  useReducer
} from "react";
import ModefiedMarketplaceBodyPage from "../MarketPlaceBodyComponent/MarketPlaceBodyPage";
const MarketplaceOrderLandingPage = (props) => {
  console.log('props order', props)
  return (
    <ModefiedMarketplaceBodyPage  props={props} />
  );
};
export default MarketplaceOrderLandingPage
