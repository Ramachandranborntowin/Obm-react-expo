import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const TransactionList = (...props) => {
    const [merchantid, startdate, enddate, status, page, paytype, dissableLoader] = props
        //  return axios.get(`transactionhistory?merchant_id=${merchantid}`) 
        let a = updatedAccessToken('Get', `transaction/history?merchant_id=${merchantid}&fromdate=${startdate}&todate=${enddate}&status=${status}&page=${page}&limit=${60}`, '', '', dissableLoader)
        console.log('a', a)
        return a
}
// export const TransactionFilter = (...props)=>{
//     const [userid, merchantid, startdate, enddate, status, paytype] = props
//     // return axios.get(`transaction/history?user_id=${userid}&merchant_id=${merchantid}&fromdate=${startdate}&todate=${enddate}&status=${status}`)
//     // &paytype=${paytype}
//     // user_id=${userid}
//     return updatedAccessToken('Get', `transactionhistory?merchant_id=${merchantid}&fromdate=${startdate}&todate=${enddate}&status=${status}`)
// }
export const Transactiondetial = (...props)=>{
    const [merchantid,userid] = props
    // return axios.get(`transaction/history?user_id=${userid}&merchant_id=${merchantid}&fromdate=${startdate}&todate=${enddate}&status=${status}`)
    return updatedAccessToken('Get', `transaction/detail?merchant_id=${merchantid}&trans_id=${userid}`)
}
export const RefundRequest = (...props)=>{
    const [userid,merchantid] = props
    // return axios.get(`transaction/history?user_id=${userid}&merchant_id=${merchantid}&fromdate=${startdate}&todate=${enddate}&status=${status}`)
    return updatedAccessToken('Get', `refundins?trans_id=${userid}&merchant_id=${merchantid}`)
}

//transaction/history?merchant_id=${props}