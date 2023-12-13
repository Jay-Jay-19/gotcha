import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { removeFromBasket } from '../features/basketSlice';

const BasketScreen = () => {
  
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);
  const deliveryFee = 5.99;
  const serviceFee = 2.99;

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#004aad] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Panier</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full absolute top-3 right-5"
          >
            <XCircleIcon color="#004aad" height={35} width={35}/>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={require("./gotcha_logo.png")}
            className='h-10 w-10 p-4 rounded-full'
          />
          <Text className="flex-1">Livré dans 30 à 45 min</Text>
          <TouchableOpacity>
            <Text className="text-[#004aad]">Changer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#004aad]">{items.length} x </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"   
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(items[0]?.price)}
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#004aad] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Sous-total</Text>
            <Text className="text-gray-400">
              {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basketTotal)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Frais de livraison</Text>
            <Text className="text-gray-400">
              {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(deliveryFee)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Frais de service</Text>
            <Text className="text-gray-400">
              {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(serviceFee)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-extrabold">Total de la commande</Text>
            <Text className="font-extrabold">
              {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(basketTotal+deliveryFee+serviceFee)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#ff3131] p-4"
            >
              <Text className="text-center text-white text-lg font-bold">Commander</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
};

export default BasketScreen