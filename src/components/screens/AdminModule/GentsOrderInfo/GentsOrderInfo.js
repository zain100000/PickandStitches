import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

const GentsOrderInfo = ({route}) => {
  const {selectedOrder} = route.params;

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: selectedOrder.product_pic}}
          className="w-52 h-96 bg-contain"
        />
        <View>
          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Product Name:</Text>
            <Text className="text-lg">{selectedOrder.product}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Name:</Text>
            <Text className="text-lg">{selectedOrder.name}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Cell:</Text>
            <Text className="text-lg">{selectedOrder.cell}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Address:</Text>
            <Text className="text-lg">{selectedOrder.address}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Neck:</Text>
            <Text className="text-lg">{selectedOrder.neck}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Pocket:</Text>
            <Text className="text-lg">{selectedOrder.Pocket}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Daman:</Text>
            <Text className="text-lg">{selectedOrder.Daman}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Wrist:</Text>
            <Text className="text-lg">{selectedOrder.wrist}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Leg Opening:</Text>
            <Text className="text-lg">{selectedOrder.puncha}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Double Stitch:</Text>
            <Text className="text-lg">{selectedOrder.Tob_double_stitch}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Embroidery:</Text>
            <Text className="text-lg">{selectedOrder.Embroidery}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Comments:</Text>
            <Text className="text-lg">{selectedOrder.comments}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between items-center">
            <Text className="text-lg">Samples:</Text>
            {selectedOrder.sample ? (
              <Image
                source={{uri: selectedOrder.sample}}
                className="w-36 h-36 bg-contain"
              />
            ) : (
              <Text className="text-xl text-gray-600">No Sample Attached</Text>
            )}
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Total:</Text>
            <Text className="text-lg">{selectedOrder.total}Rs/-</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GentsOrderInfo;
