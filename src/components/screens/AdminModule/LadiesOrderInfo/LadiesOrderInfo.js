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
            <Text className="text-lg text-black font-bold">Product Name:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.product}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Name:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.name}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Cell:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.cell}
            </Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Address:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.address}
            </Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Comments:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.comments}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Piko:</Text>
            <Text className="text-lg text-black font-bold left-4">
              {selectedOrder.piko}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Top:</Text>
            <Text className="text-lg text-black font-bold left-6">
              {selectedOrder.Top}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Dupatta:</Text>
            <Text className="text-lg text-black font-bold left-6">
              {selectedOrder.Dupatta}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold ">Embroidery:</Text>
            <Text className="text-lg text-black font-bold left-6">
              {selectedOrder.Embroidery}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold ">Product Price:</Text>
            <Text className="text-lg text-black font-bold left-0">
              {selectedOrder.product_price}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">
              Delivery Charges:
            </Text>
            <Text className="text-lg text-black font-bold">
              Rs.{selectedOrder.deliverycharges}
            </Text>
          </View>

          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between items-center">
            <Text className="text-lg text-black font-bold">Samples:</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={{uri: selectedOrder.sample}}
                className="w-36 h-36"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text className="text-lg text-black font-bold">Total:</Text>
            <Text className="text-lg text-black font-bold">
              {selectedOrder.total}Rs/-
            </Text>
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
