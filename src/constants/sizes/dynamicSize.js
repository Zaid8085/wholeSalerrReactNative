/*
 * @author: Puneet Kansal
 * */

import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export const dynamicSize = (size) => {
    const percentage = (size / 812) * 100
    return (percentage * height) / 100
}

export const ScreenWidth = width
export const ScreenHeight = height