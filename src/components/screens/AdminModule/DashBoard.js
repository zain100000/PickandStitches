import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {format} from 'date-fns';
import {BarChart} from 'react-native-chart-kit';

const DashBoard = () => {
  // Get the current date
  const currentDate = new Date();

  // Format the date in the desired format
  const formattedDate = format(currentDate, 'dd-MMMM-yyyy');

  // Sample data for orders
  const orderData = {
    labels: ['Received', 'Delivered', 'Pending'],
    datasets: [
      {
        data: [100, 80, 20], // Replace with your actual data
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <View className="flex-row top-2">
        <Text
          className="text-center text-lg text-dark right-2"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Current Day:
        </Text>
        <Text
          className="text-center text-lg text-ternary"
          style={{fontFamily: 'Montserrat-Bold'}}>
          {formattedDate}
        </Text>
      </View>

      <View className="w-96 items-center p-6 mt-10 shadow-md shadow-gray-400">
        <Text
          className="text-lg text-[#8B0000]"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Welcome Back Admin
        </Text>
      </View>

      <View className="p-10">
        <Text
          className="text-lg text-[#8B0000] left-5"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Order Analysis
        </Text>
        <BarChart
          data={orderData}
          width={400}
          height={200}
          yAxisSuffix=" orders"
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#f5f5f5',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          className="p-5"
        />
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;
