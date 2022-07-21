import { ceiling } from 'prelude-ls';
import React, { useState, Component, createRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';
import { primary_color, white_color, red_color, orange_color } from '../constants/commonuse/Colors';
import { ScreenHeight, ScreenWidth, dynamicSize } from '../constants/sizes/dynamicSize';
import { InfoTextinput } from '../screencomponents/commoncomponents/textinputs/InfoTextinput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SubmitBtn } from '../screencomponents/commoncomponents/buttons/SubmitBtn';
import { firebase } from '../firebase/config';
import { type } from 'react-native-recaptcha-v3';
import { CheckBox } from 'react-native-elements'

class UserDetails extends Component {
    firstName;
    lastName;
    phoneNumber;
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
            docId: this.props.route.params.docId,
            // docId: null,
            checkedM: false,
            checkedF: false
        };
    }

    render() {
        let cssProperty = {
            red_color: red_color
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.line1}>
                        <Text style={styles.line1Text}>Thanks for Signing Up, you're alomost done!</Text>
                        {/* <Text style={styles.headerText}>Thanks for Signing Up, you alomost done!</Text> */}
                    </View>
                    <View style={styles.line2}>
                        <Text style={styles.line2Text}>Please, help us to know more about you, by entering below details.</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.textViewStyle}>
                            <InfoTextinput cssProperty={cssProperty} placeholder={"First Name"} title={""}
                                maxLength={15}
                                icon={<Icon name="user-circle" size={20} color={primary_color} />}
                                onChangeText={(i) => { this.firstName = i }} />
                        </View>
                        <View style={styles.textViewStyle}>
                            <InfoTextinput cssProperty={cssProperty} placeholder={"Last Name"} title={""}
                                maxLength={15}
                                icon={<Icon name="user-circle-o" size={20} color={primary_color} />}
                                onChangeText={(i) => { this.lastName = i }} />
                        </View>
                        <View style={styles.textViewStyle}>
                            <InfoTextinput cssProperty={cssProperty} placeholder={"Mobile Number"} title={""}
                                type={'number-pad'} maxLength={10}
                                icon={<Icon name="phone" size={20} color={primary_color} />}
                                onChangeText={(i) => { this.phoneNumber = i }} />
                        </View>
                        <View style={styles.checkbox}>
                            <CheckBox
                                title='Male'
                                checked={this.state.checkedM}
                                onPress={() => this.setState({ checkedM: !this.state.checkedM })}
                            />
                            <CheckBox
                                style={{ backgroundColor: 'transparent' }}
                                title='Female'
                                checked={this.state.checkedF}
                                onPress={() => this.setState({ checkedF: !this.state.checkedF })}
                            />
                        </View>
                        <View style={styles.textViewStyle}>
                            <SubmitBtn title={"Continue"} onSubmit={() => this.continueToLogin()} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    continueToLogin() {
        firebase.firestore().collection('UserDetails').doc(this.state.docId)
            .update({
                First_Name: this.firstName,
                Last_Name: this.lastName,
                Phone_Number: this.phoneNumber,
                isMale: this.state.checkedM,
                isFemale: this.state.checkedF
            })
            .then((data) => {
                alert('User added!');
                console.log(data)
                this.props.navigation.navigate('HomeScreenTabs', { docId: this.state.docId });
            });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: ScreenHeight,
        width: ScreenWidth,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white_color
    },
    form: {
        flex: 1,
        height: dynamicSize(300),
        width: dynamicSize(300),
    },
    textViewStyle: {
        marginTop: dynamicSize(25),
        width: dynamicSize(300)
    },
    line1: {
        marginTop: dynamicSize(20),
    },
    line2: {
        marginTop: dynamicSize(20),
        marginBottom: dynamicSize(100)
    },
    line1Text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        // paddingLeft: dynamicSize(7),
        // paddingRight: dynamicSize(7),
        textAlign: 'center'
        // marginBottom: dynamicSize(100)
    },
    line2Text: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: dynamicSize(30),
        paddingRight: dynamicSize(30),
        textAlign: 'center',
    },
    checkbox: {
        flexDirection: 'row',
        marginTop: dynamicSize(20),
        borderWidth: 1,
        borderColor: red_color,
        borderRadius: 100,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
})
export default UserDetails