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

  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const [adress, setAdress] = useState('');
  const [neckType, setNeckType] = useState('');
  const [pocketType, setPocketType] = useState('');
  const [damanType, setDamanType] = useState('');
  const [wristType, setWristType] = useState('');
  const [comment, setComment] = useState('');
  const [singleKanta, setSingleKanta] = useState(false);
  const [doubleKanta, setDoubleKanta] = useState(false);
  const [tobStitch, setTobStitch] = useState(false);
  const [embroideryFull, setEmbroideryFull] = useState(false);
  const [embroideryNormal, setEmbroideryNormal] = useState(false);
  const [sample, setSample] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.images], // You can specify other types as needed
      });

      const uris = result.map(file => file.uri);
      setSample([...sample, ...uris]);
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
  const nameRef = useRef();
  const cellRef = useRef();
  const adressRef = useRef();

  const ValidInput = () => {
    const namePattern = /^[a-zA-Z\s]*$/;
    const cellPattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const adressPattern = /^[\w\s,'-]*$/;

    return (
      namePattern.test(name) &&
      cellPattern.test(cell) &&
      adressPattern.test(adress)
    );
  };

  const validateName = () => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!name.match(regex)) {
      return 'Special Characters Not Allowed';
    }
    return '';
  };
  const nameError = validateName();

  const handleCellChange = value => {
    setCell(value);
  };
  const validateCell = () => {
    if (!cell) {
      return '';
    }
    const cellRegex = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    if (!cellRegex.test(cell)) {
      return 'Invalid Cell Format';
    }
    return '';
  };
  const cellError = validateCell();

  const handleAdressChange = value => {
    setAdress(value);
  };
  const validateAdress = () => {
    if (!adress) {
      return '';
    }
    const adressRegex = /^[\w\s,'-]*$/;
    if (!adressRegex.test(adress)) {
      return 'Invalid Address Format';
    }
    return '';
  };
  const adressError = validateAdress();

  const handleCheckOut = () => {
    if (!name) {
      alert('Fullname field is empty');
      nameRef.current.focus();
      return;
    }
    if (!cell) {
      alert('Cell field is empty');
      cellRef.current.focus();
      return;
    }
    if (!adress) {
      alert('Address field is empty');
      adressRef.current.focus();
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
        name,
        cell,
        adress,
        neckType,
        pocketType,
        damanType,
        wristType,
        comment,
        singleKanta,
        doubleKanta,
        tobStitch,
        embroideryFull,
        embroideryNormal,
        price,
        sample,
      });

      setName('');
      setCell('');
      setAdress('');
      setNeckType('');
      setPocketType('');
      setDamanType('');
      setWristType('');
      setComment('');
      setSingleKanta('');
      setDoubleKanta('');
      setTobStitch('');
      setEmbroideryFull('');
      setEmbroideryNormal('');
      setSample('');
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
              value={name}
              onChangeText={setName}
              ref={nameRef}
            />
          </View>
          {nameError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {nameError}
            </Text>
          ) : null}

          {/* Mobile */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Mobile"
              keyboardType="number-pad"
              placeholderTextColor={'gray'}
              value={cell}
              onChangeText={handleCellChange}
              ref={cellRef}
            />
          </View>
          {cellError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {cellError}
            </Text>
          ) : null}

          {/* Address */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-black left-3"
              placeholder="Complete Address"
              placeholderTextColor={'gray'}
              value={adress}
              onChangeText={handleAdressChange}
              ref={adressRef}
            />
          </View>
          {adressError ? (
            <Text className="text-red-600 text-sm left-3 font-semibold">
              {adressError}
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
              value={comment}
              onChangeText={setComment}
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
                <Text className="text-sm font-medium top-2">(Rs.100)</Text>
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
                <Text className="text-sm font-medium top-2">
                  Tob Double Stitch
                </Text>
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
                <Text className="text-sm font-medium top-2">
                  Embroidery Full
                </Text>
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
                  <Text className="text-sm font-medium top-2">
                    Embroidery Normal
                  </Text>
                  <Text className="text-sm font-medium top-2">Rs.300</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Attachments */}
          <View className="flex-1 flex-row p-5">
            {sample && sample.length > 0 ? (
              sample.map(uri => (
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
