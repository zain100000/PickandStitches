import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const CarouselItem = ({item, onPressButton1, onPressButton2}) => {
  return (
    <View className="flex-1 items-center">
      <Image
        source={item.imageUri}
        className="w-full h-full bg-contain object-contain"
      />
      <View className="absolute w-full h-full items-center justify-center">
        <Text className="text-[30px] font-semibold text-light mb-2 w-[350px] text-center">
          {item.title}
        </Text>
        <Text className="text-[16px] font-normal text-light text-center w-[350px]">
          {item.description}
        </Text>
        {/* <View className="flex-row">
          <TouchableOpacity onPress={onPressButton1}>
            <View className="bg-primary pl-10 pr-10 pt-5 pb-5 rounded-xl m-5 shadow-md shadow-green-900">
              <Text className="text-center text-light">Button 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressButton2}>
            <View className="bg-primary pl-10 pr-10 pt-5 pb-5 rounded-xl m-5 shadow-md shadow-green-900">
              <Text className="text-center text-light">Button 2</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default CarouselItem;
