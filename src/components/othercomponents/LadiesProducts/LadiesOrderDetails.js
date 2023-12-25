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
import DocumentPicker from 'react-native-document-picker';

const LadiesOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product_pic = route.params?.product_pic;
  const product = route.params?.product;
  const price = route.params?.price;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [adress, setAdress] = useState('');
  const [comments, setComments] = useState('');
  const [sample, setSample] = useState([]);
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
  const emailRef = useRef();
  const cellRef = useRef();
  const adressRef = useRef();

  const ValidInput = () => {
    const namePattern = /^[a-zA-Z\s]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cellPattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const adressPattern = /^[\w\s,'-]*$/;

    return (
      namePattern.test(name) &&
      emailPattern.test(email) &&
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

  const validateEmail = () => {
    if (!email) {
      return ''; // Return an empty string if the email is empty
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return 'Invalid Email Format';
    }
    return '';
  };
  const emailError = validateEmail();

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
    if (!email) {
      alert('Email field is empty');
      emailRef.current.focus();
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
      navigation.navigate('LadiesCheckOut', {
        product_pic,
        product,
        name,
        email,
        cell,
        adress,
        comments,
        sample,
        price,
        peko: pikoFull ? 'Piko Full' : pikoHalf ? 'Piko Half' : '',

        Dupata_Piping: dupattaPiping
          ? 'Dupatta Piping'
          : dupattaExtension
          ? 'Dupatta Extension'
          : dupattaFetta
          ? 'Dupatta Fetta'
          : '',

        Full_top_piping: fullTopPiping
          ? 'Full Top Piping'
          : fullTopExtension
          ? 'Full Top Extension'
          : fullTopFetta
          ? 'Full Top Fetta'
          : '',

        Embroidery: embroideryGalla
          ? 'Embroidery Galla'
          : embroideryDaman
          ? 'Embroidery Daman'
          : embroideryBazo
          ? 'Embroidery Bazo'
          : embroideryBottom
          ? 'Embroidery Bottom'
          : '',

        sample,
      });

      setName('');
      setEmail('');
      setCell('');
      setAdress('');
      setComments('');
      setPikoFull('');
      setPikoHalf('');
      setDupattaPiping(false);
      setDupattaExtension(false);
      setDupattaFetta(false);
      setFullTopPiping(false);
      setFullTopExtension(false);
      setFullTopFetta(false);
      setEmbroideryGalla(false);
      setEmbroideryBazo(false);
      setEmbroideryDaman(false);
      setSample('');
    }, 2000);
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
          {/* Product Name */}
          <View>
            <View className="border-2 border-gray-500 mb-3">
              <TextInput
                className="text-sm text-primary left-2"
                placeholder={product}
                placeholderTextColor={'#539165'}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>
          </View>
          {/* FullName */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Ful Name"
              placeholderTextColor={'#539165'}
              value={name}
              onChangeText={setName}
              ref={nameRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {nameError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {nameError}
            </Text>
          ) : null}

          {/* Email */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Email"
              placeholderTextColor={'#539165'}
              value={email}
              onChangeText={setEmail}
              ref={emailRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {emailError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {emailError}
            </Text>
          ) : null}

          {/* Mobile */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Mobile"
              keyboardType="number-pad"
              placeholderTextColor={'#539165'}
              value={cell}
              onChangeText={handleCellChange}
              ref={cellRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {cellError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {cellError}
            </Text>
          ) : null}

          {/* Address */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Complete Address"
              placeholderTextColor={'#539165'}
              value={adress}
              onChangeText={handleAdressChange}
              ref={adressRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {adressError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {adressError}
            </Text>
          ) : null}

          {/* Comment */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-primary left-3 text-sm"
              placeholder="Describe Anything Further In Your Mind"
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={6}
              value={comments}
              onChangeText={setComments}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>

          {/* Piko */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Piko
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => {
                    setPikoFull(!pikoFull);
                    setPikoHalf(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {pikoFull && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Piko Half
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.120)
                  </Text>
                </View>
              </View>

              <View className="flex-row left-5">
                <View className="flex-row mb-3 ml-8">
                  <TouchableOpacity
                    onPress={() => {
                      setPikoHalf(!pikoHalf);
                      setPikoFull(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {pikoHalf && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Piko Half
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.60)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Dupatta */}
          <View className="flex-1">
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Dupatta
              </Text>
            </View>
            <View className="flex-col">
              {/* First and second rows */}
              <View className="flex-row">
                <View className="flex-row mb-3">
                  <TouchableOpacity
                    onPress={() => {
                      setDupattaPiping(!dupattaPiping);
                      setDupattaExtension(false);
                      setDupattaFetta(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {dupattaPiping && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Dupatta Piping
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-3 left-5">
                  <TouchableOpacity
                    onPress={() => {
                      setDupattaExtension(!dupattaExtension);
                      setDupattaPiping(false);
                      setDupattaFetta(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {dupattaExtension && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Dupatta Extension
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Third row (on a new line) */}
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => {
                    setDupattaFetta(!dupattaFetta);
                    setDupattaExtension(false);
                    setDupattaPiping(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {dupattaFetta && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Dupatta Fetta
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.300)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Top */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Top
              </Text>
            </View>
            <View className="flex-col">
              {/* First and second rows */}
              <View className="flex-row">
                <View className="flex-row mb-3">
                  <TouchableOpacity
                    onPress={() => {
                      setFullTopPiping(!fullTopPiping);
                      setFullTopExtension(false);
                      setFullTopFetta(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {fullTopPiping && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Full Top Piping
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-3 left-5">
                  <TouchableOpacity
                    onPress={() => {
                      setFullTopExtension(!fullTopExtension);
                      setFullTopPiping(false);
                      setFullTopFetta(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {fullTopExtension && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Full Top Extension
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Third row (on a new line) */}
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => {
                    setFullTopFetta(!fullTopFetta);
                    setFullTopPiping(false);
                    setFullTopExtension(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {fullTopFetta && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Full Top Fetta
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.300)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Embroidery */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Embroidery
              </Text>
            </View>
            <View className="flex-col">
              {/* First row */}
              <View className="flex-row">
                <View className="flex-row mb-3">
                  <TouchableOpacity
                    onPress={() => {
                      setEmbroideryGalla(!embroideryGalla);
                      setEmbroideryDaman(false);
                      setEmbroideryBazo(false);
                      setEmbroideryBottom(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {embroideryGalla && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Embroidery Galla
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-3 left-5">
                  <TouchableOpacity
                    onPress={() => {
                      setEmbroideryDaman(!embroideryDaman);
                      setEmbroideryGalla(false);
                      setEmbroideryBazo(false);
                      setEmbroideryBottom(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {embroideryDaman && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Embroidery Daman
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Second row (on a new line) */}
              <View className="flex-row">
                <View className="flex-row mb-3">
                  <TouchableOpacity
                    onPress={() => {
                      setEmbroideryBazo(!embroideryBazo);
                      setEmbroideryGalla(false);
                      setEmbroideryDaman(false);
                      setEmbroideryBottom(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {embroideryBazo && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Embroidery Bazu
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-3 left-5">
                  <TouchableOpacity
                    onPress={() => {
                      setEmbroideryBottom(!embroideryBottom);
                      setEmbroideryGalla(false);
                      setEmbroideryDaman(false);
                      setEmbroideryBazo(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {embroideryBottom && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Embroidery Bottom
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
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
              <Text
                className="text-gray-400 text-sm"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Any Sample (Upto 3 Samples)
              </Text>
            )}
          </View>

          {/* Attachment Button */}
          <View className="flex-row left-2 mb-5">
            <TouchableOpacity
              onPress={handlePickDocument}
              className="pl-5 pr-5 pt-4 pb-4 rounded-md bg-primary">
              <Text
                className="text-white text-[16px]"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
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
              <Text
                className="text-white text-xl"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Proceed To CheckOut
              </Text> // Show Submit text when not loading
            )}
          </TouchableOpacity>
        </View>

        {/* Check-Out Form */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LadiesOrderDetails;
