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
  const product = route.params?.product || 'Default product';
  const price = parseFloat(route.params?.price);
  const name = route.params?.name || 'Default name';
  const cell = route.params?.cell || 'Default cell';
  const adress = route.params?.adress || 'Default adress';
  const neck = route.params?.neck || 'Not selected';
  const Pocket = route.params?.Pocket || 'Not selected';
  const Daman = route.params?.Daman || 'Not selected';
  const wrist = route.params?.wrist || 'Not selected';
  const comments = route.params?.comments || 'Comment';
  const puncha = route.params?.puncha || [];
  const Tob_double_stitch = route.params?.Tob_double_stitch || false;
  const Embroidery = route.params?.Embroidery || [];
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

    if (puncha.includes('Single Kanta')) {
      totalPrice += SingleKantaPrice;
    }

    if (puncha.includes('Double Kanta')) {
      totalPrice += DoubleKantaPrice;
    }

    if (Tob_double_stitch) {
      totalPrice += tobStitchPrice;
    }

    if (Embroidery.includes('EmbroideryFull')) {
      totalPrice += embroideryFullPrice;
    }

    if (Embroidery.includes('EmbroideryNormal')) {
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
    {label: 'Product Name', value: product},
    {label: 'Name', value: name},
    {label: 'Mobile', value: cell},
    {label: 'Address', value: adress},
    {label: 'Neck Type', value: neck || 'Not selected'},
    {label: 'Pocket Type', value: Pocket || 'Not selected'},
    {label: 'Daman Type', value: Daman || 'Not selected'},
    {label: 'Wrist Type', value: wrist || 'Not selected'},
    {label: 'Comment', value: comments || 'No additional comment'},
    {label: 'Product Base Price', value: price},
    {
      label: 'Leg Opening (Puncha)',
      value: getPriceDescription(
        puncha.includes('Single Kanta'),
        puncha.includes('Double Kanta'),
      ),
    },
    {
      label: 'Tob Stitch',
      value: Tob_double_stitch ? 'Tob Double Stitch (Rs. 200)' : 'Not selected',
    },
    {
      label: 'Embroidery',
      value: getEmbroideryDescription(
        Embroidery.includes('EmbroideryFull'),
        Embroidery.includes('EmbroideryNormal'),
      ),
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
    // You can use HTML/CSS to structure and style the receipt
    const receiptHtml = `
      <html>
        <head>
          <style>
            /* Define your receipt styles here */
          </style>
        </head>
        <body>
          <h1>Order Receipt</h1>
          <p><b>Product Name:</b> ${product}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Mobile:</b> ${cell}</p>
          <p><b>Address:</b> ${adress}</p>
          <p><b>Neck Type:</b> ${neck || 'Not selected'}</p>
          <p><b>Pocket Type:</b> ${Pocket || 'Not selected'}</p>
          <p><b>Daman Type:</b> ${Daman || 'Not selected'}</p>
          <p><b>Wrist Type:</b> ${wrist || 'Not selected'}</p>
          <p><b>Comment:</b> ${comments || 'No additional comment'}</p>
          <p><b>Product Base Price:</b> ${formatPriceAsCurrency(price)}</p>
          <p><b>Leg Opening (Puncha):</b> ${getPriceDescription(
            puncha.includes('Single Kanta'),
            puncha.includes('Double Kanta'),
          )}</p>
          <p><b>Tob Stitch:</b> ${
            Tob_double_stitch ? 'Tob Double Stitch (Rs. 200)' : 'Not selected'
          }</p>
          <p><b>Embroidery:</b> ${getEmbroideryDescription(
            Embroidery.includes('EmbroideryFull'),
            Embroidery.includes('EmbroideryNormal'),
          )}</p>
        </body>
      </html>
    `;

    return receiptHtml;
  };

  const saveApiData = async () => {
    // Define the API endpoint URL
    const apiUrl =
      'https://pickandstitches.com/font-awesome/scss/scss/api_male_orders.php';

    // Prepare the data to be sent to the API
    const orderData = {
      name,
      cell,
      adress,
      neck,
      Pocket,
      Daman,
      wrist,
      comments,
    };

    console.log(orderData);
    // Set loading to true while the request is in progress
    setLoading(true);

    try {
      // Make a POST request to the API with the order data
      const response = await axios.post(apiUrl, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Data saved successfully
        alert('Data Saved');
      } else {
        // Handle the response status code or other error conditions
        console.error('API request failed with status code:', response.status);
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error saving data:', error);
    } finally {
      // Set loading back to false when the request is completed (whether it's successful or not)
      setLoading(false);
    }
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
        <TouchableOpacity
          onPress={saveApiData}
          className="justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl w-80">
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
