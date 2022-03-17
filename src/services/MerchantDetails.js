import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const merchantDetails = (...props) => {
    const [merchantId] = props
    console.log('merchant', merchantId)
    return updatedAccessToken('Get', `merchant/details?merchant_id=${merchantId}`)
}