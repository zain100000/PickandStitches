import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../../Config';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Check if the entered credentials are the default admin credentials
      if (email === 'superadmin@gmail.com' && password === '54321') {
        // Navigate to Dashboard for the default admin
        navigation.navigate('DashBoard');
        return;
      }

      const authCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1 items-center mt-[80px]">
          <Text className="text-black text-3xl mb-5">Login</Text>
        </View>

        <View style={styles.container}>
          {/* Form Start */}

          <View className="flex-1 mt-20 w-full px-3">
            <View className="flex-row mb-5 rounded-md shadow-sm shadow-black p-2">
              <View className="mt-3 ml-3">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={25}
                  color={'#000'}
                />
              </View>
              <TextInput
                className="text-base px-5 text-black"
                placeholder="Enter Email"
                placeholderTextColor={'#000'}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="flex-row mb-5 rounded-md shadow-sm shadow-black p-2">
              <View className="mt-3 ml-3">
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={25}
                  color={'#000'}
                />
              </View>
              <TextInput
                className="text-base px-5 text-black"
                placeholder="Enter Password"
                placeholderTextColor={'#000'}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Button Start */}

            <TouchableOpacity
              className="flex-1 justify-center items-center p-4 rounded-lg mt-10"
              style={[{backgroundColor: '#00bcd4'}]}
              onPress={handleLogin}>
              <Text className="text-white text-xl">Login</Text>
            </TouchableOpacity>

            {/* Button End */}
          </View>

          {/* Form End */}
        </View>

        <View className="flex-1 items-center mt-[50px]">
          <Text className="text-black text-xl mb-5 text-center">
            This Login Screen is Only For Admin Please Proceed to the Home Page
            By Cliking the Button Below
          </Text>
        </View>

        <TouchableOpacity
          className="flex-1 justify-center items-center w-[200px] p-2 rounded-md ml-[100px]"
          style={[{backgroundColor: '#539165'}]}
          onPress={() => navigation.navigate('UserHome')}>
          <Text className="text-white text-lg text-center">
            Proceed To Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
