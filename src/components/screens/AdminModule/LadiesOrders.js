import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LadiesOrders = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const getApiData = async () => {
    const url =
      'http://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?' +
      Date.now();

    try {
      const response = await axios.get(url);
      // Assuming the response data is an array
      const result = response.data;

      // Set the initial status to "Pending" for each order
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
    // Filter data based on search text
    return data.filter(
      item => item.name.includes(searchText) || item.cell.includes(searchText),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    // Fetch new data from the API
    try {
      const response = await axios.get(
        'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?' +
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

  const handleViewOrderDetails = selectedOrder => {
    navigation.navigate('LadiesOrderInfo', {selectedOrder});
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Search Bar */}
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
                <Text>{item.address}</Text>
              </View>
              <View className="w-16">
                <Text>{item.status}</Text>
              </View>
              <View className="w-16 flex-row justify-between flex-wrap">
                <TouchableOpacity
                  onPress={() => handleStatusChange(index, 'received')}>
                  <FontAwesome5 name="inbox" size={25} color={'blue'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleStatusChange(index, 'delivered')}>
                  <FontAwesome5 name="shipping-fast" size={25} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleViewOrderDetails(item)}>
                  <FontAwesome5 name="eye" size={25} color={'#000'} />
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
          <Text className="text-xl text-gray-600">No Ladies Orders Yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LadiesOrders;
