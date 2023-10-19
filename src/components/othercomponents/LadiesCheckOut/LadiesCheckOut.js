import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Print from 'react-native-print';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LadiesCheckOut = () => {
  const route = useRoute();
  const title = route.params?.title || 'Default Title';
  const price = parseFloat(route.params?.price);
  const fullname = route.params?.fullname || 'Default fullname';
  const mobile = route.params?.mobile || 'Default mobile';
  const address = route.params?.address || 'Default address';
  const message = route.params?.message || 'Message';
  const pikoFull = route.params?.pikoFull || false;
  const pikoHalf = route.params?.pikoHalf || false;
  const dupataPiping = route.params?.dupataPiping || false;
  const dupataExtension = route.params?.dupataExtension || false;
  const dupataFetta = route.params?.dupataFetta || false;
  const fullTopPiping = route.params?.fullTopPiping || false;
  const fullTopExtension = route.params?.fullTopExtension || false;
  const fullTopFetta = route.params?.fullTopFetta || false;
  const embroideryGala = route.params?.embroideryGala || false;
  const embroideryDaman = route.params?.embroideryDaman || false;
  const embroideryBazu = route.params?.embroideryBazu || false;
  const embroideryBottom = route.params?.embroideryBottom || false;
  const attachment = route.params?.attachment;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Define pricing variables
  const basePrice = price;
  const PikoFullPrice = 120;
  const PikoHalfPrice = 60;
  const DupattaPipingPrice = 300;
  const DupattaExtensionPrice = 300;
  const DupattaFettaPrice = 300;
  const FullTopPipingPrice = 300;
  const FullTopExtensionPrice = 300;
  const FullTopFettaPrice = 300;
  const EmbroideryGalaPrice = 300;
  const EmbroideryDamanPrice = 300;
  const EmbroideryBazuPrice = 300;
  const EmbroideryBottomPrice = 300;

  // Calculate the total price based on user selections
  const calculateTotalPrice = () => {
    let totalPrice = basePrice;

    if (pikoFull) {
      totalPrice += PikoFullPrice;
    }

    if (pikoHalf) {
      totalPrice += PikoHalfPrice;
    }

    if (dupataPiping) {
      totalPrice += DupattaPipingPrice;
    }

    if (dupataExtension) {
      totalPrice += DupattaExtensionPrice;
    }

    if (dupataFetta) {
      totalPrice += DupattaFettaPrice;
    }

    if (fullTopPiping) {
      totalPrice += FullTopPipingPrice;
    }

    if (fullTopExtension) {
      totalPrice += FullTopExtensionPrice;
    }

    if (fullTopFetta) {
      totalPrice += FullTopFettaPrice;
    }

    if (embroideryGala) {
      totalPrice += EmbroideryGalaPrice;
    }

    if (embroideryDaman) {
      totalPrice += EmbroideryDamanPrice;
    }

    if (embroideryBazu) {
      totalPrice += EmbroideryBazuPrice;
    }

    if (embroideryBottom) {
      totalPrice += EmbroideryBottomPrice;
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

  const getPikoPriceDescription = (pikoFull, pikoHalf) => {
    if (pikoFull && pikoHalf) {
      return 'Piko Full(Rs.120) and Piko Half(Rs.60)';
    } else if (pikoFull) {
      return 'Piko Full(Rs.120)';
    } else if (pikoHalf) {
      return 'Piko Half(Rs.60)';
    }
    return 'Not selected';
  };

  const getDupattaPriceDescription = (
    depattaPiping,
    dupataExtension,
    dupataFetta,
  ) => {
    if (depattaPiping && dupataExtension && dupataFetta) {
      return 'Dupatta Piping(Rs.300) and Dupatta Extension(Rs.300) and Dupatta Fetta(Rs.300)';
    } else if (depattaPiping) {
      return 'Dupatta Piping(Rs.300)';
    } else if (dupataExtension) {
      return 'Dupatta Extension(Rs.300)';
    } else if (dupataFetta) {
      return 'Dupatta Fetta(Rs.300)';
    }
    return 'Not selected';
  };

  const getTopPriceDescription = (
    fullTopPiping,
    fullTopExtension,
    fullTopFetta,
  ) => {
    if (fullTopPiping && fullTopExtension && fullTopFetta) {
      return 'Full Top Piping(Rs.300) and Full Top Extension(Rs.300) and Full Top Fetta(Rs.300)';
    } else if (fullTopPiping) {
      return 'Full Top Piping(Rs.300)';
    } else if (fullTopExtension) {
      return 'Full Top Extension(Rs.300)';
    } else if (fullTopFetta) {
      return 'Full Top Fetta(Rs.300)';
    }
    return 'Not selected';
  };

  const getEmbroideryPriceDescription = (
    embroideryGala,
    embroideryDaman,
    embroideryBazu,
    embroideryBottom,
  ) => {
    if (
      embroideryGala &&
      embroideryDaman &&
      embroideryBazu &&
      embroideryBottom
    ) {
      return 'Embroidery Gala(Rs.300) and Embroidery Daman(Rs.300) and Embroidery Bazu(Rs.300) and Embroidery Bottom (Rs.300) ';
    } else if (embroideryGala) {
      return 'Embroidery Gala(Rs.300)';
    } else if (embroideryDaman) {
      return 'Embroidery Daman(Rs.300)';
    } else if (embroideryBazu) {
      return 'Embroidery Bazu(Rs.300)';
    } else if (embroideryBottom) {
      return 'Embroidery Bottom(Rs.300)';
    }
    return 'Not selected';
  };

  const orderDetails = [
    {label: 'Product Name', value: title},
    {label: 'Name', value: fullname},
    {label: 'Mobile', value: mobile},
    {label: 'Address', value: address},
    {label: 'Message', value: message || 'No additional message'},
    {label: 'Product Base Price', value: price},

    {
      label: 'Piko',
      value: getPikoPriceDescription(pikoFull, pikoHalf),
    },
    {
      label: 'Dupatta',
      value: getDupattaPriceDescription(
        dupataPiping,
        dupataExtension,
        dupataFetta,
      ),
    },
    {
      label: 'Top',
      value: getTopPriceDescription(
        fullTopPiping,
        fullTopExtension,
        fullTopFetta,
      ),
    },
    {
      label: 'Embroidery',
      value: getEmbroideryPriceDescription(
        embroideryGala,
        embroideryDaman,
        embroideryBazu,
        embroideryBottom,
      ),
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
        <h4 style="font-size:2rem">Piko</h4>
        <p style="font-size:2rem">${getPikoPriceDescription(
          pikoFull,
          pikoHalf,
        )}</p>
      </div>      

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Dupatta</h4>
        <p style="font-size:2rem">${getDupattaPriceDescription(
          dupataPiping,
          dupataExtension,
          dupataFetta,
        )}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Top</h4>
        <p style="font-size:2rem">${getTopPriceDescription(
          fullTopPiping,
          fullTopExtension,
          fullTopFetta,
        )}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h4 style="font-size:2rem">Embroidery</h4>
        <p style="font-size:2rem">${getEmbroideryPriceDescription(
          embroideryGala,
          embroideryDaman,
          embroideryBazu,
          embroideryBottom,
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

export default LadiesCheckOut;
