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
  const product_pic = route.params?.product_pic;
  const product = route.params?.product;
  const price = route.params?.price;

  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const [adress, setAdress] = useState('');
  const [neck, setNeck] = useState('');
  const [Pocket, setPocket] = useState('');
  const [Daman, setDaman] = useState('');
  const [wrist, setWrist] = useState('');
  const [comments, setComments] = useState('');
  const [puncha, setPuncha] = useState([]);
  const [singleKanta, setSingleKanta] = useState(false);
  const [doubleKanta, setDoubleKanta] = useState(false);
  const [Tob_double_stitch, setTobDoubleStitch] = useState(false);
  const [Embroidery, setEmbroidery] = useState([]);
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

    // puncha
    const selectedPuncha = [];

    if (singleKanta) {
      selectedPuncha.push('Single Kanta');
    }

    if (doubleKanta) {
      selectedPuncha.push('Double Kanta');
    }

    // Set the puncha state with the selected values
    setPuncha(selectedPuncha);

    // Embroidery
    const selectedEmbroidery = [];

    if (embroideryFull) {
      selectedEmbroidery.push('EmbroideryFull');
    }

    if (embroideryNormal) {
      selectedEmbroidery.push('EmbroideryNormal');
    }

    // Set the puncha state with the selected values
    setEmbroidery(selectedEmbroidery);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('GentsCheckOut', {
        product_pic,
        product,
        name,
        cell,
        adress,
        neck,
        Pocket,
        Daman,
        wrist,
        comments,
        puncha,
        Tob_double_stitch,
        Embroidery,
        price,
        sample,
      });

      setName('');
      setCell('');
      setAdress('');
      setNeck('');
      setPocket('');
      setDaman('');
      setWrist('');
      setComments('');
      setPuncha('');
      setTobDoubleStitch('');
      setEmbroidery('');
      setSample('');
    }, 2000);
  };

  const updatePuncha = (checked, option) => {
    if (checked) {
      // If the checkbox is checked, add the option to the puncha state
      setPuncha(prevPuncha => [...prevPuncha, option]);
    } else {
      // If the checkbox is unchecked, remove the option from the puncha state
      setPuncha(prevPuncha => prevPuncha.filter(item => item !== option));
    }
  };

  const updateEmbroidery = (checked, option) => {
    if (checked) {
      // If the checkbox is checked, add the option to the puncha state
      setEmbroidery(prevEmbroidery => [...prevEmbroidery, option]);
    } else {
      // If the checkbox is unchecked, remove the option from the puncha state
      setEmbroidery(prevEmbroidery =>
        prevEmbroidery.filter(item => item !== option),
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}>
        {/* Image Start */}
        <Image source={product_pic} className="w-36 h-56 bg-contain" />

        {/* Check-Out Form */}
        <View className="flex-1 mt-14">
          {/* Title */}
          <View>
            <Text className="text-sm mb-2">Product Name:-</Text>
            <View className="border-2 border-gray-500 mb-3">
              <TextInput
                className="text-sm text-black left-2 "
                placeholder={product}
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
              placeholderTextColor={'#539165'}
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
              placeholderTextColor={'#539165'}
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
              selectedValue={neck}
              onValueChange={setNeck}
              style={{color: '#539165'}}>
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
              selectedValue={Pocket}
              onValueChange={setPocket}
              style={{color: '#539165'}}>
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
              selectedValue={Daman}
              onValueChange={setDaman}
              style={{color: '#539165'}}>
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
              selectedValue={wrist}
              onValueChange={setWrist}
              style={{color: '#539165'}}>
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
              value={comments}
              onChangeText={setComments}
            />
          </View>

          {/* Leg Opening */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">
              Leg opening (Puncha)
            </Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={singleKanta}
                  onValueChange={newValue => {
                    setSingleKanta(newValue);
                    updatePuncha(newValue, 'Single Kanta');
                  }}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-2 text-primary">
                  Single Kanta
                </Text>
                <Text className="text-sm font-medium top-2 text-primary">
                  (Rs.100)
                </Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-2">
                  <CheckBox
                    value={doubleKanta}
                    onValueChange={newValue => {
                      setDoubleKanta(newValue);
                      updatePuncha(newValue, 'Double Kanta');
                    }}
                    tintColors={{true: 'blue', false: 'green'}}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium top-2 text-primary">
                    Double Kanta
                  </Text>
                  <Text className="text-sm font-medium top-2 text-primary">
                    (Rs.200)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tob Stitch */}
          <View className="mb-5 mt-5 left-3">
            <Text className="text-sm text-dark font-medium">Tob Stitch</Text>
            <View className="flex-row mt-3">
              <View className="top-2 right-2">
                <CheckBox
                  value={Tob_double_stitch}
                  onValueChange={setTobDoubleStitch}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-2 text-primary">
                  Tob Double Stitch
                </Text>
                <Text className="text-sm font-medium top-2 text-primary">
                  (Rs.200)
                </Text>
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
                  onValueChange={newValue => {
                    setEmbroideryFull(newValue);
                    updateEmbroidery(newValue, 'EmbroideryFull');
                  }}
                  tintColors={{true: 'blue', false: 'green'}}
                />
              </View>
              <View>
                <Text className="text-sm font-medium top-2 text-primary">
                  Embroidery Full
                </Text>
                <Text className="text-sm font-medium top-2 text-primary">
                  Rs.500
                </Text>
              </View>

              <View className="flex-row left-10">
                <View className="top-2 right-2">
                  <CheckBox
                    value={embroideryNormal}
                    onValueChange={newValue => {
                      setEmbroideryNormal(newValue);
                      updateEmbroidery(newValue, 'EmbroideryNormal');
                    }}
                    tintColors={{true: 'blue', false: 'green'}}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium top-2 text-primary">
                    Embroidery Normal
                  </Text>
                  <Text className="text-sm font-medium top-2 text-primary">
                    Rs.300
                  </Text>
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
