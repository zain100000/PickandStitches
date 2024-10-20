import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import CustomModal from '../../utils/Modals/CustomModal';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const FeedBack = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [nameError, setNameError] = useState('');

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  const handleNameChange = value => {
    setName(value);
    if (value === '') {
      setNameError('Name is required');
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError('Only alphabets are allowed');
    } else {
      setNameError('');
    }
  };

  useEffect(() => {
    setIsButtonEnabled(
      name.trim() !== '' && message.trim() !== '' && !nameError,
    );
  }, [name, message, nameError]);

  const handleFeedback = async () => {
    setLoading(true);

    try {
      const feedbackData = {
        name,
        message,
        createdAt: Date.now(),
      };

      const response = await firestore()
        .collection('feed_backs')
        .add(feedbackData);

      if (response) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting feedback: ', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
      setName('');
      setMessage('');
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.primaryContainer,
        {
          backgroundColor:
            colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
        },
      ]}>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor:
              colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={30}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.feedbackContainer}>
          <Text
            style={[
              styles.feedbackTitleText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            FeedBack
          </Text>
          <Text
            style={[
              styles.feedbackDescriptionText,
              {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
            ]}>
            What will you think about us?
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Name
            </Text>

            <View style={styles.inputFieldContainer}>
              <Feather
                name="user"
                size={25}
                color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                style={styles.icon}
              />
              <TextInput
                style={[
                  styles.inputField,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}
                placeholder="Enter Your Name"
                placeholderTextColor={
                  colorScheme === 'dark' ? COLORS.gray : COLORS.dark
                }
                value={name}
                onChangeText={handleNameChange}
              />
              {nameError && nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Message
            </Text>

            <View style={styles.inputFieldContainer}>
              <Feather
                name="message-circle"
                size={25}
                color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                style={styles.icon}
              />
              <TextInput
                style={[
                  styles.inputField,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}
                placeholder="Enter Your Message!"
                placeholderTextColor={
                  colorScheme === 'dark' ? COLORS.gray : COLORS.dark
                }
                multiline={true}
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={handleFeedback}
              style={[
                styles.submitBtn,
                {
                  backgroundColor: isButtonEnabled
                    ? COLORS.primary
                    : COLORS.gray,
                },
              ]}>
              <Text style={styles.submitText}>
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size={25} />
                ) : (
                  'Submit'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomModal
        visible={showSuccessModal}
        title="Success!"
        description="Your feedback has been submit successfully."
        animationSource={require('../../../assets/animations/success.json')}
        onClose={() => setShowSuccessModal(false)}
      />

      <CustomModal
        visible={showErrorModal}
        title="Failure!"
        description="Error occured during feedback submition."
        animationSource={require('../../../assets/animations/failure.json')}
        onClose={() => setShowErrorModal(false)}
      />
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },

  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.05,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
  },

  feedbackContainer: {
    marginTop: height * 0.15,
    marginLeft: width * 0.05,
  },

  feedbackTitleText: {
    fontSize: width * 0.09,
    color: COLORS.dark,
    fontFamily: FONTS.bold,
  },

  feedbackDescriptionText: {
    color: COLORS.dark,
    fontSize: width * 0.042,
    fontFamily: FONTS.medium,
    width: width * 0.9,
    lineHeight: height * 0.03,
  },

  formContainer: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.05,
    gap: height * 0.03,
  },

  label: {
    fontSize: width * 0.045,
    fontFamily: FONTS.regular,
    color: COLORS.dark,
    marginBottom: height * 0.01,
  },

  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.primary,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },

  icon: {
    marginRight: width * 0.02,
  },

  btnContainer: {
    marginBottom: height * 0.02,
    width: '100%',
  },

  submitBtn: {
    width: '100%',
    alignItems: 'center',
    padding: height * 0.024,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  submitText: {
    fontSize: width * 0.045,
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
  },

  errorText: {
    position: 'absolute',
    bottom: -25,
    fontSize: width * 0.04,
    color: COLORS.errorColor,
    fontFamily: FONTS.semiBold,
    paddingHorizontal: 5,
  },
});
