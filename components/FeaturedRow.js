import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeaturedRow = ({ id, title, description }) => {

  const [restaurants, setRestaurants] = useState([]);

  // Le hook "useEffect" éxecute du code au moment où le composant fonctionnel (ce qui est différent de l'UI) est chargé.
  // Ici, au moment du chargement de la page, on lui dit de se connecter au backend Sanity et d'exécuter la requête.
  // La requête est de chercher dans le backend Sanity les restaurants classés dans la catégorie "À la une" et dont
  // l'ID est celle passée en paramètre de la fonction "FeaturedRow". Cette ID correspond à une des 3 catégories de "À la une",
  // soit "Offres près de chez vous", "À la une" et "Délicieuses promos"
  useEffect(() => {
    client.fetch(
      `
        *[_type == "featured" && _id == $id] {
          ...,
            restaurants[]->{
              ...,
                dishes[]->,
                  type->{
                    name
                  }
            },
        }[0]
      `,
      { id }
      // les données retournées vont servir à renseigner les restaurants qui vont figurer dans chaque section,
      // soit "Offres près de chez vous", "À la une", "Délicieuses promos".
    ).then(data => {
      setRestaurants(data?.restaurants);
    });
  }, [id]);

  return (
    <View>

      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#004AAD"/>
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;