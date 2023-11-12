import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import LadiesItemContainer from '../../../othercomponents/LadiesProducts/LadiesItemContainer';
import LadiesShalwarSuit from '../../../../assets/women-products/ladies-shalwar-suit.jpg';
import LadiesTrouserSimple from '../../../../assets/women-products/ladies-trouser-suit.jpg';
import FrockSimple from '../../../../assets/women-products/frock-simple.jpg';
import DoubleSuitAndShalwar from '../../../../assets/women-products/double-suit&shalwar.jpg';
import DoubleSuitAndTrouser from '../../../../assets/women-products/double-suit&trouser.jpg';
import DoubleFrockDesign from '../../../../assets/women-products/double-frock-design.jpg';
import MaxiSuit from '../../../../assets/women-products/maxi-suit.jpg';
import ShariBlouse from '../../../../assets/women-products/sarhi-blouse.jpg';
import LehngaSet from '../../../../assets/women-products/lehnga-suit.jpg';
import LadiesShalwar from '../../../../assets/women-products/ladies-shalwar.jpg';
import LadiesKameez from '../../../../assets/women-products/ladies-kameez.png';
import LadiesKidsSuit from '../../../../assets/women-products/ladies-kids.jpg';
import DoubleKameez from '../../../../assets/women-products/double-kameez.jpg';
import LadiesAbaya from '../../../../assets/women-products/abaya.jpg';

const WomenProducts = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Items Start */}
        <LadiesItemContainer
          product="Ladies Shalwar Suit"
          product_pic={LadiesShalwarSuit}
          price={'1150'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Ladies Trouser Suit"
          product_pic={LadiesTrouserSimple}
          price={'1200'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Frock(Simple)"
          product_pic={FrockSimple}
          price={'1900'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Double Shuit & Shalwar"
          product_pic={DoubleSuitAndShalwar}
          price={'1600'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Double Suit & Trouser"
          product_pic={DoubleSuitAndTrouser}
          price={'1700'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Frock Double Design"
          product_pic={DoubleFrockDesign}
          price={'2700'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Maxi Suit"
          product_pic={MaxiSuit}
          price={'3000'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Sahri BLouse"
          product_pic={ShariBlouse}
          price={'3500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Lehnga Set"
          product_pic={LehngaSet}
          price={'5500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Ladies Shalwar"
          product_pic={LadiesShalwar}
          price={'500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Ladies Kameez"
          product_pic={LadiesKameez}
          price={'800'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Ladies Kids Suit"
          product_pic={LadiesKidsSuit}
          price={'800'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Double Kameez"
          product_pic={DoubleKameez}
          price={'1100'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          product="Abaya"
          product_pic={LadiesAbaya}
          price={'3000'}
          onwards={'Onwards'}
        />

        {/* Items End */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WomenProducts;
