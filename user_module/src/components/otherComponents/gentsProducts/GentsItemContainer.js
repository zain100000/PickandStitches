import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants/Constants';

const {width, height} = Dimensions.get('window');

const GentsItemsContainer = ({product_pic, product, price, onwards}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const handleItemPress = () => {
    navigation.navigate('gents_order_details', {product_pic, product, price});
  };

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <TouchableOpacity
        onPress={handleItemPress}
        style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: product_pic}} style={styles.image} />
        </View>

        {product && (
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.productText,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              {product}
            </Text>
            <Text
              style={[
                styles.priceText,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Rs.{price}
            </Text>
            <Text
              style={[
                styles.onwardsText,
                {
                  color:
                    colorScheme === 'dark' ? COLORS.primary : COLORS.primary,
                },
              ]}>
              {onwards}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GentsItemsContainer;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: height * 0.08,
  },

  imageContainer: {
    width: width * 0.6,
    height: height * 0.5,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },

  image: {
    width: width * 0.6,
    height: height * 0.5,
    resizeMode: 'cover',
  },

  textContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.015,
    gap: height * 0.01,
  },

  productText: {
    fontSize: width * 0.045,
    fontFamily: FONTS.semiBold,
    marginTop: height * 0.015,
  },

  priceText: {
    fontSize: width * 0.05,
    fontFamily: FONTS.medium,
  },

  onwardsText: {
    fontSize: width * 0.05,
    fontFamily: FONTS.semiBold,
  },
});
