import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
        <FeaturedRow
          id="123"
          title="À la une"
          description="Placements produits pour les partenaires"
        />

        {/* Délicieuses Promos */}
        <FeaturedRow
          id="1234"
          title="Délicieuses Promos"
          description="Des promos pour tous les goûts !"
        />

        {/* Offres près de chez vous */}
        <FeaturedRow
          id="12345"
          title="Offres près de chez vous"
          description="Supportez les commerçants de votre quartier !"
        />

      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen;