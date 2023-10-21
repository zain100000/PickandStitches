import React from 'react';
import {Image, Text, View} from 'react-native';

const LadiesOrderInfo = ({route}) => {
  const {selectedOrder} = route.params;

  return (
    <View style={{flex: 1}}>
      <Text>Product Name: {selectedOrder.product}</Text>
      <Text>Product Image: {selectedOrder.product_pic}</Text>
      <Image
        source={{uri: selectedOrder.product_pic}}
        style={{width: 300, height: 300}}
      />

      <Text>Name: {selectedOrder.name}</Text>
      <Text>id: {selectedOrder.product_id}</Text>
      <Text>Cell: {selectedOrder.cell}</Text>
      <Text>Address: {selectedOrder.adress}</Text>
      <Text>Full Top Piping: {selectedOrder.Full_top_piping}</Text>
      <Text>Wrist: {selectedOrder.wrist}</Text>
      <Text>puncha: {selectedOrder.puncha}</Text>
      <Text>embroidery: {selectedOrder.Embroidery}</Text>
      <Text>Tob_double_stitch: {selectedOrder.Tob_double_stitch}</Text>
      <Text>Comments: {selectedOrder.comments}</Text>
      <Text>Total: {selectedOrder.total}</Text>
    </View>
  );
};

export default LadiesOrderInfo;
