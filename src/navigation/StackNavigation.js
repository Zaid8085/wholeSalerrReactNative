import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import HomeScreenTabs from './HomeScreenTabs';
import UserDetails from '../screens/UserDetails';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: null }} />

                <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} options={{ headerShown: null }} />

                <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: null }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation