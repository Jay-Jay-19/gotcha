import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}
      <CategoryCard imgUrl='http://pizza-re.com/821.jpg.png' title='testing 1' />
      <CategoryCard imgUrl='https://www.demo-restaurant.com/medias/imgs/pix_shop2011/info_picto_2688.jpg' title='testing 2' />
      <CategoryCard imgUrl='https://bepxua.vn/wp-content/uploads/2022/05/cach-lam-sushi.jpg' title='testing 3' />
      <CategoryCard imgUrl='https://img.cuisineaz.com/400x400/2016/07/29/i113471-pates-a-la-carbonara.jpg' title='testing 4' />
      <CategoryCard imgUrl='https://assets.afcdn.com/recipe/20210112/117115_w300h200c1.jpg' title='testing 5' />
      <CategoryCard imgUrl='https://recette.supertoinette.com/151552/m/paella-facile.jpg' title='testing 6' />
      <CategoryCard imgUrl='https://www.vvsupremo.com/wp-content/uploads/2017/06/Chicken-Tacos-900x570-sRGB.jpg' title='testing 7' />
      <CategoryCard imgUrl='https://www.platetrecette.fr/wp-content/uploads/2020/09/Filets-de-poulet-au-curry-1068x670.jpg' title='testing 8' />




    </ScrollView>
  )
}

export default Categories;