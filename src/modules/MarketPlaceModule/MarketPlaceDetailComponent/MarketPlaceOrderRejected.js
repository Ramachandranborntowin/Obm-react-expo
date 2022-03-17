import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import MarketPlaceDetailPage from './MarketPlaceDetailPage';
import { connect } from "react-redux";
const MarketPlaceOrderRejected = (props) => {
    return(
        <MarketPlaceDetailPage name="rejected" navigation = {props.navigation} apiData={props.route.params.navigationData} />
    )
    }

const ModefiedMarketPlaceOrderRejected = (props)=>{
    return(
      <CommonHigherOrderHeaderComponent
      pagename={MarketPlaceOrderRejected}
      headerTitle={"Order Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
      />
    )
    }
  export default ModefiedMarketPlaceOrderRejected;
