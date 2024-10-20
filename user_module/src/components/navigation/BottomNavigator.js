import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FONTS} from '../constants/Constants';
import Home from '../screens/Home';
import GentsProducts from '../screens/gentsProducts/GentsProducts';
import LadiesProducts from '../screens/ladiesProducts/LadiesProducts';
import FeedBack from '../screens/extraScreens/FeedBack';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

const BottomNavigator = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          colorScheme === 'dark' ? COLORS.primary : COLORS.primary,
        tabBarInactiveTintColor:
          colorScheme === 'dark' ? COLORS.white : COLORS.dark,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor:
              colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View style={styles.imageContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/navigatorIcons/home-fill.png')
                    : require('../../assets/navigatorIcons/home.png')
                }
                style={[
                  styles.image,
                  {
                    tintColor: focused
                      ? COLORS.primary
                      : colorScheme === 'dark'
                      ? COLORS.white
                      : COLORS.dark,
                  },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Gents Products"
        component={GentsProducts}
        options={{
          tabBarLabel: 'Gents',
          tabBarIcon: ({focused}) => (
            <View style={styles.imageContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/navigatorIcons/gent-fill.png')
                    : require('../../assets/navigatorIcons/gent.png')
                }
                style={[
                  styles.image,
                  {
                    tintColor: focused
                      ? COLORS.primary
                      : colorScheme === 'dark'
                      ? COLORS.white
                      : COLORS.dark,
                  },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Ladies Products"
        component={LadiesProducts}
        options={{
          tabBarLabel: 'Ladies',
          tabBarIcon: ({focused}) => (
            <View style={styles.imageContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/navigatorIcons/lady-fill.png')
                    : require('../../assets/navigatorIcons/lady.png')
                }
                style={[
                  styles.image,
                  {
                    tintColor: focused
                      ? COLORS.primary
                      : colorScheme === 'dark'
                      ? COLORS.white
                      : COLORS.dark,
                  },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="FeedBack"
        component={FeedBack}
        options={{
          tabBarLabel: 'FeedBack',
          tabBarIcon: ({focused}) => (
            <View style={styles.imageContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/navigatorIcons/feedback-fill.png')
                    : require('../../assets/navigatorIcons/feedback.png')
                }
                style={[
                  styles.image,
                  {
                    tintColor: focused
                      ? COLORS.primary
                      : colorScheme === 'dark'
                      ? COLORS.white
                      : COLORS.dark,
                  },
                ]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: height * 0.08,
    elevation: 8,
  },

  tabBarLabel: {
    fontSize: width * 0.035,
    fontFamily: FONTS.bold,
    marginBottom: height * 0.01,
  },

  imageContainer: {
    marginTop: height * 0.01,
  },

  image: {
    width: width * 0.07,
    height: height * 0.04,
    resizeMode: 'contain',
  },
});
