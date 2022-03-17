import React, { Component, useCallback, useEffect, useRef, useState, useWindowDimensions } from 'react';
import {
    Dimensions,
    StyleSheet,
    Platform,
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    SafeAreaView,
    TouchableHighlight,
    Alert,
    FlatList, StatusBar, TouchableOpacity, Modal, Pressable, ScrollViewComponent, Button, ToastAndroid
} from 'react-native';
import QrScanner from '../../../../config/projectDependency/QrScanner';
import { CouponValidApi } from '../../../services/LoyaltyApi'
import { connect } from 'react-redux'
import CouponDetails from './CouponDetails';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
const ValidateOffers = (props) => {
    console.log('props',props)
    const [displayCouponDetails, setCouponDetails] = useState(false)
    const [displayMsg, setDisplayMsg] = useState("")
    const [couponDetailsData, setCouponDetailsData] = useState("")
    const [status, setStatus] = useState("")

    // let displayMsg;
    // let couponDetailsData;
    // let status;
    // let displayCouponDetails;
    const sendScanedData = (...params) => {
        const [qrScannedData] = [params]
        let merchant_portals_id;
        let merchant_portals_external_id
        props.loginData.data.merchant_portals.map((obj, index) => {
            console.log(obj.id)
            if (obj.id == 6) {
                // setMerchantPortalId(obj.id)
                // setMerchantPortalExternalId(obj.external_id)
                merchant_portals_id = obj.id
                merchant_portals_external_id = obj.external_id
            }
        })
        console.log('m', merchant_portals_id, props.loginData.data.merchant.id, merchant_portals_external_id)
        CouponValidApi(merchant_portals_id, props.loginData.data.merchant.id, merchant_portals_external_id, qrScannedData).then((res) => {
            console.log(res.data);
            if (res.data.error == 3) {
                setDisplayMsg(res.data.err_msg)
                setCouponDetails(true)
                setStatus(res.data.error)
            } else if (res.data.success == 1) {
                setDisplayMsg(res.data.succ_msg)
                setCouponDetails(true)
                setCouponDetailsData(res.data.data.result)
                setStatus(res.data.success)
            } else if (res.data.error == 2) {
                setDisplayMsg(res.data.err_msg)
                setCouponDetails(true)
                setStatus(res.data.error)
            }
        })
    }
    return (
        <>
            {displayCouponDetails ? <CouponDetails displayMsg={displayMsg} couponDetailsData={couponDetailsData} status={status} params={props}/> : <QrScanner sendScanedData={sendScanedData} />}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        loginData: state.Login.data,
    }
}
const ModefiedValidateOffers = (props)=>{
    return(
      <CommonHigherOrderHeaderComponent
      pagename={ValidateOffers}
      headerTitle={"Validate Offers"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
      />
    )
    }
export default connect(mapStateToProps, null)(ModefiedValidateOffers);