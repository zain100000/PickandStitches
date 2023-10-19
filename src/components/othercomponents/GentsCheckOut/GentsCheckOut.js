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

const GentsCheckOut = () => {
  const route = useRoute();
  const title = route.params?.title || 'Default Title';
  const price = parseFloat(route.params?.price);
  const fullname = route.params?.fullname || 'Default fullname';
  const mobile = route.params?.mobile || 'Default mobile';
  const address = route.params?.address || 'Default address';
  const neckType = route.params?.neckType || 'Not selected';
  const pocketType = route.params?.pocketType || 'Not selected';
  const damanType = route.params?.damanType || 'Not selected';
  const wristType = route.params?.wristType || 'Not selected';
  const message = route.params?.message || 'Message';
  const singleKanta = route.params?.singleKanta || false;
  const doubleKanta = route.params?.doubleKanta || false;
  const tobStitch = route.params?.tobStitch || false;
  const embroideryFull = route.params?.embroideryFull || false;
  const embroideryNormal = route.params?.embroideryNormal || false;
  const attachment = route.params?.attachment;
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
  const handleSubmit = () => {
    setLoading(true);
    alert('Thank You', 'Your Order has been placed successfully');
    navigation.navigate('UserHome');
    setLoading(false);
  };

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

  const getEmbroideryDescription = (embroidaryFull, embroideryNormal) => {
    if (embroidaryFull && embroideryNormal) {
      return 'Full(Rs.500) and Normal(Rs.300)';
    } else if (embroidaryFull) {
      return 'Full(Rs.500)';
    } else if (embroideryNormal) {
      return 'Normal(Rs.300)';
    }
    return 'Not selected';
  };

  const orderDetails = [
    {label: 'Product Name', value: title},
    {label: 'Name', value: fullname},
    {label: 'Mobile', value: mobile},
    {label: 'Address', value: address},
    {label: 'Neck Type', value: neckType || 'Not selected'},
    {label: 'Pocket Type', value: pocketType || 'Not selected'},
    {label: 'Daman Type', value: damanType || 'Not selected'},
    {label: 'Wrist Type', value: wristType || 'Not selected'},
    {label: 'Message', value: message || 'No additional message'},
    {label: 'Product Base Price', value: price},

    {
      label: 'Leg Opening (Puncha)',
      value: getPriceDescription(singleKanta, doubleKanta),
    },

    {
      label: 'Tob Stitch',
      value: tobStitch ? 'Double Kanta(Rs.200)' : 'Not selected',
    },
    {
      label: 'Embroidery',
      value: getEmbroideryDescription(embroideryFull, embroideryNormal),
    },
    {
      label: 'Samples',
      value: (
        <View className="flex-1 flex-row p-5">
          {attachment && attachment.length > 0 ? (
            attachment.map(uri => (
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
    const receiptContent = getOrderReceiptContent(); // Implement a function to format the receipt content

    try {
      const printJob = await Print.print({
        html: receiptContent,
        // You can configure print options here, e.g., orientation, width, height, etc.
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
        <p style="font-size:2rem">${fullname}</p>      
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Cell</h4>
        <p style="font-size:2rem">${mobile}</p>      
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Address</h4>
        <p style="font-size:2rem">${address}</p>      
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
        <h4 style="font-size:2rem">Daman Type</h4>
        <p style="font-size:2rem">${damanType}</p>      
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Wrist Type</h4>
        <p style="font-size:2rem">${wristType}</p>      
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
        <p style="font-size:2rem">${
          tobStitch ? 'Double Kanta (Rs. 200)' : 'Not selected'
        }</p>
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
        <TouchableOpacity
          className="justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl w-80"
          onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color={'#fff'} /> // Show loader while loading
          ) : (
            <Text className="text-white text-xl">Submit Order</Text> // Show Submit text when not loading
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
