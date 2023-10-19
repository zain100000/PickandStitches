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
          title="Shalwar Kameez (Simple)"
          imgSrc={ShalwarKameezSimple}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Shalwar Kameez (Cotton)"
          imgSrc={ShalwarKameezCotton}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Shalwar Kameez (Kurta)"
          imgSrc={ShalwarKameezKurta}
          price={'1500'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Shalwar Kameez (Khaddar)"
          imgSrc={ShalwarKameezKhaddar}
          price={'1600'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Shalwar Kameez (Karandi)"
          imgSrc={ShalwarKameezKarandi}
          price={'1800'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Shalwar Kameez (Silk)"
          imgSrc={ShalwarKameezSilk}
          price={'1800'}
          onwards={'Onwards'}
        />

        <GentsItemsContainer
          title="Gents Kids Suit"
          imgSrc={GentsKidsSuit}
          price={'1800'}
          onwards={'Onwards'}
        />

        {/* Items End */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenProducts;
