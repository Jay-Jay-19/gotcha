import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import client, { urlFor } from '../sanity';

const Categories = () => {

  const [categories, setCategories] = useState([]);

  // Le hook "useEffect" éxecute du code au moment où le composant fonctionnel (ce qui est différent de l'UI) est chargé.
  // Ici, au moment du chargement de la page, on lui dit de se connecter au backend Sanity et d'exécuter la requête.
  // La requête est de chercher dans le backend Sanity tous ce qui est du type "category" ("types de cuisines" dans Sanity).
  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "category"]
        `
      // les données retournées vont servir à renseigner les catégories qui vont figurer dans la page d'accueil, en haut, juste dessous la barre de recherche.
      ).then((data) => {
          setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;