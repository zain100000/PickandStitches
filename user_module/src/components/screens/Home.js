import React, {useEffect} from 'react';
import {
  StyleSheet,
  useColorScheme,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../constants/Constants';
import NewsTicker from '../otherComponents/newsTicker/NewsTicker';
import TailorOnline from '../otherComponents/tailorOnline/TailorOnline';
import Products from '../otherComponents/products/Products';
import TailorWorks from '../otherComponents/tailorWorking/TailorWorking';
import Footer from './extraScreens/Footer';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  return (
    <SafeAreaView
      style={[
        styles.primaryContainer,
        {
          backgroundColor:
            colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
        },
      ]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <NewsTicker />

        <TailorOnline />

        <Products />

        <TailorWorks />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },
});
