import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {

  // Ce hook va nous permettre de faire apparaitre les icones + et - pour commander le plat lorsque qu'on
  // cliquera sur le plat.
  const [isPressed, setIsPressed] = useState(false);

  // Fonction qui permet de sélectionner les items du panier grâce à la fonction selectBasketItemsWithId
  // crée dans le slice Basket.
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const dispatch = useDispatch();

  // Fonction pour activer la fonction addToBasket crée dans le slice Basket et mettre à jour le store.
  // La fonction addToBasket aura en paramètres le payload, c'est-à-dire les infos qu'on veut faire passer et monitorer
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {

    // Si le panier ne contient aucun article, le code s'arrête ici, donc pas de possibilité de supprimer un item.
    // Bref, si le compteur d'item est à 0, appuyer sur le bouton "-" ne fera rien.
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}
      >
        <View className="flex-row">
            <View className="flex-1 pr-2">
              <Text className="text-lg mb-1" >{name}</Text>
              <Text className="text-gray-400">{description}</Text>
              <Text className="text-gray-400 mt-2">
                {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}
              </Text>
            </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#ffde59" : "lightgray"}
                size={40} />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#ffde59" size={40} /> 
            </TouchableOpacity>
          </View>
        </View>

      )}

    </>
  );
};

export default DishRow;