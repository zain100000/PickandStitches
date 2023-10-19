import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GentsItemsContainer = ({imgSrc, title, price, onwards, data}) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    // Navigate to the GentsOrder screen and pass the image source as a parameter
    navigation.navigate('GentsOrderDetails', {imgSrc, title, price});
  };

  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center border border-gray-300 rounded-md px-2 py-2 shadow mt-5 mb-3"
      onPress={handleItemPress}>
      <Image
        source={imgSrc}
        className="object-contain rounded-md mt-2 w-[200px] h-[285px]"
      />

      {title ? (
        <>
          <View className="flex-1 items-center p-2">
            <Text className="text-[#c3497d] text-xl font-semibold px-2 mt-2">
              {title}
            </Text>
            <Text className="text-dark text-lg font-semibold">Rs.{price}</Text>
            <Text className="text-primary text-lg font-semibold">
              {onwards}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default GentsItemsContainer;
