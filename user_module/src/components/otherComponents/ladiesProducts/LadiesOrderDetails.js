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
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');

const LadiesOrderDetails = () => {
  const route = useRoute();
  const product_pic = route.params?.product_pic;
  const product = route.params?.product;
  const price = route.params?.price;

  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState('');
  const [pikoFull, setPikoFull] = useState(false);
  const [pikoHalf, setPikoHalf] = useState(false);
  const [dupattaPiping, setDupattaPiping] = useState(false);
  const [dupattaExtension, setDupattaExtension] = useState(false);
  const [dupattaFetta, setDupattaFetta] = useState(false);
  const [fullTopPiping, setFullTopPiping] = useState(false);
  const [fullTopExtension, setFullTopExtension] = useState(false);
  const [fullTopFetta, setFullTopFetta] = useState(false);
  const [embroideryGalla, setEmbroideryGalla] = useState(false);
  const [embroideryDaman, setEmbroideryDaman] = useState(false);
  const [embroideryBazo, setEmbroideryBazo] = useState(false);
  const [embroideryBottom, setEmbroideryBottom] = useState(false);
  const [availTime, setAvailTime] = useState('');
  const [sample, setSample] = useState('');
  const [sampleUri, setSampleUri] = useState('');

  const [nameError, setNameError] = useState('');
  const [cellError, setCellError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  const isValidInput = () => {
    const namePattern = /^[a-zA-Z\s]*$/;
    const cellPattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const addressPattern = /^House#\d+\sStreet#\d+\s[A-Za-z\s]+\s[A-Za-z\s]+$/;
    const isNameValid = namePattern.test(name);
    const isCellValid = cellPattern.test(cell);
    const isAddressValid = addressPattern.test(address);

    return isNameValid && isCellValid && isAddressValid;
  };

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

  const handleCellChange = value => {
    setCell(value);
    if (value === '') {
      setCellError('Cell is required');
    } else if (!/^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/.test(value)) {
      setCellError('Invalid Cell Format');
    } else {
      setCellError('');
    }
  };

  const handleAddressChange = value => {
    setAddress(value);
    if (value === '') {
      setAddressError('Address is required');
    } else if (
      !/^House#\d+\sStreet#\d+\s[A-Za-z\s]+\s[A-Za-z\s]+$/.test(value)
    ) {
      setAddressError('Address must follow format');
    } else {
      setAddressError('');
    }
  };

  useEffect(() => {
    setIsButtonEnabled(isValidInput());
  }, [
    name,
    cell,
    address,
    comments,
    pikoFull,
    pikoHalf,
    dupattaPiping,
    dupattaFetta,
    dupattaExtension,
    fullTopPiping,
    fullTopFetta,
    fullTopExtension,
    embroideryGalla,
    embroideryDaman,
    embroideryBazo,
    embroideryBottom,
    availTime,
    sample,
  ]);

  const handlePickDocument = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
      });

      console.log('Selected image:', image);

      const pickedSampleUri = image.path;
      const pickedSampleName = image.filename || image.path.split('/').pop();

      setSampleUri(pickedSampleUri);
      setSample(trimSampleName(pickedSampleName));
    } catch (err) {
      if (err.code === 'E_PICKER_CANCELLED') {
        console.log('User canceled the picker');
      } else {
        console.error(err);
        alert('Error picking sample image', 'Please try again.');
      }
    }
  };

  const trimSampleName = name => {
    if (name.length > 20) {
      return `${name.substring(0, 17)}...`;
    }
    return name;
  };

  const renderPikoOption = (label, price, isSelected, onPress) => (
    <View style={styles.optionRow}>
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text
          style={[
            styles.optionText,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            styles.optionPrice,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {`(Rs.${price})`}
        </Text>
      </View>
    </View>
  );

  const renderDupattaOption = (label, price, isSelected, onPress) => (
    <View style={styles.optionRow}>
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text
          style={[
            styles.optionText,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            styles.optionPrice,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {`(Rs.${price})`}
        </Text>
      </View>
    </View>
  );

  const renderFullTopOption = (label, price, isSelected, onPress) => (
    <View style={styles.optionRow}>
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text
          style={[
            styles.optionText,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            styles.optionPrice,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {`(Rs.${price})`}
        </Text>
      </View>
    </View>
  );

  const renderEmbroideryOption = (label, price, isSelected, onPress) => (
    <View style={styles.optionRow}>
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text
          style={[
            styles.optionText,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            styles.optionPrice,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          {`(Rs.${price})`}
        </Text>
      </View>
    </View>
  );

  const handleCheckOut = () => {
    setLoading(true);

    setTimeout(() => {
      const checkoutData = {
        product_pic,
        product,
        name,
        cell,
        address,
        comments,
        price,
        piko: pikoFull ? 'Piko Full' : pikoHalf ? 'Piko Half' : '',

        dupatta: dupattaPiping
          ? 'Dupatta Piping'
          : dupattaExtension
          ? 'Dupatta Extension'
          : dupattaFetta
          ? 'Dupatta Fetta'
          : '',

        top: fullTopPiping
          ? 'Full Top Piping'
          : fullTopExtension
          ? 'Full Top Extension'
          : fullTopFetta
          ? 'Full Top Fetta'
          : '',

        embroidery: embroideryGalla
          ? 'Embroidery Galla'
          : embroideryDaman
          ? 'Embroidery Daman'
          : embroideryBazo
          ? 'Embroidery Bazo'
          : embroideryBottom
          ? 'Embroidery Bottom'
          : '',

        availTime,
        sample: sampleUri,
      };

      console.log('Checkout Data:', checkoutData);

      setLoading(false);
      navigation.navigate('ladies_checkout', checkoutData);
    }, 2000);
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
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity>
              {product_pic ? (
                <Image source={{uri: product_pic}} style={styles.image} />
              ) : (
                <Text
                  style={[
                    styles.noImageText,
                    {
                      color:
                        colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                    },
                  ]}>
                  No Product Picture!
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputFieldContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Name
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                },
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

          <View style={styles.inputFieldContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Cell
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                },
              ]}
              placeholder="Enter Your Cell"
              placeholderTextColor={
                colorScheme === 'dark' ? COLORS.gray : COLORS.dark
              }
              keyboardType="number-pad"
              value={cell}
              onChangeText={handleCellChange}
            />
            {cellError && cellError ? (
              <Text style={styles.errorText}>{cellError}</Text>
            ) : null}
          </View>

          <View style={styles.inputFieldContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Address
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                },
              ]}
              placeholder="Enter Your Address"
              placeholderTextColor={
                colorScheme === 'dark' ? COLORS.gray : COLORS.dark
              }
              value={address}
              onChangeText={handleAddressChange}
            />
            {addressError && addressError ? (
              <Text style={styles.errorText}>{addressError}</Text>
            ) : null}
          </View>

          <View style={styles.inputFieldContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Comments
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                },
              ]}
              placeholder="Describe anything further in your mind!"
              placeholderTextColor={
                colorScheme === 'dark' ? COLORS.gray : COLORS.dark
              }
              multiline={true}
              numberOfLines={6}
              value={comments}
              onChangeText={setComments}
            />
          </View>

          <View style={styles.extrasContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                  },
                ]}>
                Piko
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {renderPikoOption('Piko Full', 120, pikoFull, () => {
                setPikoFull(!pikoFull);
                setPikoHalf(false);
              })}
              {renderPikoOption('Piko Half', 60, pikoHalf, () => {
                setPikoHalf(!pikoHalf);
                setPikoFull(false);
              })}
            </View>
          </View>

          <View style={styles.extrasContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                  },
                ]}>
                Dupatta Piping
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {renderDupattaOption('Dupatta Piping', 300, dupattaPiping, () => {
                setDupattaPiping(!dupattaPiping);
                setDupattaFetta(false);
                setDupattaExtension(false);
              })}
              {renderDupattaOption('Dupatta Fetta', 300, dupattaFetta, () => {
                setDupattaFetta(!dupattaFetta);
                setDupattaPiping(false);
                setDupattaExtension(false);
              })}
              {renderDupattaOption(
                'Dupatta Extension',
                300,
                dupattaExtension,
                () => {
                  setDupattaExtension(!dupattaExtension);
                  setDupattaPiping(false);
                  setDupattaFetta(false);
                },
              )}
            </View>
          </View>

          <View style={styles.extrasContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                  },
                ]}>
                Top
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {renderFullTopOption(
                'Full Top Piping',
                300,
                fullTopPiping,
                () => {
                  setFullTopPiping(!fullTopPiping);
                  setFullTopFetta(false);
                  setFullTopExtension(false);
                },
              )}
              {renderFullTopOption('Full Top Fetta', 300, fullTopFetta, () => {
                setFullTopFetta(!fullTopFetta);
                setFullTopPiping(false);
                setFullTopExtension(false);
              })}
              {renderFullTopOption(
                'Full Top Extension',
                300,
                fullTopExtension,
                () => {
                  setFullTopExtension(!fullTopExtension);
                  setFullTopPiping(false);
                  setFullTopFetta(false);
                },
              )}
            </View>
          </View>

          <View style={styles.extrasContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                  },
                ]}>
                Embroidery
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {renderEmbroideryOption('Galla', 300, embroideryGalla, () => {
                setEmbroideryGalla(!embroideryGalla);
                setEmbroideryDaman(false);
                setEmbroideryBazo(false);
                setEmbroideryBottom(false);
              })}
              {renderEmbroideryOption('Daman', 300, embroideryDaman, () => {
                setEmbroideryDaman(!embroideryDaman);
                setEmbroideryGalla(false);
                setEmbroideryBazo(false);
                setEmbroideryBottom(false);
              })}
              {renderEmbroideryOption('Bazo', 300, embroideryBazo, () => {
                setEmbroideryBazo(!embroideryBazo);
                setEmbroideryGalla(false);
                setEmbroideryDaman(false);
                setEmbroideryBottom(false);
              })}
              {renderEmbroideryOption('Bottom', 300, embroideryBottom, () => {
                setEmbroideryBottom(!embroideryBottom);
                setEmbroideryGalla(false);
                setEmbroideryDaman(false);
                setEmbroideryBazo(false);
              })}
            </View>
          </View>

          <View style={styles.availTimeContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Available Time
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={availTime}
                style={[
                  styles.picker,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}
                onValueChange={setAvailTime}>
                <Picker.Item
                  label="Select Available Time for Picking"
                  value=""
                />
                <Picker.Item label="1AM TO 3AM" value="1AM TO 3AM" />
                <Picker.Item label="3AM TO 5AM" value="3AM TO 5AM" />
                <Picker.Item label="5AM TO 7AM" value="5AM TO 7AM" />
                <Picker.Item label="7AM TO 9AM" value="7AM TO 9AM" />
                <Picker.Item label="9AM TO 12AM" value="9AM TO 12AM" />
                <Picker.Item label="12AM TO 2PM" value="12AM TO 2PM" />
                <Picker.Item label="2PM TO 4PM" value="2PM TO 4PM" />
                <Picker.Item label="4PM TO 6PM" value="4PM TO 6PM" />
                <Picker.Item label="6PM TO 8PM" value="6PM TO 8PM" />
                <Picker.Item label="8PM TO 10PM" value="8PM TO 10PM" />
                <Picker.Item label="10PM TO 12PM" value="10PM TO 12PM" />
              </Picker>
            </View>
          </View>

          <View style={styles.sampleContainer}>
            <Text
              style={[
                styles.label,
                {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
              ]}>
              Sample
            </Text>
            <TouchableOpacity onPress={handlePickDocument}>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    color: colorScheme === 'dark' ? COLORS.white : COLORS.dark,
                  },
                ]}
                placeholder="Choose Sample File"
                placeholderTextColor={
                  colorScheme === 'dark' ? COLORS.gray : COLORS.dark
                }
                value={sample} // Display only the name
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.checkoutBtn,
                {
                  backgroundColor: isButtonEnabled
                    ? COLORS.primary
                    : COLORS.gray,
                },
              ]}
              disabled={!isButtonEnabled}
              onPress={handleCheckOut}>
              <Text style={styles.checkoutText}>
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size={25} />
                ) : (
                  'Checkout'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LadiesOrderDetails;

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

  formContainer: {
    marginHorizontal: width * 0.05,
    gap: height * 0.05,
  },

  imageContainer: {
    width: width * 0.9,
    height: height * 0.3,
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: height * 0.15,
    borderRadius: 10,
  },

  image: {
    width: width * 0.9,
    height: height * 0.9,
    resizeMode: 'cover',
  },

  label: {
    fontSize: width * 0.045,
    fontFamily: FONTS.regular,
    color: COLORS.dark,
    marginBottom: height * 0.01,
  },

  inputField: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.primary,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.045,
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },

  pickerContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.primary,
    height: height * 0.08,
    width: width * 0.9,
    color: COLORS.dark,
  },

  picker: {
    height: height * 0.06,
    width: width * 0.9,
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },

  extrasContainer: {
    marginVertical: height * 0.001,
    paddingHorizontal: width * 0.02,
  },

  titleContainer: {
    marginBottom: height * 0.02,
  },

  titleText: {
    fontSize: width * 0.045,
    fontFamily: FONTS.semiBold,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: height * 0.009,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxContainer: {
    marginRight: width * 0.02,
  },

  checkbox: {
    height: height * 0.036,
    width: width * 0.065,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmark: {
    color: COLORS.primary,
  },

  optionTextContainer: {
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },

  optionText: {
    fontSize: width * 0.04,
    fontFamily: FONTS.semiBold,
  },

  optionPrice: {
    fontSize: width * 0.04,
    fontFamily: FONTS.semiBold,
  },

  btnContainer: {
    marginBottom: height * 0.02,
    width: '100%',
  },

  checkoutBtn: {
    width: '100%',
    alignItems: 'center',
    padding: height * 0.024,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  checkoutText: {
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
