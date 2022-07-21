import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    primary_color,
    white_color,
    red_color,
    pink_color,
    light_blue,
    orange_color
} from '../../constants/commonuse/Colors';
import { fruits, strawberry } from '../../constants/commonuse/Image';
import { dynamicSize, ScreenWidth } from '../../constants/sizes/dynamicSize';
import veggies from '../../assets/Images/veggies.png';
import { InfoTextinput } from '../../screencomponents/commoncomponents/textinputs/InfoTextinput';
import fruitsC from '../../assets/Images/fruitsC.png';
import staples from '../../assets/Images/staples.png';
import cleaning from '../../assets/Images/cleaning.png';
import health from '../../assets/Images/health.png';
import beauty from '../../assets/Images/beauty.png';
import CarouselCards from '../../screencomponents/commoncomponents/CarouselCards';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')



Icon.loadFont()
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.userData) {
            return (
                <View style={{ flex: 1, backgroundColor: primary_color, padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 30, color: white_color }}>Hey {this.props.userData.First_Name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="shopping-cart" style={styles.icon} size={20} color={orange_color} />
                            <View>
                                <Icon style={styles.icon} name="bell" size={20} color={pink_color} />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, flex: 1 }}>
                        <View style={styles.search}>
                            <InfoTextinput placeholder={"Search anything..."} title={""}
                                icon={<Icon name="search" size={20} color={pink_color} />}
                                onChangeText={(i) => { console.log(i) }} />
                        </View>
                        <Text style={styles.fontText1}>Category</Text>
                        <View style={{ flexDirection: 'row', marginTop: dynamicSize(5) }}>
                            {/* <ScrollView horizontal={true}> */}
                            <FlatList showsHorizontalScrollIndicator={false}
                                numColumns={3} data={categories} renderItem={({ item, index }) => {
                                    return (<View style={styles.popular}>
                                        <Image source={item.image} style={{ height: 35, width: 40, borderRadius: 100 }} resizeMode='contain' />
                                        <Text style={{ fontSize: 15 }}> {item.categoryName}</Text>
                                    </View>
                                    )
                                }} />
                            {/* </ScrollView> */}
                        </View>
                        {/* <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2} style={{ flex: 1, marginTop: 10, marginBottom: 36 }} data={categories} renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        height: 200, borderRadius: 20,
                                        marginHorizontal: 13,
                                        opacity: .8,
                                        justifyContent: 'center',
                                        marginVertical: 10, backgroundColor: light_blue
                                    }}>
                                        <Image source={index % 2 == 0 ? strawberry : fruits} style={{ height: 150, width: width / 2 - 40 }} resizeMode='contain' />
                                        <Text style={{ alignSelf: 'center', fontSize: 20, color: primary_color }}>{item.categoryName}</Text>
                                    </View>
                                )
                            }} /> */}
                        <ScrollView>
                            <CarouselCards />
                        </ScrollView>
                    </View>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 8,
        elevation: 7,
        // paddingTop: 2
    },
    fontText: {
        fontSize: 20,
        color: white_color,
        opacity: .6
    }, fontText1: {
        fontSize: 25,
        color: white_color,
        marginTop: 10
    }, popular: {
        flexDirection: 'row',
        width: ScreenWidth / 3 - dynamicSize(15),
        borderRadius: 100,
        backgroundColor: light_blue,
        height: dynamicSize(50),
        textAlign: 'center',
        // justifyContent: 'center',
        alignItems: 'center',
        color: primary_color,
        marginRight: dynamicSize(10),
        marginBottom: dynamicSize(10),
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }, search: {
        width: ScreenWidth - 20
    }, icon: {
        position: 'relative',
        bottom: 2,
        // margin: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 9,
        width: 40,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 100,
        padding: 10,
        marginRight: 5
    }
})

export const categories = [
    { categoryId: 1, categoryName: 'Staples', image: staples },
    { categoryId: 1, categoryName: 'Cleaning', image: cleaning },
    { categoryId: 1, categoryName: 'Beauty', image: beauty },
    { categoryId: 1, categoryName: 'Health', image: health },
    { categoryId: 1, categoryName: 'Fruits', image: fruitsC },
    { categoryId: 1, categoryName: 'Veggies', image: veggies },
    { categoryId: 1, categoryName: 'Staples', image: staples },
    { categoryId: 1, categoryName: 'Cleaning', image: cleaning },
    { categoryId: 1, categoryName: 'Beauty', image: beauty },
    { categoryId: 1, categoryName: 'Health', image: health },
    { categoryId: 1, categoryName: 'Fruits', image: fruitsC },
    { categoryId: 1, categoryName: 'Veggies', image: veggies },
]

export default Home