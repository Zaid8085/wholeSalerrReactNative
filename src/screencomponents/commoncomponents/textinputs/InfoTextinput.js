import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { dynamicSize } from '../../../constants/sizes/dynamicSize';
import { PoppinsRegular } from '../../../constants/commonuse/fonts';
import { white_color, red_color, primary_color } from '../../../constants/commonuse/Colors';

export const InfoTextinput = (props) => {
    const { icon, type, cssProperty, maxLength } = props

    return (
        <View style={{
            borderWidth: 1,
            borderColor: cssProperty ? cssProperty.red_color : '#000',
            borderRadius: dynamicSize(23),
            flexDirection: 'row',
            height: dynamicSize(46),
            alignItems: 'center',
            paddingLeft: dynamicSize(20),
            backgroundColor: white_color,
            color: primary_color

        }}>
            {icon}
            <TextInput placeholderTextColor={'grey'} keyboardType={type} {...props} maxLength={maxLength} style={styles.container} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: dynamicSize(15),
        paddingRight: dynamicSize(30),
        color: '#000000a0',

    }, textStyle: {
        fontFamily: PoppinsRegular,
        color: '#000000a0',

    }
})

