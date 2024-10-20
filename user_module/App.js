import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/components/constants/Constants';
import Splash from './src/components/shared/Splash';
import BottomNavigator from './src/components/navigation/BottomNavigator';
import OnBoarding from './src/components/shared/onBoarding';
import GentsProducts from './src/components/screens/gentsProducts/GentsProducts';
import GentsOrderDetails from './src/components/otherComponents/gentsProducts/GentsOrderDetails';
import GentsCheckOut from './src/components/otherComponents/gentsProducts/GentsCheckOut';
import LadiesProducts from './src/components/screens/ladiesProducts/LadiesProducts';
import LadiesOrderDetails from './src/components/otherComponents/ladiesProducts/LadiesOrderDetails';
import LadiesCheckOut from './src/components/otherComponents/ladiesProducts/LadiesCheckOut';
import FeedBack from './src/components/screens/extraScreens/FeedBack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [statusBarColor, setStatusBarColor] = useState(COLORS.primary);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash">
          {props => <Splash {...props} setStatusBarColor={setStatusBarColor} />}
        </Stack.Screen>

        <Stack.Screen name="onBoarding">
          {props => (
            <OnBoarding {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Main">
          {props => (
            <BottomNavigator {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="gents_products">
          {props => (
            <GentsProducts {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="gents_order_details">
          {props => (
            <GentsOrderDetails
              {...props}
              setStatusBarColor={setStatusBarColor}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="gents_checkout">
          {props => (
            <GentsCheckOut {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="ladies_products">
          {props => (
            <LadiesProducts {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="ladies_order_details">
          {props => (
            <LadiesOrderDetails
              {...props}
              setStatusBarColor={setStatusBarColor}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ladies_checkout">
          {props => (
            <LadiesCheckOut {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="feed_back">
          {props => (
            <FeedBack {...props} setStatusBarColor={setStatusBarColor} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
