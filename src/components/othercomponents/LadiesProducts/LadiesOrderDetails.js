import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';

const LadiesOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const imgSrc = route.params?.imgSrc;
  const title = route.params?.title;
  const price = route.params?.price;

  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [pikoFull, setPikoFull] = useState(false);
  const [pikoHalf, setPikoHalf] = useState(false);
  const [dupataPiping, setDupataPiping] = useState(false);
  const [dupataExtension, setDupataExtension] = useState(false);
  const [dupataFetta, setDupataFetta] = useState(false);
  const [fullTopPiping, setFullTopPiping] = useState(false);
  const [fullTopExtension, setFullTopExtension] = useState(false);
  const [fullTopFetta, setFullTopFetta] = useState(false);
  const [embroideryGala, setEmbroideryGala] = useState(false);
  const [embroideryDaman, setEmbroideryDaman] = useState(false);
  const [embroideryBazu, setEmbroideryBazu] = useState(false);
  const [embroideryBottom, setEmbroideryBottom] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.images], // You can specify other types as needed
      });

      const uris = result.map(file => file.uri);
      setAttachment([...attachment, ...uris]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Handle cancel
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  };

  // Declare and initialize refs
  const fullnameRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();

  const ValidInput = () => {
    const fullNamePattern = /^[a-zA-Z\s]*$/;
    const mobilePattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const addressPattern = /^[\w\s,'-]*$/;

    return (
      fullNamePattern.test(fullname) &&
      mobilePattern.test(mobile) &&
      addressPattern.test(address)
    );
  };

  const validateFullName = () => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!fullname.match(regex)) {
      return 'Special Characters Not Allowed';
    }
    return '';
  };
  const fullnameError = validateFullName();

  const handleMobileChange = value => {
    setMobile(value);
  };
  const validateMobile = () => {
    if (!mobile) {
      return '';
    }
    const mobileRegex = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    if (!mobileRegex.test(mobile)) {
      return 'Invalid Mobile Format';
    }
    return '';
  };
  const mobileError = validateMobile();

  const handleAddressChange = value => {
    setAddress(value);
  };
  const validateAddress = () => {
    if (!address) {
      return '';
    }
    const addressRegex = /^[\w\s,'-]*$/;
    if (!addressRegex.test(address)) {
      return 'Invalid Address Format';
    }
    return '';
  };
  const addressError = validateAddress();

  const handleCheckOut = () => {
    if (!fullname) {
      alert('Fullname field is empty');
      fullnameRef.current.focus();
      return;
    }
    if (!mobile) {
      alert('Mobile field is empty');
      mobileRef.current.focus();
      return;
    }
    if (!address) {
      alert('Address field is empty');
      addressRef.current.focus();
      return;
    }

    if (!ValidInput()) {
      alert('Please fill in the fields correctly');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('LadiesCheckOut', {
        title,
        fullname,
        mobile,
        address,
        message,
        pikoFull,
        pikoHalf,
        dupataPiping,
        dupataExtension,
        dupataFetta,
        fullTopPiping,
        fullTopExtension,
        fullTopFetta,
        embroideryGala,
        embroideryDaman,
        embroideryBazu,
        embroideryBottom,
        price,
        attachment,
      });

      setFullName('');
      setMobile('');
      setAddress('');
      setMessage('');
      setPikoFull('');
      setPikoHalf('');
      setDupataPiping('');
      setDupataExtension('');
      setDupataFetta('');
      setFullTopPiping('');
      setFullTopExtension('');
      setFullTopFetta('');
      setEmbroideryGala('');
      setEmbroideryDaman('');
      setEmbroideryBazu('');
      setEmbroideryBazu('');
      setAttachment('');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}>
        {/* Image Start */}
        <Image source={imgSrc} className="w-36 h-56 bg-contain" />

        {/* Check-Out Form */}
        <View className="flex-1 mt-14">
          {/* Title */}
          <View>
            <Text className="text-[16px] mb-2">Product Name:-</Text>
            <View className="border-2 border-gray-500 mb-3">
              <TextInput
                className="text-sm text-black left-2"
                placeholder={title}
                placeholderTextColor={'#539165'}
              />
            </View>
          </View>
          {/* FullName */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Ful Name"
              placeholderTextColor={'#539165'}
              value={fullname}
              onChangeText={setFullName}
              ref={fullnameRef}
            />
          </View>
          {fullnameError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {fullnameError}
            </Text>
          ) : null}

          {/* Mobile */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Mobile"
              keyboardType="number-pad"
              placeholderTextColor={'#539165'}
              value={mobile}
              onChangeText={handleMobileChange}
              ref={mobileRef}
            />
          </View>
          {mobileError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {mobileError}
            </Text>
          ) : null}

          {/* Address */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Complete Address "
              placeholderTextColor={'#539165'}
              value={address}
              onChangeText={handleAddressChange}
              ref={addressRef}
            />
          </View>
          {addressError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {addressError}
            </Text>
          ) : null}

          {/* Comment */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Describe Anything Further In Your Mind"
              placeholderTextColor="#539165"
              multiline={true}
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
            />
          </View>

          {/* Piko */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">Piko</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={pikoFull}
                  onValueChange={setPikoFull}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Piko Full
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.120)
                </Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-2">
                  <CheckBox
                    value={pikoHalf}
                    onValueChange={setPikoHalf}
                    tintColors={{true: 'blue', false: 'green'}}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium top-1 text-primary">
                    Piko Half
                  </Text>
                  <Text className="text-sm font-medium top-1 text-primary">
                    (Rs.60)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Dupatta */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">Dupatta</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={dupataPiping}
                  onValueChange={setDupataPiping}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Dupatta Piping
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.300)
                </Text>
              </View>
            </View>

            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={dupataExtension}
                  onValueChange={setDupataExtension}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Dupatta Extension
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.300)
                </Text>
              </View>
            </View>

            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={dupataFetta}
                  onValueChange={setDupataFetta}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Dupatta Fetta
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.300)
                </Text>
              </View>
            </View>
          </View>

          {/* Top */}
          <View className="mt-5 mb-5 left-3">
            <Text className="text-sm text-dark font-medium">Top</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={fullTopPiping}
                  onValueChange={setFullTopPiping}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Full Top Piping
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.300)
                </Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-3">
                  <CheckBox
                    value={fullTopExtension}
                    onValueChange={setFullTopExtension}
                    tintColors={{true: 'blue', false: 'green'}}
                  />
                </View>
                <View className="right-2">
                  <Text className="text-sm font-medium top-1 text-primary">
                    Full Top Extension
                  </Text>
                  <Text className="text-sm font-medium top-1 text-primary">
                    (Rs.300)
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row mt-5">
              <View className="top-2 right-2">
                <CheckBox
                  value={fullTopFetta}
                  onValueChange={setFullTopFetta}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-1 text-primary">
                  Full Top Fetta
                </Text>
                <Text className="text-sm font-medium top-1 text-primary">
                  (Rs.300)
                </Text>
              </View>
            </View>
          </View>

          {/* Embroidery */}
          <View className="flex-1 mt-5 mb-5 left-3">
            <Text className="text-sm text-dark font-medium">Embroidery</Text>

            <View className="flex-1 right-5">
              <View className="flex-row justify-around mt-8">
                <View className="flex-row">
                  <View className="top-2 right-2">
                    <CheckBox
                      value={embroideryGala}
                      onValueChange={setEmbroideryGala}
                      tintColors={{true: 'blue', false: 'green'}}
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium top-1 text-primary">
                      Gala
                    </Text>
                    <Text className="text-sm font-medium top-1 text-primary">
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row">
                  <View className="top-2 right-2">
                    <CheckBox
                      value={embroideryDaman}
                      onValueChange={setEmbroideryDaman}
                      tintColors={{true: 'blue', false: 'green'}}
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium top-1 text-primary">
                      Daman
                    </Text>
                    <Text className="text-sm font-medium top-1 text-primary">
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-around mt-8">
                <View className="flex-row">
                  <View className="top-2 right-2">
                    <CheckBox
                      value={embroideryBazu}
                      onValueChange={setEmbroideryBazu}
                      tintColors={{true: 'blue', false: 'green'}}
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium top-1 text-primary">
                      Bazu
                    </Text>
                    <Text className="text-sm font-medium top-1 text-primary">
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row">
                  <View className="top-2 right-2">
                    <CheckBox
                      value={embroideryBottom}
                      onValueChange={setEmbroideryBottom}
                      tintColors={{true: 'blue', false: 'green'}}
                    />
                  </View>
                  <View>
                    <Text className="text-sm font-medium top-1 text-primary">
                      Bottom
                    </Text>
                    <Text className="text-sm font-medium top-1 text-primary">
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Attachments */}
          <View className="flex-1 flex-row p-5">
            {attachment && attachment.length > 0 ? (
              attachment.map(uri => (
                <Image
                  key={uri}
                  source={{uri}}
                  className="w-32 h-32 right-3 mr-3"
                />
              ))
            ) : (
              <Text className="text-gray-400 font-medium text-sm">
                Any Sample (Upto 3 Samples)
              </Text>
            )}
          </View>

          {/* Attchment Button */}
          <View className="flex-row left-2 mb-5">
            <TouchableOpacity
              onPress={handlePickDocument}
              className="pl-5 pr-5 pt-4 pb-4 rounded-md bg-primary">
              <Text className="text-white font-bold text-[16px]">
                Choose File
              </Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="flex-1 justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl"
            onPress={handleCheckOut}>
            {loading ? (
              <ActivityIndicator color={'#fff'} /> // Show loader while loading
            ) : (
              <Text className="text-white text-xl">Proceed To CheckOut</Text> // Show Submit text when not loading
            )}
          </TouchableOpacity>
        </View>

        {/* Check-Out Form */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LadiesOrderDetails;
