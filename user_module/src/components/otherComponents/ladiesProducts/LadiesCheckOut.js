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

const LadiesCheckOut = () => {
  const route = useRoute();
  const product_pic = route.params?.product_pic || 'No Product Image';
  const product = route.params?.product || 'No Product Name';
  const price = parseFloat(route.params?.price);
  const name = route.params?.name || 'No Name';
  const cell = route.params?.cell || ' No Cell';
  const address = route.params?.address || 'No Address';
  const comments = route.params?.comments || 'No Comments';
  const piko = route.params?.piko || 'Not Selected';
  const dupatta = route.params?.dupatta || 'Not Selected';
  const top = route.params?.top || 'Not Selected';
  const embroidery = route.params?.embroidery || 'Not Selected';
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
  const pikoFull = 120;
  const pikoHalf = 60;
  const dupattaPiping = 300;
  const dupattaExtension = 300;
  const dupattaFetta = 300;
  const fullTopPiping = 300;
  const fullTopExtension = 300;
  const fullTopFetta = 300;
  const embroideryGalla = 300;
  const embroideryDaman = 300;
  const embroideryBazo = 300;
  const embroideryBottom = 300;
  const deliveryCharges = 300;

  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (piko === 'Piko Full') {
      totalPrice += pikoFull;
    } else if (piko === 'Piko Half') {
      totalPrice += pikoHalf;
    }

    if (dupatta === 'Dupatta Piping') {
      totalPrice += dupattaPiping;
    } else if (dupatta === 'Dupatta Fetta') {
      totalPrice += dupattaFetta;
    }
    if (dupatta === 'Dupatta Extension') {
      totalPrice += dupattaExtension;
    }

    if (top === 'Full Top Piping') {
      totalPrice += fullTopPiping;
    } else if (top === 'Full Top Fetta') {
      totalPrice += fullTopFetta;
    }
    if (top === 'Full Top Extension') {
      totalPrice += fullTopExtension;
    }

    if (embroidery === 'Embroidery Galla') {
      totalPrice += embroideryGalla;
    } else if (embroidery === 'Embroidery Daman') {
      totalPrice += embroideryDaman;
    }
    if (embroidery === 'Embroidery Bazo') {
      totalPrice += embroideryBazo;
    } else if (embroidery === 'Embroidery Bottom') {
      totalPrice += embroideryBottom;
    }

    totalPrice += deliveryCharges;

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
    {label: 'Comment', value: comments || 'No Additional Comment'},
    {label: 'Pickup Timing', value: availTime},

    {label: 'Product Base Price', value: formatPriceAsCurrency(price)},

    {
      label: 'Piko',
      value: `${piko || 'Not selected'} (Rs.${
        piko === 'Piko Full' ? pikoFull : piko === 'Piko Half' ? pikoHalf : 0
      })`,
    },

    {
      label: 'Dupatta',
      value: `${dupatta || 'Not selected'} (Rs.${
        dupatta === 'Dupatta Piping'
          ? dupattaPiping
          : dupatta === 'Dupatta Extension'
          ? dupattaExtension
          : dupatta === 'Dupatta Fetta'
          ? dupattaFetta
          : 0
      })`,
    },

    {
      label: 'Top',
      value: `${top || 'Not selected'} (Rs.${
        top === 'Full Top Piping'
          ? fullTopPiping
          : top === 'Full Top Extension'
          ? fullTopExtension
          : top === 'Full Top Fetta'
          ? fullTopFetta
          : 0
      })`,
    },

    {
      label: 'Embroidery',
      value: `${embroidery || 'Not selected'} (Rs.${
        embroidery === 'Embroidery Galla'
          ? embroideryGalla
          : embroidery === 'Embroidery Daman'
          ? embroideryDaman
          : embroidery === 'Embroidery Bazo'
          ? embroideryBazo
          : embroidery === 'Embroidery Bottom'
          ? embroideryBottom
          : ''
      })`,
    },

    {label: 'Delivery Charges', value: formatPriceAsCurrency(deliveryCharges)},
  ];

  const handleSubmitOrder = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    setLoading(true);

    try {
      let sampleImageName = `sample_${Date.now()}.jpg`;
      const reference = storage().ref(
        `orders/ladies_orders/samples/${sampleImageName}`,
      );

      await reference.putFile(sample);
      const sampleUrl = await reference.getDownloadURL();

      const orderData = {
        product_pic,
        product,
        name,
        cell,
        address,
        comments,
        price,
        piko,
        dupatta,
        top,
        embroidery,
        availTime,
        sample: sampleUrl,
        category: 'ladies',
        total,
        deliveryCharges,
        date: currentDate,
        time: currentTime,
      };

      const response = await firestore().collection('orders').add(orderData);

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

export default LadiesCheckOut;

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
