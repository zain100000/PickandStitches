import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const GentsOrders = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);  

  const getApiData = async () => {
    const url =
      'https://pickandstitches.com/font-awesome/scss/scss/api_male_orders.php?' +
      Date.now();

    try {
      const response = await axios.get(url);
      const result = response.data;
      const dataWithStatus = result.map(order => ({
        ...order,
        status: 'Pending',
      }));

      setData(dataWithStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const newData = [...data];
    newData[index].status = newStatus;
    setData(newData);
  };

  const filterData = () => {
    return data.filter(
      item => item.name.includes(searchText) || item.cell.includes(searchText),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    // Fetch new data from the API
    try {
      const response = await axios.get(
        'https://pickandstitches.com/font-awesome/scss/scss/api_male_orders.php?' +
          Date.now(),
      );

      const result = response.data;
      const dataWithStatus = result.map(order => ({
        ...order,
        status: 'Pending',
      }));

      setData(dataWithStatus);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row">
        <TextInput
          placeholder="Search by name or cell number"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          className="border-b-2 border-b-gray-400 w-full"
        />
      </View>

      <View className="flex-row justify-between items-center p-5 border-b-2 border-b-gray-400">
        <Text className="text-dark font-semibold">Name:</Text>
        <Text className="text-dark font-semibold">Cell:</Text>
        <Text className="text-dark font-semibold">Address:</Text>
        <Text className="text-dark font-semibold">Status:</Text>
        <Text className="text-dark font-semibold">Action:</Text>
      </View>

      {filterData().length ? (
        <FlatList
          data={filterData()}
          renderItem={({item, index}) => (
            <View className="flex-row justify-between items-center p-5 border-b-2 border-b-gray-400">
              <View className="w-16">
                <Text>{item.name}</Text>
              </View>
              <View className="w-16">
                <Text>{item.cell}</Text>
              </View>
              <View className="w-16">
                <Text>{item.adress}</Text>
              </View>
              <View className="w-16">
                <Text>{item.status}</Text>
              </View>
              <View className="w-16 flex-row justify-between">
                <TouchableOpacity
                  onPress={() => handleStatusChange(index, 'received')}>
                  <FontAwesome5 name="inbox" size={25} color={'blue'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleStatusChange(index, 'delivered')}>
                  <FontAwesome5 name="shipping-fast" size={25} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-gray-600">No Gents Orders Yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GentsOrders;
