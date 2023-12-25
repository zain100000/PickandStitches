import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FeedBack = () => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Declare and initialize refs
  const fullnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const formTranslateY = new Animated.Value(200);

  const animateScreen = () => {
    Animated.parallel([
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animateScreen();
  }, []);

  const handleSignup = () => {
    // Validation logic
    if (!fullname) {
      alert('Fullname field is empty');
      fullnameRef.current.focus();
      return;
    }
    if (!email) {
      alert('Email field is empty');
      emailRef.current.focus();
      return;
    }
    if (!mobile) {
      alert('Mobile field is empty');
      mobileRef.current.focus();
      return;
    }
    if (!subject) {
      alert('Subject field is empty');
      subjectRef.current.focus();
      return;
    }
    if (!message) {
      alert('Message field is empty');
      messageRef.current.focus();
      return;
    }

    // If all fields are filled, you can proceed to submit the form
    setLoading(true);

    // Simulate a delayed action for demonstration
    setTimeout(() => {
      setLoading(false);
      alert(
        'Thank You! Your Feedback is Submitted Successfully, We Will Contact You Soon!',
      );

      // Clear the form by resetting the state variables
      setFullName('');
      setEmail('');
      setMobile('');
      setSubject('');
      setMessage('');
    }, 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true); // Start the refreshing indicator

    // Simulate a delay to show the refreshing indicator
    setTimeout(() => {
      // Clear the form by resetting the state variables
      setFullName('');
      setEmail('');
      setMobile('');
      setSubject('');
      setMessage('');
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay (adjust as needed)
  };

  return (
    <ImageBackground
      source={require('../../../../assets/feedback_bg.jpg')}
      className="flex-1 bg-cover object-cover">
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <Animated.View
            style={[
              styles.container,
              {transform: [{translateY: formTranslateY}]},
            ]}>
            {/* Form Start */}

            <View className="flex-1 inset-y-0 mt-16 px-3">
              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <AntDesign name="user" size={25} color={'#fff'} />
                </View>
                <TextInput
                  className="text-sm px-5 text-white w-full"
                  placeholder="Your Name"
                  placeholderTextColor={'#fff'}
                  value={fullname}
                  onChangeText={setFullName}
                  ref={fullnameRef}
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                />
              </View>

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <AntDesign name="mail" size={25} color={'#fff'} />
                </View>
                <TextInput
                  className="text-sm px-5 text-white w-full"
                  keyboardType="email-address"
                  placeholder="Your Email"
                  placeholderTextColor={'#fff'}
                  value={email}
                  onChangeText={setEmail}
                  ref={emailRef}
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                />
              </View>

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <AntDesign name="mobile1" size={25} color={'#fff'} />
                </View>
                <TextInput
                  className="text-sm px-5 text-white w-full"
                  keyboardType="number-pad"
                  placeholder="Your Phone"
                  placeholderTextColor={'#fff'}
                  value={mobile}
                  onChangeText={setMobile}
                  ref={mobileRef}
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                />
              </View>

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <AntDesign name="book" size={25} color={'#fff'} />
                </View>
                <TextInput
                  className="text-sm px-5 text-white w-full"
                  placeholder="Subject"
                  placeholderTextColor={'#fff'}
                  value={subject}
                  onChangeText={setSubject}
                  ref={subjectRef}
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                />
              </View>

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="justify-center">
                  <AntDesign name="message1" size={25} color={'#fff'} />
                </View>
                <TextInput
                  className="text-sm px-5 text-light border-b-2 border-b-black w-full"
                  placeholder="Message"
                  placeholderTextColor="white"
                  multiline={true}
                  numberOfLines={6}
                  value={message}
                  onChangeText={setMessage}
                  ref={messageRef}
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                />
              </View>

              {/* Button Start */}
              <TouchableOpacity
                className="justify-center items-center rounded-lg p-3 mt-5 mb-5 bg-primary"
                onPress={handleSignup}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} /> // Show loader while loading
                ) : (
                  <Text
                    className="text-white text-xl"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Submit
                  </Text> // Show login text when not loading
                )}
              </TouchableOpacity>
              {/* Button End */}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
