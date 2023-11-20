import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const navigation = useNavigation();

  const checkInternetConnection = useCallback(async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);

    if (!netInfoState.isConnected && buttonPressed) {
      // If no internet connection and button is pressed, navigate to UserHome
      navigation.navigate('UserHome');
    }
  }, [navigation, buttonPressed]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // Update the isConnected state when the connection status changes
      setIsConnected(state.isConnected);
    });

    // Check the internet connection status when the component mounts
    checkInternetConnection();

    // Clean up the event listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [checkInternetConnection]);

  useEffect(() => {
    if (isConnected === true) {
      // Navigate to UserHome when isConnected becomes true
      navigation.navigate('UserHome');
    }
  }, [isConnected, navigation]);

  const handleTryAgain = () => {
    setButtonPressed(true); // Set the buttonPressed state to true
    setIsConnected(null); // Reset isConnected state
    checkInternetConnection(); // Check the internet connection again
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Animatable.Image
        source={require('../../assets/logo.png')}
        animation={'fadeIn'}
        duration={2000}
        className="w-[285px] h-[130px] object-contain bg-contain"
      />

      {isConnected === false && (
        <View className={styles.overlay}>
          {/* Image for no internet connection */}
          <Image
            source={require('../../assets/svg_image.webp')}
            className="w-36 h-36 object-contain bg-white"
          />

          <Text className="text-red-600 font-semibold text-lg">
            No internet connection
          </Text>

          <TouchableOpacity
            className="w-60 justify-center items-center rounded-lg p-3 mt-5 mb-5 bg-ternary"
            onPress={handleTryAgain}>
            <Text className="text-white text-lg font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {isConnected === true && (
        <ActivityIndicator color="green" className="mt-10" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Splash;
