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
          title="Ladies Shalwar Suit"
          imgSrc={LadiesShalwarSuit}
          price={'1150'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Ladies Trouser Suit"
          imgSrc={LadiesTrouserSimple}
          price={'1200'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Frock(Simple)"
          imgSrc={FrockSimple}
          price={'1900'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Double Shuit & Shalwar"
          imgSrc={DoubleSuitAndShalwar}
          price={'1600'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Double Suit & Trouser"
          imgSrc={DoubleSuitAndTrouser}
          price={'1700'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Frock Double Design"
          imgSrc={DoubleFrockDesign}
          price={'2700'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Maxi Suit"
          imgSrc={MaxiSuit}
          price={'3000'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Sahri BLouse"
          imgSrc={ShariBlouse}
          price={'3500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Lehnga Set"
          imgSrc={LehngaSet}
          price={'5500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Ladies Shalwar"
          imgSrc={LadiesShalwar}
          price={'500'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Ladies Kameez"
          imgSrc={LadiesKameez}
          price={'800'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Ladies Kids Suit"
          imgSrc={LadiesKidsSuit}
          price={'800'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Double Kameez"
          imgSrc={DoubleKameez}
          price={'1100'}
          onwards={'Onwards'}
        />

        <LadiesItemContainer
          title="Abaya"
          imgSrc={LadiesAbaya}
          price={'3000'}
          onwards={'Onwards'}
        />

        {/* Items End */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WomenProducts;
