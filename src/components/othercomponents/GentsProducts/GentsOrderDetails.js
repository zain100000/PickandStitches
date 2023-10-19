import React, {useState, useRef} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';

const GentsOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const imgSrc = route.params?.imgSrc;
  const title = route.params?.title;
  const price = route.params?.price;

  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [neckType, setNeckType] = useState('');
  const [pocketType, setPocketType] = useState('');
  const [damanType, setDamanType] = useState('');
  const [wristType, setWristType] = useState('');
  const [message, setMessage] = useState('');
  const [singleKanta, setSingleKanta] = useState(false);
  const [doubleKanta, setDoubleKanta] = useState(false);
  const [tobStitch, setTobStitch] = useState(false);
  const [embroideryFull, setEmbroideryFull] = useState(false);
  const [embroideryNormal, setEmbroideryNormal] = useState(false);
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
      navigation.navigate('GentsCheckOut', {
        imgSrc,
        title,
        fullname,
        mobile,
        address,
        neckType,
        pocketType,
        damanType,
        wristType,
        message,
        singleKanta,
        doubleKanta,
        tobStitch,
        embroideryFull,
        embroideryNormal,
        price,
        attachment,
      });

      setFullName('');
      setMobile('');
      setAddress('');
      setNeckType('');
      setPocketType('');
      setDamanType('');
      setWristType('');
      setMessage('');
      setSingleKanta('');
      setDoubleKanta('');
      setTobStitch('');
      setEmbroideryFull('');
      setEmbroideryNormal('');
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
            <Text className="text-sm mb-2">Product Name:-</Text>
            <View className="border-2 border-gray-500 mb-3">
              <TextInput
                className="text-sm text-black left-2 "
                placeholder={title}
                placeholderTextColor={'gray'}
              />
            </View>
          </View>
          {/* FullName */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Ful Name"
              placeholderTextColor={'gray'}
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
              placeholderTextColor={'gray'}
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
              placeholder="Complete Address"
              placeholderTextColor={'gray'}
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

          {/* Neck */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={neckType}
              onValueChange={setNeckType}
              style={{color: 'gray'}}>
              <Picker.Item
                label="Select Neck Type"
                value=""
                style={{color: 'black', fontSize: 15}}
              />
              <Picker.Item label="Collar" value="Collar" />
              <Picker.Item label="Ban" value="Ban" />
              <Picker.Item label="Ban Round Cut" value="Ban Round Cut" />
            </Picker>
          </View>

          {/* Pocket */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={pocketType}
              onValueChange={setPocketType}
              style={{color: 'gray'}}>
              <Picker.Item
                label="Select Pocket Type"
                value=""
                style={{color: 'black', fontSize: 15}}
              />
              <Picker.Item label="Front Single" value="Front Single" />
              <Picker.Item label="Front Double" value="Front Double" />
              <Picker.Item label="Side Single" value="Side Single" />
              <Picker.Item label="Side Double" value="Side Double" />
              <Picker.Item
                label="Front Single, Side Single"
                value="Front Single, Side Single"
              />
              <Picker.Item
                label="Front Double, Side Double"
                value="Front Double, Side Double"
              />
              <Picker.Item
                label="Front Single, Side Double"
                value="Front Single, Side Double"
              />
              <Picker.Item
                label="Front Double, Side Single"
                value="Front Double, Side Single"
              />
            </Picker>
          </View>

          {/* Daman */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={damanType}
              onValueChange={setDamanType}
              style={{color: 'gray'}}>
              <Picker.Item
                label="Select Daman Type"
                value=""
                style={{color: 'black', fontSize: 15}}
              />
              <Picker.Item label="Round" value="Round" />
              <Picker.Item label="Straight" value="Straight" />
            </Picker>
          </View>

          {/* Wrist */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={wristType}
              onValueChange={setWristType}
              style={{color: 'gray'}}>
              <Picker.Item
                label="Select Wrist Type"
                value=""
                style={{color: 'black', fontSize: 15}}
              />
              <Picker.Item label="Open" value="Open" />
              <Picker.Item label="Cuff" value="Cuff" />
            </Picker>
          </View>

          {/* Comment */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-black left-3 text-sm"
              placeholder="Describe Anything Further In Your Mind"
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
            />
          </View>

          {/* Leg Opening */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">
              Leg opening (Puncha)
            </Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox value={singleKanta} onValueChange={setSingleKanta} />
              </View>
              <View>
                <Text className="text-sm font-medium top-2">Single Kanta</Text>
                <Text className="text-sm font-medium top-2">(100Rs)</Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-2">
                  <CheckBox
                    value={doubleKanta}
                    onValueChange={setDoubleKanta}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium top-2">
                    Double Kanta
                  </Text>
                  <Text className="text-sm font-medium top-2">(Rs.200)</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tob Stitch */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">Tob Stitch</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox value={tobStitch} onValueChange={setTobStitch} />
              </View>
              <View>
                <Text className="text-sm font-medium top-2">Double Kanta</Text>
                <Text className="text-sm font-medium top-2">(Rs.200)</Text>
              </View>
            </View>
          </View>

          {/* Embroidery */}
          <View className="mt-5 mb-5 left-3">
            <Text className="text-sm text-dark font-medium">Embroidery</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={embroideryFull}
                  onValueChange={setEmbroideryFull}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-2">Full</Text>
                <Text className="text-sm font-medium top-2">Rs.500</Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-2">
                  <CheckBox
                    value={embroideryNormal}
                    onValueChange={setEmbroideryNormal}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium top-2">Normal</Text>
                  <Text className="text-sm font-medium top-2">Rs.300</Text>
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

export default GentsOrderDetails;
