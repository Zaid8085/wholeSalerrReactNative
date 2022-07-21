import React, { useState, Component, createRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { dynamicSize, ScreenHeight, ScreenWidth } from '../constants/sizes/dynamicSize';
import { InfoTextinput } from '../screencomponents/commoncomponents/textinputs/InfoTextinput';
import { white_color, red_color } from '../constants/commonuse/Colors';
import { SubmitBtn } from '../screencomponents/commoncomponents/buttons/SubmitBtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logo, loginBackground, googleIcon } from '../constants/commonuse/Image';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { firebase } from '../firebase/config';
import Recaptcha from 'react-native-recaptcha-that-works';
import UserDetails from './UserDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    console.log('google sign in')
    return auth().signInWithCredential(googleCredential);
}

GoogleSignin.configure({
    webClientId: '722454451939-cedak3qk6pjj5l3qhcdtmno0i2hk50cf.apps.googleusercontent.com',
});


// const Login = () => {
//     return;
// }


class Login extends Component {
    data = 'test';
    userInfo;
    phoneNumber;
    emailId;
    password;
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
            pushData: [],
            loggedIn: false,
            confirm: null,
            code: '',
            docId: null
        };
    }

    send = () => {
        console.log('send!');
        this.recaptcha.current.open();
    }

    onVerify = token => {
        console.log('success!', token);
    }

    onExpire = () => {
        console.warn('expired!');
    }

    componentDidMount() {
        const usersCollection = firebase.firestore().collection('UserDetails').doc('EpiqUmKInh8RLeDeBWmw').get().then(firestoreDocument => {
            this.data = firestoreDocument.data();
            this.setState({ externalData: this.data });
        });
        GoogleSignin.configure({
            webClientId: '22454451939-ts14rmf4fqpjlv6he9gu1fcg0b2lncek.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
        });
    }

    render() {
        const { html, source, url, onMessage, ...props } = this.props
        if (this.state.externalData === null) {
            return <Text>Test</Text>
        } else {
            return (
                <ImageBackground source={loginBackground} style={styles.image}>
                    <View style={styles.container}>
                        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", height: dynamicSize(120) }}>
                        </View>
                        <View style={styles.background}>
                            <View style={styles.textViewStyle}>
                                <InfoTextinput placeholder={"Enter Email ID"} title={""} type={"email-address"}
                                    icon={<Icon name="user" size={20} color={red_color} />}
                                    onChangeText={(i) => { this.setp1(i) }} />
                            </View>
                            <View style={styles.textViewStyle}>
                                <InfoTextinput placeholder={"Password"} title={""}
                                    icon={<Icon name="key" size={20} color={red_color} />}
                                    onChangeText={(i) => { this.setp2(i) }} />
                            </View>
                            <Text style={{ fontSize: 14, color: white_color, marginTop: dynamicSize(15), alignSelf: "flex-end" }}>{"Forgot Password ?"}</Text>
                            <View style={styles.btnStyle}>
                                <SubmitBtn title={"Sign In/Sign Up"} onSubmit={() => this.loginUser()} />
                            </View>

                            {/* <View>
                                <Text style={{ fontSize: 14, color: white_color, alignSelf: 'center', marginTop: dynamicSize(15) }}>{"OR"}</Text>
                            </View> */}
                            {/* <View style={[styles.btnStyle, { height: 50 }]}>
                                <SubmitBtn isGoogleBtn={false} title={"New User? Register here"} onSubmit={() => {
                                    auth().createUserWithEmailAndPassword(this.emailId, this.password).then((data) => {
                                        console.log(data)
                                    });

                                }} />
                            </View> */}
                            {/* <View style={styles.buttonContainer}>
                                {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                                {this.state.loggedIn && <Button onPress={this.signOut}
                                    title="Signout"
                                    color="#841584">
                                </Button>}
                            </View> */}
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.termsConditionText}>Terms and Condition</Text>
                        </View>
                    </View>
                </ImageBackground>
            )
        }
    }

    async onSubmit() {
        await firebase.firestore()
            .collection('UserDetails')
            .where('Email_Id', '==', this.emailId)
            .get()
            .then(querySnapshot => {
                console.log(querySnapshot)
                this.setState({ docId: querySnapshot.docs[0].id })
            });
        await this.props.navigation.navigate('HomeScreenTabs', { docId: this.state.docId })
    }

    async loginUser() {
        let response;
        await auth().signInWithEmailAndPassword(this.emailId, this.password).then((data) => {
            console.log(data)
            this.onSubmit()
        }).catch(error => {
            if (error.code === 'auth/user-not-found') {
                const newUser = auth().createUserWithEmailAndPassword(this.emailId, this.password).then(() => {
                    this.createUser();
                }).catch(err => {
                    if (err.code === 'auth/weak-password') {
                        alert("Enter Strong Password")
                    }
                })
            }
        })
    }

    createUser() {
        firebase.firestore().collection('UserDetails').add({
            Email_Id: this.emailId,
            password: this.password
        })
            .then((data) => {
                alert('User added!');
                console.log(data)
                this.props.navigation.navigate('UserDetails', { docId: data.id });
            });
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            this.userInfo = await GoogleSignin.signIn();

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                this.setState({ loggedIn: false });
            } else {
                this.setState({ loggedIn: false });
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    setp1(i) {
        console.log(i)
        this.emailId = i;
    }

    setp2(i) {
        console.log(i)
        this.password = i;
    }

    signInWithPhoneNumber = async () => {
        const confirmation = await auth().signInWithPhoneNumber(this.phoneNumber);
        console.log(confirmation)
        this.setState({ confirm: confirmation });
    }

    async confirmCode() {
        try {
            await this.state.confirm(this.state.code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: ScreenHeight,
        width: ScreenWidth,
    },
    textViewStyle: {
        marginTop: dynamicSize(25)
    }, btnStyle: {
        marginTop: dynamicSize(25)
    }, image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }, termsConditionText: {
        fontSize: dynamicSize(14),
        color: white_color,
        alignSelf: "center",
        textDecorationLine: "underline",
    }, background: {
        backgroundColor: "#000000a0",
        padding: dynamicSize(20),
        margin: dynamicSize(20),
        borderRadius: 30
    }, footer: {
        width: ScreenWidth + dynamicSize(30),
        backgroundColor: "#000000a0",
        height: dynamicSize(20),
        marginTop: dynamicSize(100)
    }
})

export default Login