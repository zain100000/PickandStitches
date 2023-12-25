import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LadiesOrders = () => {
  const [data, setData] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const navigation = useNavigation();

  const getApiData = async () => {
    const url =
      'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?' +
      Date.now();

    try {
      const response = await axios.get(url);
      const result = response.data;
      setData(result);
      setIsLoading(false);
      setShowLoader(false);
      setSelectAll(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const filterData = () => {
    return data.filter(
      item => item.name.includes(searchText) || item.cell.includes(searchText),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?' +
          Date.now(),
      );

      const result = response.data;
      setData(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

  const handleViewOrderDetails = selectedOrder => {
    navigation.navigate('LadiesOrderInfo', {selectedOrder});
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newData = data.map(order => ({
      ...order,
      selected: newSelectAll,
    }));
    setData(newData);
  };

  const handleSelectOrder = index => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected;
    setData(newData);
  };

  const handleDeleteOrder = async () => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete selected orders?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setDeleting(true);

            const selectedIds = data
              .filter(order => order.selected)
              .map(order => order.id);

            if (selectedIds.length === 0) {
              setDeleting(false);
              return; // No orders selected to delete
            }

            try {
              const response = await axios.delete(
                'https://pickandstitches.com/font-awesome/scss/scss/api_female_orders.php?delete_order=' +
                  selectedIds.join(','),
              );

              if (response.status === 200) {
                const newData = data.filter(order => !order.selected);
                setData(newData);
                setDeleting(false);
                // Show success message
                Alert.alert(
                  'Success',
                  'Selected orders have been deleted successfully',
                );
              } else {
                console.error(
                  'Error deleting orders from API:',
                  response.statusText,
                );
                setDeleting(false);
              }
            } catch (error) {
              console.error('Error deleting orders from API:', error);
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  function formatDate(dateString) {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDate;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={item => handleDeleteOrder(item.id)}
          className="left-4">
          <FontAwesome5 name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search by name or cell number"
          value={searchText}
          placeholderTextColor={'#00bcd4'}
          onChangeText={text => setSearchText(text)}
          className="border-2 border-gray-400 w-80 border-l-2 border-r-0 border-t-0 p-2 text-primary "
          style={{fontFamily: 'Montserrat-SemiBold'}}
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
        <Text
          className="text-dark left-2"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          Name
        </Text>
        <Text
          className="text-dark left-3"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          Cell
        </Text>
        <Text
          className="text-dark left-5"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          Address
        </Text>
        <Text
          className="text-dark left-6"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          Time
        </Text>
        <Text
          className="text-dark left-4"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          Action
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <FlatList
          data={filterData()}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <View className="flex-row justify-between items-center p-5 border-b-2 border-b-gray-400">
              <View className="w-14">
                <TouchableOpacity onPress={() => handleSelectOrder(index)}>
                  <FontAwesome5
                    name={item.selected ? 'check-square' : 'square'}
                    size={18}
                    color={item.selected ? 'blue' : '#000'}
                  />
                </TouchableOpacity>
              </View>
              <View className="w-20 right-2">
                <Text
                  className="text-black text-md"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.name}
                </Text>
              </View>
              <View className="w-16 right-2">
                <Text
                  className="text-black text-md"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.cell}
                </Text>
              </View>
              <View className="w-16 left-2">
                <Text
                  className="text-black text-md"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.address}
                </Text>
              </View>
              <View className="w-16 left-5">
                <Text
                  className="text-black text-md"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.time}
                  {'\n'}
                  {'\n'}
                  <Text
                    className="text-black text-md"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    {formatDate(item.date)}
                  </Text>
                </Text>
              </View>
              <View className="w-16 flex-row item-center justify-between flex-wrap left-4">
                <TouchableOpacity onPress={() => handleViewOrderDetails(item)}>
                  <FontAwesome5 name="eye" size={20} color={'#000'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeleteOrder(item.id)}
                  className="right-5">
                  <FontAwesome5 name={'trash'} size={20} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {showLoader && isLoading && !data.length && (
          <ActivityIndicator
            size="large"
            color="blue"
            className="flex-1 justify-center items-center -translate-y-36"
          />
        )}
        {!showLoader && !data.length && !isLoading && (
          <Text
            className="flex-1 text-center text-xl text-gray-600"
            style={{fontFamily: 'Montserrat-SemiBold'}}>
            No Ladies Orders Yet
          </Text>
        )}
      </View>

      {deleting && (
        <ActivityIndicator
          size="large"
          color="blue"
          className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-opacity-50 bg-white"
        />
      )}
    </SafeAreaView>
  );
};

export default LadiesOrders;
