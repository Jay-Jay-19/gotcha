import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // La fonction useRoute() de react-navigation nous permet de récupérer les infos qui ont été passées en paramètres
  // dans la restaurant card au moment où on clique sur celle-ci.
  const {
    params: {
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
    },
  } = useRoute();

  // Le hook "useEffect" éxecute du code au moment où le composant fonctionnel (ce qui est différent de l'UI) est chargé.
  // Ici, au moment du chargement de la page, on capture toutes les infos du restaurant pour les mettre dans le store.
  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <>

    <BasketIcon />

      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-white rounded-full"
          >
            <ArrowLeftIcon size={20} color="#ff3131" />
          </TouchableOpacity>
        </View>
        
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="#ffbd59" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-blue-500">{rating}</Text>  •  {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                  <Text className="text-xs text-gray-500">Nearby  •  {address}</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4" >{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Allergènes
            </Text>
            <ChevronRightIcon color="#004aad" />
          </TouchableOpacity>
        </View>

        <View className="pb-40">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dishrows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              dish={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>

    </>
  )
};

export default RestaurantScreen;