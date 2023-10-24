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
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LadiesOrders = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getApiData = async () => {
    const url =
      'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?' +
      Date.now();

    try {
      const response = await axios.get(url);
      const result = response.data;
      setData(result);
      setIsLoading(false); // Set isLoading to false when data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set isLoading to false on error
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

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

  const handleSelectAll = () => {
    // Toggle the selectAll state
    setSelectAll(!selectAll);

    // Update the selection for all orders based on selectAll state
    const newData = data.map(order => ({
      ...order,
      selected: !selectAll, // Set selected to the opposite of selectAll
    }));
    setData(newData);
  };

  const handleSelectOrder = index => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected; // Toggle the selected state for the individual order
    setData(newData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity className="left-4">
          <FontAwesome5 name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search by name or cell number"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          className="border-2 border-gray-400 w-80 border-l-2 border-r-0 border-t-0"
        />
      </View>

      <View className="flex-row justify-between items-center p-5 border-b-2 border-b-gray-400">
        <TouchableOpacity onPress={handleSelectAll}>
          <FontAwesome5
            name={selectAll ? 'check-square' : 'square'}
            size={18}
            color={selectAll ? 'blue' : '#000'}
          />
        </TouchableOpacity>
        <Text className="text-dark font-semibold">Name:</Text>
        <Text className="text-dark font-semibold">Cell:</Text>
        <Text className="text-dark font-semibold">Address:</Text>
        <Text className="text-dark font-semibold">Action:</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View>
          {filterData().length ? (
            <FlatList
              data={filterData()}
              renderItem={({item, index}) => (
                <View className="flex-row justify-between items-center  p-5 border-b-2 border-b-gray-400">
                  <View className="w-14">
                    <TouchableOpacity onPress={() => handleSelectOrder(index)}>
                      <FontAwesome5
                        name={item.selected ? 'check-square' : 'square'}
                        size={18}
                        color={item.selected ? 'blue' : '#000'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="w-24">
                    <Text>{item.name}</Text>
                  </View>
                  <View className="w-20 right-5">
                    <Text>{item.cell}</Text>
                  </View>
                  <View className="w-16">
                    <Text>{item.address}</Text>
                  </View>
                  <View className="w-16 flex-row item-center justify-between flex-wrap left-5">
                    <TouchableOpacity
                      onPress={() => handleViewOrderDetails(item)}>
                      <FontAwesome5 name="eye" size={20} color={'#000'} />
                    </TouchableOpacity>

                    <TouchableOpacity className="right-2">
                      <FontAwesome5 name={'trash'} size={20} color={'red'} />
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
              <Text className="text-xl text-gray-600">
                No Ladies Orders Yet
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default LadiesOrders;
