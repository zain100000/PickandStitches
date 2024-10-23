import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../../constants/Constants';
import firestore from '@react-native-firebase/firestore';
import LadiesItemsContainer from '../../otherComponents/ladiesProducts/LadiesItemContainer';

const {width, height} = Dimensions.get('window');

const LadiesProducts = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const statusBarColor =
      colorScheme === 'dark' ? COLORS.darkColor : COLORS.primary;
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore()
        .collection('products')
        .where('category', '==', 'ladies')
        .get();

      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const nameOrder = [
        'Ladies Shalwar Suit',
        'Ladies Trouser Suit',
        'Frock (Simple)',
        'Double Suit & Shalwar',
        'Double Suit & Trouser',
        'Frock Double Design',
        'Maxi Suit',
        'Sahri Blouse',
        'Lehnga Set',
        'Ladies Shalwar',
        'Ladies Kameez',
        'Ladies Kids Suit',
        'Double Kameez',
        'Abaya',
      ];

      const sortedProducts = productsList.sort((a, b) => {
        const productA = (a.product || '').trim().toLowerCase();
        const productB = (b.product || '').trim().toLowerCase();

        const indexA = nameOrder
          .map(name => name.toLowerCase())
          .indexOf(productA);
        const indexB = nameOrder
          .map(name => name.toLowerCase())
          .indexOf(productB);

        return (
          (indexA === -1 ? nameOrder.length : indexA) -
          (indexB === -1 ? nameOrder.length : indexB)
        );
      });

      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products: ', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const renderProductItem = ({item}) => (
    <LadiesItemsContainer
      product_pic={item.image}
      product={item.product}
      price={item.price}
      onwards={'Onwards'}
    />
  );

  return (
    <SafeAreaView
      style={[
        styles.primaryContainer,
        {
          backgroundColor:
            colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
        },
      ]}>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor:
              colorScheme === 'dark' ? COLORS.darkColor : COLORS.white,
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={30}
            color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={colorScheme === 'dark' ? COLORS.primary : COLORS.primary}
          />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.noProductsContainer}>
              <Text
                style={[
                  styles.noProductsText,
                  {
                    color:
                      colorScheme === 'dark' ? COLORS.white : COLORS.darkColor,
                  },
                ]}>
                No Ladies Products Available!
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default LadiesProducts;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },

  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.05,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
  },

  listContainer: {
    paddingVertical: height * 0.03,
    marginTop: height * 0.1,
    flexGrow: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noProductsText: {
    fontSize: width * 0.05,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
});
