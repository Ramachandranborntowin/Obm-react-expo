import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const getPasarListApi = (...props) => {
    const [portal_id, external_id, status, merchant_id] = props
    return updatedAccessToken('Get', `portal/orders?portal_id=${portal_id}&external_id=${external_id}&status=${status}&merchant_id=${merchant_id}`)
}
export const getPasarDetail = (...props)=>{
    const [portal_id, external_id, status, merchant_id, order_id] = props
    return updatedAccessToken('Get', `portal/orders/details?portal_id=${portal_id}&external_id=${external_id}&status=${status}&merchant_id=${merchant_id}&order_id=${order_id}`)
}