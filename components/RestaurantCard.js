import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
      // Méthode qui permet de naviguer vers la page du "Restaurant" lorsqu'on clique sur la carte du restaurant.
      // En même temps, on fait passer les infos ID, imgURl, title, genre, etc... qui seront récupérées dans 
      // la page du restaurant grâce à la fonction UseRoute() de react-navigation.
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow rounded-lg"
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#ffbd59" opacity={0.7} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-blue-500">{rating}</Text>  •  {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.7} size={22} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;