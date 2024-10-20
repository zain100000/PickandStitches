import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  useColorScheme,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../constants/Constants';

const {width} = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('onBoarding');
    }, 2000);
  }, []);

  const dynamicStyles = styles(colorScheme);

  return (
    <SafeAreaView style={dynamicStyles.primaryContainer}>
      <View style={dynamicStyles.secondaryContainer}>
        <View style={dynamicStyles.imgContainer}>
          <Image
            source={require('../../assets/splashScreen/splash-logo.png')}
            animation={'fadeIn'}
            duration={1500}
            style={dynamicStyles.Img}
          />
        </View>
        <View>
          <Text style={dynamicStyles.splashTitle}>Pick & Stitches</Text>
          <Text style={dynamicStyles.splashDescription}>
            Online Stitching Service!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = colorScheme =>
  StyleSheet.create({
    primaryContainer: {
      flex: 1,
      backgroundColor:
        colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary,
    },

    secondaryContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.05,
    },

    Img: {
      width: width * 0.8,
      height: width * 0.3,
    },

    splashTitle: {
      fontSize: width * 0.08,
      color: COLORS.white,
      fontFamily: FONTS.semiBold,
      textAlign: 'center',
      letterSpacing: width * 0.005,
    },

    splashDescription: {
      fontSize: width * 0.04,
      color: COLORS.white,
      fontFamily: FONTS.semiBold,
      letterSpacing: width * 0.002,
      textAlign: 'center',
    },
  });
