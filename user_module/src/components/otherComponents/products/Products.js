import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {COLORS, FONTS} from '../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Products = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.titleText,
              {color: colorScheme ? COLORS.primary : COLORS.primary},
            ]}>
            Products
          </Text>
        </View>

        <View style={styles.productContainer}>
          <Image
            source={require('../../../assets/products/gent.png')}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('gents_products')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Gents Products</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Image
            source={require('../../../assets/products/lady.png')}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ladies_products')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Ladies Products</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontSize: width * 0.08,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
  },

  productContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.035,
  },

  image: {
    width: width * 0.7,
    height: height * 0.5,
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.15,
    borderRadius: 10,
    marginTop: height * 0.02,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
});
