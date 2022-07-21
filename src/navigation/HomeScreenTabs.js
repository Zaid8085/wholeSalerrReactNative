import React, { Component, render } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions, Platform, Text, View } from 'react-native';
import Home from '../screens/Tabs/Home';
import Shopping from '../screens/Tabs/Shopping';
import Wishlist from '../screens/Tabs/Wishlist';
import ProfileTab from '../screens/Tabs/ProfileTab';
import { dynamicSize } from '../constants/sizes/dynamicSize';
import {
    primary_color,
    pink_color,
    jungleMistColor,
    smaltBlueColor,
    white_color,
    red_color,
    light_blue,
    orange_color
} from '../constants/commonuse/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../firebase/config';
import { SpeedDial } from 'react-native-elements';

Icon.loadFont();

const Tab = createBottomTabNavigator()

const { width } = Dimensions.get('window')

GetIcon = ({ name, title, colorName }) => {
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: dynamicSize(0),
            paddingVertical: dynamicSize(5),
            marginBottom: dynamicSize(5),
            marginTop: dynamicSize(5)
        }}>
            <Icon name={name} size={20} color={colorName} />
            <Text style={{ marginLeft: dynamicSize(5), color: colorName, marginTop: dynamicSize(2) }}>{title}</Text>
        </View>
    )
}

class HomeScreenTabs extends Component {
    barHeight = dynamicSize(60);
    // open = false;
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
            open: false
        };
    }
    componentDidMount() {
        let documentId = '295dzbF2P8oQipMSrqaW';
        if (this.props.route.params && this.props.route.params.docId) {
            documentId = this.props.route.params.docId
        }
        console.log(documentId)
        const usersCollection = firebase.firestore().collection('UserDetails').doc(documentId).get().then(firestoreDocument => {
            this.data = firestoreDocument.data();
            console.log(this.data)
            this.setState({ externalData: this.data });
        });
    }
    render() {

        if (this.state.externalData !== null) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: primary_color }}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = focused ?
                                        <GetIcon name={"home"} title={"Home"} colorName={pink_color} />
                                        : < GetIcon name={"home"} title={"Home"} colorName={'grey'} />
                                } else if (route.name === 'Shopping') {
                                    iconName = focused
                                        ? <GetIcon name={"shopping-bag"} title={"Shop"} colorName={pink_color} />
                                        : <GetIcon name={"shopping-bag"} title={"Shop"} colorName={'grey'} />;
                                } else if (route.name === 'Wishlist') {
                                    iconName = focused
                                        ? <GetIcon name={"heart"} title={"Wish"} colorName={pink_color} />
                                        : <GetIcon name={"heart"} title={"Wish"} colorName={'grey'} />;
                                } else if (route.name === 'Profile') {
                                    iconName = focused
                                        ? <GetIcon name={"user"} title={"Profile"} colorName={pink_color} />
                                        : <GetIcon name={"user"} title={"Profile"} colorName={'grey'} />
                                }
                                return iconName
                            },
                        })}
                        tabBarOptions={{
                            showLabel: false,
                            tabStyle: {
                                height: this.barHeight,
                                backgroundColor: 'transparent',
                            }, style: {
                                width: width - dynamicSize(50),
                                backgroundColor: "transparent",
                                borderTopWidth: 0,
                                position: 'absolute',
                                bottom: Platform.OS == 'ios' ? 10 : 0,
                                left: 20,
                                right: 0,
                                zIndex: 9999,
                                elevation: 0,
                            }, labelStyle: {
                                marginTop: -15,
                                fontSize: 10,
                            }
                        }}>
                        <Tab.Screen name={'Home'} children={() => <Home userData={this.state.externalData} />} />
                        <Tab.Screen name={'Shopping'} component={Shopping} options={{ tabBarLabel: '' }} />
                        <Tab.Screen name={'Wishlist'} component={Wishlist} options={{ tabBarLabel: '' }} />
                        <Tab.Screen name={'Profile'} children={() => <ProfileTab userData={this.state.externalData} />} />
                    </Tab.Navigator>
                    <SpeedDial
                        backgroundColor={'red'}
                        style={{ position: 'absolute', bottom: 50, color: orange_color }}
                        isOpen={this.state.open}
                        icon={{ name: 'inventory', color: '#fff', backgroundColor: 'transparent' }}
                        openIcon={{ name: 'close', color: '#fff' }}
                        onOpen={() => this.setState({ open: !this.state.open })}
                        onClose={() => this.setState({ open: !this.state.open })}
                    >
                        <SpeedDial.Action
                            icon={{ name: 'shopping-cart', color: '#fff' }}
                            title="Cart"
                            onPress={() => console.log('Add Something')}
                        />
                        <SpeedDial.Action
                            icon={{ name: 'phone', color: '#fff' }}
                            title="Order on phone"
                            onPress={() => console.log('Delete Something')}
                        />
                        <SpeedDial.Action
                            icon={{ name: 'whatsapp', color: '#fff' }}
                            title="Order on Whatsap"
                            onPress={() => console.log('Delete Something')}
                        />
                        <SpeedDial.Action
                            icon={{ name: 'heart', color: '#fff' }}
                            title="Wishlist"
                            onPress={() => console.log('Delete Something')}
                        />
                        <SpeedDial.Action
                            icon={{ name: 'contact-support', color: '#fff' }}
                            title="Contact us"
                            onPress={() => console.log('Delete Something')}
                        />
                    </SpeedDial>
                    <View style={{
                        position: 'absolute',
                        bottom: Platform.OS == 'ios' ? dynamicSize(30) : 0,
                        backgroundColor: light_blue,
                        height: this.barHeight,
                        width: width
                    }}>
                        <View style={{
                            borderRadius: dynamicSize(30),
                            width: width - dynamicSize(30),
                            left: dynamicSize(15),
                            right: dynamicSize(15),
                            height: this.barHeight,
                            backgroundColor: light_blue
                        }}></View>
                    </View>
                </SafeAreaView>
            )
        } else return (<View></View>)
    }

    setOpen(isOpen) {
        this.open = isOpen;
    }
}

export default HomeScreenTabs