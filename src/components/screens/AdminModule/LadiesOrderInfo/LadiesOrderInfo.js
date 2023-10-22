import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

const LadiesOrderInfo = ({route}) => {
  const {selectedOrder} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: selectedOrder.product_pic}}
          className="w-52 h-96"
        />
        <View>
          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Product Name:</Text>
            <Text className="text-lg">{selectedOrder.product}</Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Name:</Text>
            <Text className="text-lg">{selectedOrder.name}</Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Cell:</Text>
            <Text className="text-lg">{selectedOrder.cell}</Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Address:</Text>
            <Text className="text-lg">{selectedOrder.address}</Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Comments:</Text>
            <Text className="text-lg">{selectedOrder.comments}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Piko:</Text>
            <Text className="text-lg">{selectedOrder.piko}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Top:</Text>
            <Text className="text-lg">{selectedOrder.Top}</Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Dupatta:</Text>
            <Text className="text-lg">{selectedOrder.Dupatta}</Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Embroidery:</Text>
            <Text className="text-lg">{selectedOrder.Embroidery}</Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between items-center">
            <Text className="text-lg">Samples:</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={{uri: selectedOrder.sample}}
                className="w-36 h-36"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg">Total:</Text>
            <Text className="text-lg">{selectedOrder.total}Rs/-</Text>
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <ImageViewer
          imageUrls={[{url: selectedOrder.sample}]}
          enableSwipeDown
          onSwipeDown={toggleModal}
        />
        <Button title="Close" onPress={toggleModal} />
      </Modal>
    </View>
  );
};

export default LadiesOrderInfo;
