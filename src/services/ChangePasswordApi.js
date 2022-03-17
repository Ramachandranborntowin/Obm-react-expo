import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import updatedAccessToken from '../common_utilites/Apiconnector';
export const ChangePasswordApi = (...props) => {
    const [currentPassword, newPassword] = props
    return updatedAccessToken('Get', `userpwdchange?curpassword=${currentPassword}&password=${newPassword}`)
}