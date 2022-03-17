import React from 'react';
import {
    Dimensions,
    View,
    Image,
} from 'react-native';
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const SplashScreen = () => {
    return (
        <View>
            <Image style={{width: deviceWidth, height: deviceHeight}}
                source={require('../../assets/splash.jpg')}
            ></Image>
        </View>
    )
}
export default SplashScreen