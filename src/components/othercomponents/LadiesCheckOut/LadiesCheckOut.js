import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Print from 'react-native-print';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const LadiesCheckOut = () => {
  const route = useRoute();
  const product = route.params?.product || 'Default product';
  const product_pic = route.params?.product_pic || 'Default product_pic';
  const price = parseFloat(route.params?.price);
  const name = route.params?.name || 'Default name';
  const email = route.params?.email || 'Default email';
  const cell = route.params?.cell || 'Default cell';
  const adress = route.params?.adress || 'Default adress';
  const comments = route.params?.comments || 'No Additional Comment';
  const peko = route.params?.peko || 'Not Selected';
  const Dupata_Piping = route.params?.Dupata_Piping || 'Not Selected';
  const Full_top_piping = route.params?.Full_top_piping || 'Not Selected';
  const Embroidery = route.params?.Embroidery || 'Not Selected';
  const sample = route.params?.sample;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Define pricing variables
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
  const deliverycharges = 300;

  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (peko === 'Piko Full') {
      totalPrice += pikoFull;
    } else if (peko === 'Piko Half') {
      totalPrice += pikoHalf;
    }

    if (Dupata_Piping === 'Dupatta Piping') {
      totalPrice += dupattaPiping;
    } else if (Dupata_Piping === 'Dupatta Extension') {
      totalPrice += dupattaExtension;
    } else if (Dupata_Piping === 'Dupatta Fetta') {
      totalPrice += dupattaFetta;
    }

    if (Full_top_piping === 'Full Top Piping') {
      totalPrice += fullTopPiping;
    } else if (Full_top_piping === 'Full Top Extension') {
      totalPrice += fullTopExtension;
    } else if (Full_top_piping === 'Full Top Fetta') {
      totalPrice += fullTopFetta;
    }

    if (Embroidery === 'Embroidery Galla') {
      totalPrice += embroideryGalla;
    } else if (Embroidery === 'Embroidery Daman') {
      totalPrice += embroideryDaman;
    } else if (Embroidery === 'Embroidery Bazo') {
      totalPrice += embroideryBazo;
    } else if (Embroidery === 'Embroidery Bottom') {
      totalPrice += embroideryBottom;
    }

    if (deliverycharges) {
      totalPrice += deliverycharges;
    }

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
    {label: 'Email', value: email},
    {label: 'Mobile', value: cell},
    {label: 'Address', value: adress},
    {label: 'Comments', value: comments || 'No additional comments'},
    {label: 'Product Base Price', value: formatPriceAsCurrency(price)},
    {
      label: 'Piko',
      value: `${peko || 'Not selected'} (Rs.${
        peko === 'Piko Full' ? pikoFull : peko === 'Piko Half' ? pikoHalf : 0
      })`,
    },

    {
      label: 'Dupatta',
      value: `${Dupata_Piping || 'Not selected'} (Rs.${
        Dupata_Piping === 'Dupatta Piping'
          ? dupattaPiping
          : Dupata_Piping === 'Dupatta Extension'
          ? dupattaExtension
          : Dupata_Piping === 'Dupatta Fetta'
          ? dupattaFetta
          : 0
      })`,
    },

    {
      label: 'Top',
      value: `${Full_top_piping || 'Not selected'} (Rs.${
        Full_top_piping === 'Full Top Piping'
          ? fullTopPiping
          : Full_top_piping === 'Full Top Extension'
          ? fullTopExtension
          : Full_top_piping === 'Full Top Fetta'
          ? fullTopFetta
          : 0
      })`,
    },

    {
      label: 'Embroidery',
      value: `${Embroidery || 'Not selected'} (Rs.${
        Embroidery === 'Embroidery Galla'
          ? embroideryGalla
          : Embroidery === 'Embroidery Daman'
          ? embroideryDaman
          : Embroidery === 'Embroidery Bazo'
          ? embroideryBazo
          : Embroidery === 'Embroidery Bottom'
          ? embroideryBottom
          : ''
      })`,
    },

    {label: 'Delivery Charges', value: formatPriceAsCurrency(deliverycharges)},

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
        <p style="font-size:2rem">${product}</p>      
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Name</h4>
        <p style="font-size:2rem">${name}</p>      
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Email</h4>
        <p style="font-size:2rem">${email}</p>      
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
        <h4 style="font-size:2rem">Comments</h4>
        <p style="font-size:2rem">${comments || 'No Comment'}</p>
        </div>  

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Product Base Price</h4>
        <p style="font-size:2rem">${formatPriceAsCurrency(basePrice)}</p>
        </div>    

        <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Piko</h4>
        <p style="font-size:2rem">${peko || 'Not selected'} (Rs.${
      peko === 'Piko Full' ? pikoFull : peko === 'Piko Half' ? pikoHalf : 0
    })
    })</p>
        </div>      

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Dupatta</h4>
        <p style="font-size:2rem">${Dupata_Piping || 'Not selected'} (Rs.${
      Dupata_Piping === 'Dupatta Piping'
        ? dupattaPiping
        : Dupata_Piping === 'Dupatta Extension'
        ? dupattaExtension
        : Dupata_Piping === 'Dupatta Fetta'
        ? dupattaFetta
        : 0
    })</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Top</h4>
        <p style="font-size:2rem">${Full_top_piping || 'Not selected'} (Rs.${
      Full_top_piping === 'Full Top Piping'
        ? fullTopPiping
        : Full_top_piping === 'Full Top Extension'
        ? fullTopExtension
        : Full_top_piping === 'Full Top Fetta'
        ? fullTopFetta
        : 0
    })</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4 style="font-size:2rem">Top</h4>
      <p style="font-size:2rem">${Embroidery || 'Not selected'} (Rs.${
      Embroidery === 'Embroidery Galla'
        ? embroideryGalla
        : Embroidery === 'Embroidery Daman'
        ? embroideryDaman
        : Embroidery === 'Embroidery Bazo'
        ? embroideryBazo
        : Embroidery === 'Embroidery Bottom'
        ? embroideryBottom
        : ''
    })</p>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center;">
    <h4 style="font-size:2rem">Delivery Charges</h4>
    <p style="font-size:2rem">${formatPriceAsCurrency(deliverycharges)}</p>
  </div> 

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Total Price</h4>
        <p style="font-size:2rem">${formatPriceAsCurrency(total)}</p>
      </div>            
      </body>
    </html>
  `;

    return receiptContent;
  };

  const handleCheckOut = async () => {
    try {
      // Show loading indicator
      setLoading(true);

      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString();
      ('');

      const formData = new FormData();

      // Define the order data
      const orderData = {
        name,
        email,
        cell,
        adress,
        comments,
        type: 'female',
        date: currentDate,
        time: currentTime,
        deliverycharges,
        price,
        total: calculateTotalPrice(),
        product,
        peko: peko
          ? `${peko} (Rs.${
              peko === 'Piko Full' ? 120 : peko === 'Piko Half' ? 60 : 0
            })`
          : '',

        Dupata_Piping: Dupata_Piping
          ? `${Dupata_Piping} (Rs.${
              Dupata_Piping === 'Dupatta Piping'
                ? 300
                : Dupata_Piping === 'Dupatta Extension'
                ? 300
                : Dupata_Piping === 'Dupatta Fetta'
                ? 300
                : 0
            })`
          : '',

        Full_top_piping: Full_top_piping
          ? `${Full_top_piping} (Rs.${
              Full_top_piping === 'Full Top Piping'
                ? 300
                : Full_top_piping === 'Full Top Extension'
                ? 300
                : Full_top_piping === 'Full Top Fetta'
                ? 300
                : 0
            })`
          : '',

        Embroidery: Embroidery
          ? `${Embroidery} (Rs.${
              Embroidery === 'Embroidery Galla'
                ? 300
                : Embroidery === 'Embroidery Daman'
                ? 300
                : Embroidery === 'Embroidery Bazo'
                ? 300
                : Embroidery === 'Embroidery Bazo'
                ? 300
                : 0
            })`
          : '',

        sample: sample.forEach((uri, index) => {
          const sample = `sample_${index + 1}.jpg`;
          formData.append('sample[]', {
            uri: uri,
            type: 'image/jpeg',
            name: sample,
          });
        }),
      };

      // Send order details to the backend API
      const orderApiUrl =
        'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php';
      const response = await axios.post(orderApiUrl, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Order submission successful
        // Now, send a notification to the admin
        const notificationApiUrl =
          'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders_notifications.php';
        const notificationResponse = await axios.post(notificationApiUrl, {
          product,
          name,
          email,
          cell,
          adress,
          comments,
          price,
          peko: peko
            ? `${peko} (Rs.${
                peko === 'Piko Full' ? 120 : peko === 'Piko Half' ? 60 : 0
              })`
            : '',

          Dupata_Piping: Dupata_Piping
            ? `${Dupata_Piping} (Rs.${
                Dupata_Piping === 'Dupatta Piping'
                  ? 300
                  : Dupata_Piping === 'Dupatta Extension'
                  ? 300
                  : Dupata_Piping === 'Dupatta Fetta'
                  ? 300
                  : 0
              })`
            : '',

          Full_top_piping: Full_top_piping
            ? `${Full_top_piping} (Rs.${
                Full_top_piping === 'Full Top Piping'
                  ? 300
                  : Full_top_piping === 'Full Top Extension'
                  ? 300
                  : Full_top_piping === 'Full Top Fetta'
                  ? 300
                  : 0
              })`
            : '',

          Embroidery: Embroidery
            ? `${Embroidery} (Rs.${
                Embroidery === 'Embroidery Galla'
                  ? 300
                  : Embroidery === 'Embroidery Daman'
                  ? 300
                  : Embroidery === 'Embroidery Bazo'
                  ? 300
                  : Embroidery === 'Embroidery Bazo'
                  ? 300
                  : 0
              })`
            : '',

          deliverycharges,
          total: calculateTotalPrice(),
        });

        if (notificationResponse.data.success) {
          // Notification sent successfully
          alert('Thank You! Your Order Has Been Placed Successfully!');
        } else {
          console.error(
            'Error sending notification:',
            notificationResponse.data.error,
          );
          alert('Error sending notification. Please try again later.');
        }
      } else {
        // Order submission failed
        console.error('API request failed with status code:', response.status);
        console.log('API Response Data:', response.data);
        alert('Error saving data. Please try again later.');
      }
    } catch (error) {
      // Log the Axios error for debugging
      console.error('AxiosError:', error);

      // Handle any errors that occurred during the process
      console.error('Error handling checkout:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      // Hide loading indicator
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
            <Text
              className="mb-2 text-primary"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {item.label}
            </Text>
            <Text
              className="text-primary"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {item.value}
            </Text>
          </View>
        )}
      />
      <Text
        className="text-lg text-center text-primary top-3"
        style={{fontFamily: 'Montserrat-SemiBold'}}>
        Total Price: {formatPriceAsCurrency(total)}
      </Text>

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={handleCheckOut}
          className="justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl w-80">
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text
              className="text-white text-xl"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Submit Order
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="right-5 top-2 justify-center items-center"
          onPress={printReceipt}>
          <AntDesign name="printer" size={30} color="#000" />
          <Text
            className="text-ternary"
            style={{fontFamily: 'Montserrat-SemiBold'}}>
            Print
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LadiesCheckOut;
