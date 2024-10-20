import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {COLORS, FONTS} from '../../constants/Constants';

const screenWidth = Dimensions.get('window').width;

const {width, height} = Dimensions.get('window');

class NewsTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [
        'Due To Increasing Rates in Petrol The Delivery Charges Will Be Applicable From Now And The Delivery Charges Will Be 300 Rs/- Only!',
      ],
      translateX: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    const itemWidth = screenWidth * 3;

    Animated.loop(
      Animated.timing(this.state.translateX, {
        toValue: -itemWidth,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }

  render() {
    return (
      <SafeAreaView style={styles.primaryContainer}>
        <View style={styles.newsContainer}>
          <View style={styles.newsLabel}>
            <Text style={styles.newsLabelText}>Latest News</Text>
          </View>
          <View style={styles.marqueeContainer}>
            <Animated.View
              style={[
                styles.marqueeItem,
                {
                  transform: [{translateX: this.state.translateX}],
                  width: screenWidth * 3,
                },
              ]}>
              {this.state.newsItems.map((item, index) => (
                <Text key={index} style={styles.newsText}>
                  {item}
                </Text>
              ))}
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NewsTicker;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  newsContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },

  newsLabel: {
    backgroundColor: COLORS.newsTicker,
    padding: height * 0.025,
    zIndex: 10,
    width: width * 0.35,
  },

  newsLabelText: {
    color: COLORS.dark,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },

  marqueeContainer: {
    flex: 1,
    borderBottomWidth: height * 0.02,
    borderBottomColor: COLORS.dark,
    backgroundColor: COLORS.dark,
    padding: height * 0.01,
    zIndex: 1,
  },

  marqueeItem: {
    flexDirection: 'row',
  },

  newsText: {
    fontSize: width * 0.04,
    color: COLORS.white,
    top: height * 0.015,
    fontFamily: FONTS.semiBold,
  },
});
