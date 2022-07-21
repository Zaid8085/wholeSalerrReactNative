import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { dynamicSize } from '../../../constants/sizes/dynamicSize';
import { PoppinsRegular, PoppinsSemiBold } from '../../../constants/commonuse/fonts';
import {
    red_color,
    pink_color,
    white_color,
    light_blue
} from '../../../constants/commonuse/Colors';
import LinearGradient from 'react-native-linear-gradient';

export class SubmitBtn extends Component {
    constructor(props) {
        super(props);
    }
    // const { onSubmit, title, isGoogleBtn, icon } = props
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onSubmit()}>
                <LinearGradient colors={[pink_color, red_color]} style={styles.container}>

                    {this.props.isGoogleBtn == true && <Image source={this.props.googleIcon} style={{ height: dynamicSize(40), width: dynamicSize(40), marginRight: dynamicSize(10) }} />}
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                    {this.props.icon && this.iconView()}
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    iconView() {
        return (
            <View style={styles.icon}>
                {this.props.icon}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: dynamicSize(45),
        backgroundColor: white_color,
        borderRadius: dynamicSize(30),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, textStyle: {
        fontFamily: PoppinsSemiBold,
        color: white_color,
        fontWeight: "700",
        fontSize: 17
    }, winViewButton: {
        height: dynamicSize(36),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: white_color,
        paddingRight: dynamicSize(10),
        paddingLeft: dynamicSize(10)
    }, textbuttonText: {
        color: white_color
    }, icon: {
        position: 'relative',
        // right: dynamicSize(200),
        bottom: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        width: 35,
        height: 35,
        backgroundColor: pink_color,
        borderRadius: 100,
        marginLeft: 10,
        padding: 7
    }
})

