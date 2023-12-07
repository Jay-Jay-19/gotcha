import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
              type->{
                name
              }
          },
        }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={require("./gotcha_logo.png")}
          className='h-10 w-10 bg-gray-300 p-4 rounded-full'
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Livraison immédiate</Text>
          <Text className="font-bold text-xl">Position actuelle<ChevronDownIcon size={20} color="#004aad" />
          </Text>
        </View>

        <UserIcon size={35} color="#004aad" />
      </View>

      {/* Search */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder='Restaurants et cuisines'
            keyboardType='default'
          />
        </View>

        <AdjustmentsVerticalIcon color="#004aad" />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* À la une */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;