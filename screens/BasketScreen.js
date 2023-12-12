import { View, Text, SafeAreaView } from 'react-native';;
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems } from '../features/basketSlice';

const BasketScreen = () => {
  
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView>
      <View>
        <View>
          <View>
            <Text className="text-lg font-bold text-center">Panier</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen