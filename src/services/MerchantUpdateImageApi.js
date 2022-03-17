import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const merchantUpdateImageApi = (data) => {
        //  return axios.post(`merchant/logoupdate`, data, {
        //     headers: {
        //         'Content-Type': `multipart/form-data`
        //     }
        // })
        return updatedAccessToken('Post', `merchant/logoupdate`, data, {
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
}