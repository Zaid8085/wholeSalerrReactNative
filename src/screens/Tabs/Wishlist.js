import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { light_blue, orange_color, primary_color, red_color, white_color } from '../../constants/commonuse/Colors';
import { fruits, strawberry } from '../../constants/commonuse/Image';
import { dynamicSize, ScreenWidth } from '../../constants/sizes/dynamicSize';
import { SubmitBtn } from '../../screencomponents/commoncomponents/buttons/SubmitBtn';

const { width } = Dimensions.get('window')

const Wishlist = () => {
    return (
        <View style={{ flex: 1, backgroundColor: primary_color, justifyContent: "flex-start", alignItems: "center" }}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles.card}>
                <View style={styles.leftSide}>
                    <Image source={strawberry} style={{ height: '100%', width: '100%', borderRadius: 10, marginRight: 5 }} resizeMode='contain' />
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.label}>
                        Strawberry
                    </Text>
                    <View style={styles.qty}>
                        <Icon style={styles.icon} name="add" size={15} color={orange_color} />
                        <Text style={styles.qty}>
                            Qty. 1
                        </Text>
                        <Icon style={styles.icon} name="remove" size={15} color={orange_color} />
                    </View>
                    <Text style={styles.price}>
                        Rs 700
                    </Text>
                    <View style={styles.bottomRow}>
                        <View style={styles.bottomRowLeft}>
                            <SubmitBtn style={styles.btn} title={"Move to bag"} onSubmit={() => {
                                console.log()
                            }} icon={<Icon name="forward" size={20} color={white_color} />} />
                        </View>
                        <View style={styles.bottomRowRight}>
                            <Icon style={styles.deleteIcon} name="delete" size={25} color={orange_color} />
                        </View>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </View>
    )
}

const styles = {
    card: {
        width: ScreenWidth - dynamicSize(20),
        height: dynamicSize(150),
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        margin: dynamicSize(20),
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'row'
    },
    leftSide: {
        width: '30%',
        marginRight: 10,
        height: '100%'
    },
    rightSide: {
        width: '70%',
        flex: 1
    },
    btn: {
        width: '100%'
    },
    label: {
        fontSize: 20,
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        flexDirection: 'row',
        alignItems: 'space-between'
    },
    qty: {
        flexDirection: 'row',
        fontStyle: 'italic'
    },
    price: {
        fontStyle: 'italic',
        color: 'green'
    },
    icon: {
        position: 'relative',
        bottom: 5,
        margin: 5,
        width: 20,
        height: 20,
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 2
    },
    deleteIcon: {
        position: 'relative',
        // bottom: 5,
        // margin: 5,
        // width: '30%',
        height: 40,
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 2
    },
    remove: {
        position: 'relative',
        left: 100,
        width: 25,
        height: 25,
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 0
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'space-between',
        width: '100%',
        // backgroundColor: 'black'
    },
    bottomRowLeft: {
        width: '80%'
    },
    bottomRowRight: {
        width: '20%'
    }
}
export default Wishlist