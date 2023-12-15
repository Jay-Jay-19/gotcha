import { View, Text, TouchableOpacity, Image, } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-white flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <Text className="font-light text-lg">Aide sur la commande</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="#004AAD" size={30} />
          </TouchableOpacity>
        </View>

        <View className="bg-[#004AAD] mx-5 my-2 rounded-md p-6 z-50 shadow-lg">

          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-white">Arrivée de la commande</Text>
              <Text className="text-4xl font-bold text-[#FFDE59]">30-45 minutes</Text>
            </View>

            <Image
              source={require("../assets/scooter.gif")}
              className="h-20 w-16"
            />
          </View>

          <Progress.Bar size={30} color="lightgray" indeterminate={true}/>

          <Text className="mt-3 text-white italic">
            Votre commande chez {restaurant.title} est en cours de préparation.
          </Text>

        </View>
      </SafeAreaView>

        <MapView  
          initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          className="flex-1 -mt-10 z-0"
          mapType="mutedStandard"
        >
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier="origin"
            pinColor="00CCBB"
          />
        </MapView>
        
        <SafeAreaView className="bg-[#004AAD] flex-row items-center">
          <Image
            source={require("../assets/deliveryGuy.jpg")}
            className="h-12 w-12 rounded-full p-4 ml-5"
          />
        </SafeAreaView>


    </View>
  );
};

export default DeliveryScreen;