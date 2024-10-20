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

const TailorWorks = () => {
  const colorScheme = useColorScheme();

  const steps = [
    {
      image: require('../../../assets/tailorWorking/work-1.png'),
      title: 'CUSTOMISE & PLACE ORDER ONLINE',
      description:
        'Choose your product and personalize it with custom necklines, sleeves, etc.',
    },
    {
      image: require('../../../assets/tailorWorking/work-2.png'),
      title: 'GIVE US YOUR MEASUREMENT GARMENT',
      description:
        'While we pick up your dress material, give us a perfectly fitting garment to stitch as per your measurements.',
    },
    {
      image: require('../../../assets/tailorWorking/work-3.png'),
      title: '3 TO 5 DAYS TO STITCH & DELIVER',
      description:
        'Each material is individually hand-cut, stitched, and finished by professional tailors and delivered to your doorstep.',
    },
    {
      image: require('../../../assets/tailorWorking/work-4.png'),
      title: 'PAY ON DELIVERY',
      description:
        'Pay by cash after you receive your newly stitched outfit along with the measurement garment.',
    },
  ];

  return (
    <SafeAreaView style={styles.primaryContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>How Tailor Works Online</Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Image source={step.image} style={styles.stepImage} />
              <Text
                style={[
                  styles.stepTitle,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}>
                {step.title}
              </Text>
              <Text
                style={[
                  styles.stepDescription,
                  {
                    color:
                      colorScheme === 'dark' ? COLORS.lightGray : COLORS.dark,
                  },
                ]}>
                {step.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TailorWorks;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    flex: 1,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },

  headerText: {
    color: COLORS.primary,
    fontSize: width * 0.065,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
  },

  stepsContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  stepItem: {
    alignItems: 'center',
    marginBottom: height * 0.05,
    paddingHorizontal: width * 0.05,
  },

  stepImage: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },

  stepTitle: {
    fontSize: width * 0.05,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },

  stepDescription: {
    fontSize: width * 0.04,
    textAlign: 'center',
    lineHeight: height * 0.03,
    marginTop: height * 0.01,
    fontFamily: FONTS.semiBold,
  },
});
