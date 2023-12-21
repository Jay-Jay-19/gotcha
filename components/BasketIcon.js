import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketIcon = () => {
  // Fonction qui permet d'accéder à la fonction SelectBasketItems crée dans le slice Basket. Bref, pour avoir les items du panier.
  const items = useSelector(selectBasketItems);

  const navigation = useNavigation();

  // Fonction qui permet d'accéder à la fonction SelectBasketTotal crée dans le slice Basket pour avoir le total du panier.
  const basketTotal = useSelector(selectBasketTotal);

  // Si pas d'item dans le panier, ce composant n'apparaît pas.
  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-4 bg-[#ff3131] p-3 rounded-lg flex-row items-center space-x-2"
      >
        <Text className="text-[#ffde59] font-extrabold text-lg bg-[#004aad] py-0.5 px-2.5 rounded-full">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">Voir le panier</Text>
        <Text className="text-lg text-[#004aad] font-extrabold">
          {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basketTotal)}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

export default BasketIcon;