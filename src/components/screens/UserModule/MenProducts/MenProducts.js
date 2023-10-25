import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import GentsItemsContainer from '../../../othercomponents/GentsProducts/GentsItemContainer';
import ShalwarKameezSimple from '../../../../assets/men-products/shalwar-kameez-simple.jpg';
import ShalwarKameezCotton from '../../../../assets/men-products/shalwar-kameez-cotton.jpg';
import ShalwarKameezKurta from '../../../../assets/men-products/shalwar-kameez-kurta.jpg';
import ShalwarKameezKhaddar from '../../../../assets/men-products/shalwar-kameez-khaddar.jpg';
import ShalwarKameezKarandi from '../../../../assets/men-products/shalwar-kameez-karandi.jpg';
import ShalwarKameezSilk from '../../../../assets/men-products/shalwar-kameez-silk.jpg';
import GentsKidsSuit from '../../../../assets/men-products/gents-kids.png';

const MenProducts = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Items Start */}
        <GentsItemsContainer
          product="Shalwar Kameez (Simple)"
          product_pic={ShalwarKameezSimple}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Shalwar Kameez (Cotton)"
          product_pic={ShalwarKameezCotton}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Shalwar Kameez (Kurta)"
          product_pic={ShalwarKameezKurta}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Shalwar Kameez (Khaddar)"
          product_pic={ShalwarKameezKhaddar}
          price={'1600'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Shalwar Kameez (Karandi)"
          product_pic={ShalwarKameezKarandi}
          price={'1800'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Shalwar Kameez (Silk)"
          product_pic={ShalwarKameezSilk}
          price={'1800'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          product="Gents Kids Suit"
          product_pic={GentsKidsSuit}
          price={'1800'}
          onwards={'Onwards'}
        />

        {/* Items End */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenProducts;
