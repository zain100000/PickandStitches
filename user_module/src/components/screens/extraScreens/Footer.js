import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../../constants/Constants';

const {width, height} = Dimensions.get('window');

const Footer = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.primaryContainer,
        {
          backgroundColor:
            colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
        },
      ]}>
      <View style={styles.footerContent}>
        <Text
          style={[
            styles.titleText,
            {color: colorScheme === 'dark' ? COLORS.primary : COLORS.primary},
          ]}>
          Our Contact
        </Text>

        <View style={styles.contactItem}>
          <Feather
            name="phone"
            size={22}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
            style={styles.icon}
          />
          <Text
            style={[
              styles.contactText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            (048) 3874576
          </Text>
        </View>

        <View style={styles.contactItem}>
          <Feather
            name="mail"
            size={22}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
            style={styles.icon}
          />
          <Text
            style={[
              styles.contactText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            pickandstitches@gmail.com
          </Text>
        </View>

        <View style={styles.contactItem}>
          <Feather
            name="heart"
            size={22}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
            style={styles.icon}
          />
          <Text
            style={[
              styles.contactText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            support@pickandstitches.com
          </Text>
        </View>

        <View style={styles.contactItem}>
          <Feather
            name="map"
            size={22}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
            style={styles.icon}
          />
          <Text
            style={[
              styles.contactText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            Peshawar Road Rawalpindi
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  primaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerContent: {
    alignItems: 'center',
    paddingVertical: height * 0.04,
  },

  titleText: {
    fontSize: width * 0.065,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    marginBottom: height * 0.03,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
    width: width * 0.8,
  },

  icon: {
    width: width * 0.09,
  },

  contactText: {
    flex: 1,
    fontSize: width * 0.042,
    fontFamily: FONTS.semiBold,
    textAlign: 'justify',
  },
});
