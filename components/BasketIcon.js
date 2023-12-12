import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity className="mx-4 bg-[#ff3131] p-4 rounded-lg flex-row items-center space-x-2">
        <Text className="text-[#ffde59] font-extrabold text-lg bg-[#004aad] py-1 px-3 rounded-sm">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">Voir le panier</Text>
        <Text className="text-lg text-[#004aad] font-extrabold">
          {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basketTotal)}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

export default BasketIcon;