import { firebase } from '@react-native-firebase/app';
// import * as firebase from '@react-native-firebase';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDZ5HYrpNbbM90g0SZ_C0D8qkb6A2Y_O4s',
    authDomain: 'wholesalerr-be.firebaseapp.com',
    databaseURL: 'https://wholesalerr-be.firebaseio.com',
    projectId: 'wholesalerr-be',
    storageBucket: 'wholesalerr-be.appspot.com',
    messagingSenderId: '722454451939',
    appId: '1:722454451939:android:26523051d282bef9f3d7d6',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };