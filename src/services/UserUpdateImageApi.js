import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const userUpdateImageApi = (data) => {
        //  return axios.post(`user/logoupdate`, data, {
        //     headers: {
        //         'Content-Type': `multipart/form-data`
        //     }
        // })
        return updatedAccessToken('Post', `user/logoupdate`, data, {
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
}