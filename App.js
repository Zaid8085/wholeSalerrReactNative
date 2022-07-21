import React from 'react'
import { View } from 'react-native'
import StackNavigation from './src/navigation/StackNavigation'
import Toast from 'react-native-toast-message';
console.disableYellowBox = true;


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StackNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

export default App