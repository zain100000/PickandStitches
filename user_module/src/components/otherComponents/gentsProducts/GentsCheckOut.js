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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import CustomModal from '../../utils/Modals/CustomModal';

const {width, height} = Dimensions.get('window');

const GentsCheckOut = () => {
  const route = useRoute();
  const product_pic = route.params?.product_pic || 'No Product Image';
  const product = route.params?.product || 'No Product Name';
  const price = parseFloat(route.params?.price);
  const name = route.params?.name || 'No Name';
  const cell = route.params?.cell || ' No Cell';
  const address = route.params?.address || 'No Address';
  const neck = route.params?.neck || 'Not selected';
  const pocket = route.params?.pocket || 'Not Selected';
  const daman = route.params?.daman || 'Not Selected';
  const wrist = route.params?.wrist || 'Not Selected';
  const comments = route.params?.comments || 'No Comments';
  const puncha = route.params?.puncha || false;
  const top_double_stitch = route.params?.Top_double_stitch || false;
  const embroidery = route.params?.Embroidery || false;
  const availTime = route.params?.availTime || 'Not Selected';
  const sample = route.params?.sample || 'No Samples Attached';
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  const basePrice = price;
  const singleKanta = 100;
  const doubleKanta = 200;
  const top_stitch = 300;
  const embroideryFull = 500;
  const embroideryNormal = 300;
  const deliverycharges = 300;

  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (puncha === 'Single Kanta') {
      totalPrice += singleKanta;
    } else if (puncha === 'Double Kanta') {
      totalPrice += doubleKanta;
    }

    if (top_double_stitch) {
      totalPrice += top_stitch;
    }

    if (embroidery === 'Embroidery Full') {
      totalPrice += embroideryFull;
    } else if (embroidery === 'Embroidery Normal') {
      totalPrice += embroideryNormal;
    }

    totalPrice += deliverycharges;

    return totalPrice;
  };

  const total = calculateTotalPrice();

  const formatPriceAsCurrency = amount => {
    return new Intl.NumberFormat('en-PKR', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
  };

  const orderDetails = [
    {label: 'Product Name', value: product},
    {label: 'Name', value: name},
    {label: 'Mobile', value: cell},
    {label: 'Address', value: address},
    {label: 'Neck Type', value: neck || 'Not selected'},
    {label: 'Pocket Type', value: pocket || 'Not selected'},
    {label: 'Daman Type', value: daman || 'Not selected'},
    {label: 'Wrist Type', value: wrist || 'Not selected'},
    {label: 'Comment', value: comments || 'No Additional Comment'},
    {label: 'Pickup Timing', value: availTime},

    {label: 'Product Base Price', value: formatPriceAsCurrency(price)},
    {
      label: 'Leg Opening(Puncha)',
      value: `${puncha || 'Not selected'} (Rs.${
        puncha === 'Single Kanta'
          ? singleKanta
          : puncha === 'Double Kanta'
          ? doubleKanta
          : 0
      })`,
    },

    {
      label: 'Top Stitch',
      value: `${top_double_stitch ? 'Top Double Stitch' : 'Not selected'} (Rs.${
        top_double_stitch ? 300 : 0
      })`,
    },

    {
      label: 'Embroidery',
      value: `${embroidery || 'Not selected'} (Rs.${
        embroidery === 'Embroidery Full'
          ? 500
          : embroidery === 'Embroidery Normal'
          ? 300
          : 0
      })`,
    },

    {label: 'Delivery Charges', value: formatPriceAsCurrency(deliverycharges)},
  ];

  const handleSubmitOrder = async () => {
    setLoading(true);

    try {
      let sampleImageName = `sample_${Date.now()}.jpg`;
      const reference = storage().ref(
        `gents_orders/samples/${sampleImageName}`,
      );

      await reference.putFile(sample);
      const sampleUrl = await reference.getDownloadURL();

      const orderData = {
        product_pic,
        product,
        name,
        cell,
        address,
        neck,
        pocket,
        daman,
        wrist,
        comments,
        price,
        puncha,
        Top_double_stitch: top_double_stitch ? 'Top Double Stitch' : null,
        Embroidery: embroidery ? embroidery : null,
        availTime,
        sample: sampleUrl,
        createdAt: Date.now(),
      };

      const response = await firestore()
        .collection('gents_orders')
        .add(orderData);

      if (response) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('Main');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting order: ', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
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
        <FlatList
          data={orderDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text
                style={[
                  styles.itemLabel,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}>
                {item.label}
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
                ]}>
                {item.value}
              </Text>
            </View>
          )}
        />

        <Text
          style={[
            styles.totalText,
            {color: colorScheme === 'dark' ? COLORS.white : COLORS.dark},
          ]}>
          Total Price: {formatPriceAsCurrency(total)}
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.submitBtn]}
            onPress={handleSubmitOrder}>
            <Text style={styles.submitText}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} size={25} />
              ) : (
                'Submit Order'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomModal
        visible={showSuccessModal}
        title="Success!"
        description="Your order has been submit successfully."
        animationSource={require('../../../assets/animations/success.json')}
        onClose={() => setShowSuccessModal(false)}
      />

      <CustomModal
        visible={showErrorModal}
        title="Failure!"
        description="Error occured during order submition."
        animationSource={require('../../../assets/animations/failure.json')}
        onClose={() => setShowErrorModal(false)}
      />
    </SafeAreaView>
  );
};

export default GentsCheckOut;

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

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.03,
    borderBottomWidth: height * 0.003,
    borderBottomColor: COLORS.gray,
  },

  itemLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: width * 0.04,
  },

  itemValue: {
    fontFamily: FONTS.semiBold,
    fontSize: width * 0.04,
  },

  totalText: {
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    fontSize: width * 0.05,
    marginVertical: height * 0.04,
  },

  sampleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },

  sampleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
  },

  sampleText: {
    fontFamily: FONTS.semiBold,
    fontSize: width * 0.04,
  },

  btnContainer: {
    width: '100%',
    marginBottom: height * 0.02,
    padding: height * 0.024,
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
});
