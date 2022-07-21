
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import {
    primary_color,
    orange_color,
    white_color,
    light_blue,
    violet,
    grey,
    pink_color,
    red_color
} from '../../constants/commonuse/Colors';
import { SubmitBtn } from '../../screencomponents/commoncomponents/buttons/SubmitBtn';
import { ScreenWidth, dynamicSize } from '../../constants/sizes/dynamicSize';
import { Male, Female } from '../../constants/commonuse/Image';
import auth from '@react-native-firebase/auth';
import { Divider, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

class ProfileTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: primary_color, alignItems: "center", padding: 10 }}>
                <View style={styles.profileCard}>
                    <View style={styles.imageSide}>
                        <Image source={this.props.userData.isMale ? Male : Female} style={styles.image} resizeMode='contain' />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.userText}>{this.props.userData.First_Name} {this.props.userData.Last_Name}</Text>
                        <Text style={styles.userText}>{this.props.userData.Email_Id}</Text>
                        <Text style={styles.userText}>{this.props.userData.Phone_Number}</Text>
                    </View>
                </View>
                <View style={{ height: 400 }}>
                    <FlatList numColumns={2} data={profileOptions} renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card}>
                                <Icon style={styles.icon} name={item.icon} size={20} color={pink_color} />
                                <Text style={styles.text}>
                                    {item.value}
                                </Text>
                            </View>
                        )
                    }} />
                </View>
                <View style={styles.signOut}>
                    <SubmitBtn title={"Log Out"} onSubmit={() => {
                        auth().signOut().then(() => {
                            alert('logout')
                            onSubmit(navigation)
                        })
                    }} icon={<Icon name="logout" size={20} color={white_color} />} />
                </View>
            </View>
        )
    }
}

const onSubmit = (navigation) => {
    navigation.navigate('Login')
}

const profileOptions = [
    { id: 1, value: 'My Orders', icon: 'store' },
    { id: 1, value: 'My Account', icon: 'allergies' },
    { id: 1, value: 'My Wishlist', icon: 'shoppingcart' },
    { id: 1, value: 'My Wallet', icon: 'wallet' },
    { id: 1, value: 'My Address', icon: 'address-card' },
    { id: 1, value: 'Order History', icon: 'history' },
    { id: 1, value: 'Refer & Earn', icon: 'money' },
    { id: 1, value: 'Settings', icon: 'settings' },
    { id: 1, value: 'Contact Us', icon: 'contact-support' },
    { id: 1, value: 'Rate Us', icon: 'star-outline' },
]

const styles = {
    card: {
        width: ScreenWidth / 2 - 20,
        height: dynamicSize(50),
        backgroundColor: white_color,
        // marginLeft: dynamicSize(20),
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 100,
        color: white_color,
        flexDirection: 'row'
    },
    text: {
        fontSize: 17,
        color: primary_color,
        margin: 10,
        fontWeight: '700',
        // borderBottomWidth: 1,
        // borderBottomColor: primary_color
    },
    profileCard: {
        width: ScreenWidth - 20,
        height: 150,
        backgroundColor: light_blue,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        flexDirection: 'row'
    },
    signOut: {
        width: ScreenWidth - 20
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    imageSide: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRightWidth: 1,
        borderRightColor: primary_color
    },
    details: {
        justifyContent: 'center',
        color: white_color,
        fontSize: 15,
        fontWeight: 'bold'
    },
    userText: {
        fontSize: 17,
        color: primary_color,
        marginBottom: 4,
        marginLeft: 10,
        fontWeight: '700',
        fontStyle: 'italic'
    },
    icon: {
        position: 'relative',
        bottom: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        width: 35,
        height: 35,
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 5
    }
}

export default ProfileTab