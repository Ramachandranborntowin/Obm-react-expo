import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import MarketPlaceDetailPage from './MarketPlaceDetailPage';
import { connect } from "react-redux";
const MarketPlaceOrderPending = (props) => {
  console.log('props pending', props)
    return(
        <MarketPlaceDetailPage name="pending" navigation = {props.navigation} apiData={props.route.params.navigationData} />
    )
    }

const ModefiedMarketPlaceOrderPending = (props)=>{
    return(
      <CommonHigherOrderHeaderComponent
      pagename={MarketPlaceOrderPending}
      headerTitle={"Order Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
      />
    )
    }
  export default ModefiedMarketPlaceOrderPending;
