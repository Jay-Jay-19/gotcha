import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';

const DeliveryScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#004AAD] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Aide sur la commande</Text>
        </View>

        <View className="bg-[#FFDE59] mx-5 my-2 rounded-md p-6 z-50 shadow-lg">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-[#004AAD]">Arrivée de la commande</Text>
              <Text className="text-4xl font-bold text-[#004AAD]">30-45 minutes</Text>
            </View>
            <Image
              source={require("../assets/scooter.gif")}
              className="h-16 w-16"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;