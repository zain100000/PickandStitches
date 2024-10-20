import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  useColorScheme,
} from 'react-native';
import {COLORS, FONTS} from '../../constants/Constants';

const {width, height} = Dimensions.get('window');

const TailorOnline = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <View style={styles.titleBorder}>
            <Text style={styles.titleText}>Hi! We’re Tailor Online</Text>
          </View>

          <Text
            style={[
              styles.descriptionText,
              {
                color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
              },
            ]}>
            We offer the modern-day woman and man an unparalleled
            made-to-measure online tailoring service. It is a unique experience
            that lets you express your personal sense of style without having to
            worry about design, fit, quality, and delivery commitment. Offering
            free pick-up and delivery service in Rawalpindi, Islamabad, the
            service provides customizable designs in blouses, kurtas, suits, and
            bottoms according to the client's individual measurement.
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/tailorOnline/tailor-online.png')}
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TailorOnline;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },

  titleText: {
    color: COLORS.primary,
    fontSize: width * 0.065,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
  },

  descriptionText: {
    fontSize: width * 0.04,
    textAlign: 'justify',
    marginTop: height * 0.03,
    lineHeight: height * 0.035,
    paddingHorizontal: width * 0.05,
    fontFamily: FONTS.semiBold,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: width * 0.98,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
});
