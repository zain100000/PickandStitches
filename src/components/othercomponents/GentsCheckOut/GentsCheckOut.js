import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Print from 'react-native-print';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const GentsCheckOut = () => {
  const route = useRoute();
  const title = route.params?.title || 'Default Title';
  const price = parseFloat(route.params?.price);
  const name = route.params?.name || 'Default name';
  const cell = route.params?.cell || 'Default cell';
  const adress = route.params?.adress || 'Default adress';
  const neckType = route.params?.neckType || 'Not selected';
  const pocketType = route.params?.pocketType || 'Not selected';
  const damanType = route.params?.damanType || 'Not selected';
  const wristType = route.params?.wristType || 'Not selected';
  const comment = route.params?.comment || 'comment';
  const singleKanta = route.params?.singleKanta || false;
  const doubleKanta = route.params?.doubleKanta || false;
  const tobStitch = route.params?.tobStitch || false;
  const embroideryFull = route.params?.embroideryFull || false;
  const embroideryNormal = route.params?.embroideryNormal || false;
  const sample = route.params?.sample;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Define pricing variables
  const basePrice = price;
  const SingleKantaPrice = 100;
  const DoubleKantaPrice = 200;
  const tobStitchPrice = 200;
  const embroideryFullPrice = 500;
  const embroideryNormalPrice = 300;

  // Calculate the total price based on user selections
  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (singleKanta) {
      totalPrice += SingleKantaPrice;
    }

    if (doubleKanta) {
      totalPrice += DoubleKantaPrice;
    }

    if (tobStitch) {
      totalPrice += tobStitchPrice;
    }

    if (embroideryFull) {
      totalPrice += embroideryFullPrice;
    }

    if (embroideryNormal) {
      totalPrice += embroideryNormalPrice;
    }

    return totalPrice;
  };

  // Get the dynamically calculated total price
  const totalPrice = calculateTotalPrice();

  // Function to format the price as currency
  const formatPriceAsCurrency = amount => {
    return new Intl.NumberFormat('en-PKR', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
  };

  // Function to handle order submission

  // Function to describe leg opening pricing
  const getPriceDescription = (singleKanta, doubleKanta) => {
    if (singleKanta && doubleKanta) {
      return 'Single Kanta(Rs.100) and Double Kanta(Rs.200)';
    } else if (singleKanta) {
      return 'Single Kanta(Rs.100)';
    } else if (doubleKanta) {
      return 'Double Kanta(Rs.200)';
    }
    return 'Not selected';
  };

  // Function to describe embroidery pricing
  const getEmbroideryDescription = (embroidaryFull, embroideryNormal) => {
    if (embroidaryFull && embroideryNormal) {
      return 'Embroidery Full(Rs.500) and Embroidery Normal(Rs.300)';
    } else if (embroidaryFull) {
      return 'Embroidery Full(Rs.500)';
    } else if (embroideryNormal) {
      return 'Embroidery Normal(Rs.300)';
    }
    return 'Not selected';
  };

  // Define order details for display
  const orderDetails = [
    {label: 'Product Name', value: title},
    {label: 'Name', value: name},
    {label: 'Mobile', value: cell},
    {label: 'Address', value: adress},
    {label: 'Neck Type', value: neckType || 'Not selected'},
    {label: 'Pocket Type', value: pocketType || 'Not selected'},
    {label: 'Daman Type', value: damanType || 'Not selected'},
    {label: 'Wrist Type', value: wristType || 'Not selected'},
    {label: 'Comment', value: comment || 'No additional comment'},
    {label: 'Product Base Price', value: price},
    {
      label: 'Leg Opening (Puncha)',
      value: getPriceDescription(singleKanta, doubleKanta),
    },
    {
      label: 'Tob Stitch',
      value: tobStitch ? 'Double Kanta (Rs. 200)' : 'Not selected',
    },
    {
      label: 'Embroidery',
      value: getEmbroideryDescription(embroideryFull, embroideryNormal),
    },
    {
      label: 'Samples',
      value: (
        <View className="flex-1 flex-row p-5">
          {sample && sample.length > 0 ? (
            sample.map(uri => (
              <Image key={uri} source={{uri}} className="w-20 h-20" />
            ))
          ) : (
            <Text className="text-gray-400 font-medium text-sm">
              No Sample Attached
            </Text>
          )}
        </View>
      ),
    },
  ];

  // Function to handle printing the receipt
  const printReceipt = async () => {
    const receiptContent = getOrderReceiptContent();

    try {
      const printJob = await Print.print({
        html: receiptContent,
      });

      if (printJob) {
        console.log('Printing successful');
      } else {
        console.log('Printing canceled');
      }
    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  };

  // Function to format the receipt content
  const getOrderReceiptContent = () => {
    // Implement the formatting of the receipt content here
    // You can use the order details from the state to create the receipt content

    const receiptContent = `
    <html>
      <head>
        <style>
          h1 {
            font-size: 3rem;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Order Receipt</h1>
        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Product Name</h4>
        <p style="font-size:2rem">${title}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Name</h4>
        <p style="font-size:2rem">${name}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Cell</h4>
        <p style="font-size:2rem">${cell}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Address</h4>
        <p style="font-size:2rem">${adress}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Neck Type</h4>
        <p style="font-size:2rem">${neckType}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Pocket Type</h4>
        <p style="font-size:2rem">${pocketType}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Daman</h4>
        <p style="font-size:2rem">${damanType}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Wrist</h4>
        <p style="font-size:2rem">${wristType}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Comment</h4>
        <p style="font-size:2rem">${comment}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4 style="font-size:2rem">Leg Opening (Puncha)</h4>
      <p style="font-size:2rem">${getPriceDescription(
        singleKanta,
        doubleKanta,
      )}</p>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center;">
    <h4 style="font-size:2rem">Tob Stitch</h4>
    <p style="font-size:2rem">${tobStitch}</p>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h4 style="font-size:2rem">Embroidery</h4>
    <p style="font-size:2rem">${getEmbroideryDescription(
      embroideryFull,
      embroideryNormal,
    )}</p>
  </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Total Amount</h4>
        <p style="font-size:2rem">${formatPriceAsCurrency(totalPrice)}</p>
        </div>
      </body>
    </html>
  `;

    return receiptContent;
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={orderDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="flex-row flex-wrap justify-between items-center p-4 border-b-2 border-b-gray-400">
            <Text className="mb-2">{item.label}</Text>
            <Text>{item.value}</Text>
          </View>
        )}
      />
      <Text className="text-lg font-semibold text-center">
        Total Price: {formatPriceAsCurrency(totalPrice)}
      </Text>

      <View className="flex-row justify-between">
        <TouchableOpacity className="justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl w-80">
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text className="text-white text-xl">Submit Order</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="right-5 top-2 justify-center items-center"
          onPress={printReceipt}>
          <AntDesign name="printer" size={30} color="#000" />
          <Text className="text-ternary font-bold">Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GentsCheckOut;
