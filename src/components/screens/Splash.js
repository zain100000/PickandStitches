import React, {useEffect} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('DashBoard');
    }, 2000);
  }, []);

  return (
    <View className="flex-1 justify-center">
      <View className="items-center">
        <Animatable.Image
          source={require('../../assets/logo.png')}
          animation={'fadeIn'}
          duration={2000}
          className="object-contain w-[285px] h-[130px]"
        />
      </View>
    </View>
  );
};

export default Splash;
