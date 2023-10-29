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
  const sample = route.params?.sample;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Define pricing variables
  const basePrice = price;

  // Calculate the total price based on user selections
  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    return totalPrice;
  };

  // Get the dynamically calculated total price
  const total = calculateTotalPrice();

  // Function to format the price as currency
  const formatPriceAsCurrency = amount => {
    return new Intl.NumberFormat('en-PKR', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
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
          <p><b>Product Base Price:</b> ${formatPriceAsCurrency(
            basePrice,
          )}</p>   
          <p><b>Total Price:</b> ${formatPriceAsCurrency(total)}</p>         
        </body>
      </html>
    `;

    return receiptHtml;
  };

  const saveApiData = async () => {
    // Define the API endpoint URL
    const apiUrl =
      'https://pickandstitches.com/font-awesome/scss/scss/api_endpoint.php';

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
      total,
    };

    console.log('Order Data:', orderData); // Add this console.log

    // Set loading to true while the request is in progress
    setLoading(true);

    try {
      // Make a POST request to the API with the order data
      const response = await axios.post(apiUrl, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response); // Add this console.log

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
            <Text className="mb-2 font-semibold text-primary">
              {item.label}
            </Text>
            <Text className="font-semibold text-primary">{item.value}</Text>
          </View>
        )}
      />
      <Text className="text-lg font-semibold text-center text-primary top-3">
        Total Price: {formatPriceAsCurrency(total)}
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
