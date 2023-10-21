import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const LadiesOrderInfo = ({route}) => {
  const {selectedOrder} = route.params;
  const [isImageViewerVisible, setImageViewerVisible] = useState(true);
  const imageUrls = [{url: selectedOrder.product_pic}];

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
          <Image
            source={{uri: selectedOrder.product_pic}}
            className="w-52 h-96 bg-contain"
          />
        </TouchableOpacity>
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
            <Text className="text-lg">Full Top Piping:</Text>
            <Text className="text-lg">{selectedOrder.Full_top_piping}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Dupatta Piping:</Text>
            <Text className="text-lg">{selectedOrder.Dupata_Piping}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Embroidery:</Text>
            <Text className="text-lg">{selectedOrder.Embroidery}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Tob Double Stitch:</Text>
            <Text className="text-lg">{selectedOrder.Tob_double_stitch}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Comments:</Text>
            <Text className="text-lg">{selectedOrder.comments}</Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Total:</Text>
            <Text className="text-lg">{selectedOrder.total}</Text>
          </View>

          <Image
            source={{uri: selectedOrder.sample}}
            className="w-24 h-24 bg-contain"
          />
        </View>
      </ScrollView>
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown
        index={0}
        onClick={() => setImageViewerVisible(false)}
        onCancel={() => setImageViewerVisible(false)}
        enablePreload
        saveToLocalByLongPress={false}
        loadingRender={() => <ActivityIndicator size="large" color="white" />}
        visible={isImageViewerVisible}
      />
    </View>
  );
};

export default LadiesOrderInfo;
