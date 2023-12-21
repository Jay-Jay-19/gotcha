import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Le produit (id: ${action.payload.id}) ne peut pas être supprimé car il n'est pas dans le panier !`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Création d'un sélecteur qui permet d'accéder au store et prendre les infos contenues dans un slice.
// Ici on veut récupérer les items du slice "Basket", donc les items du panier.
export const selectBasketItems = (state) => state.basket.items;

// Création d'un sélecteur qui permet d'accéder au store et prendre les infos contenues dans un slice.
// Ici on veut récupérer les items du slice "Basket" dont l'ID correspond à celui qu'on spécifie.
export const selectBasketItemsWithId = (state, id) => 
  state.basket.items.filter((item) => item.id === id);

// Ce sélecteur permet d'avoir le prix total du panier. Il utilise la methode reduce qui parcourt l'array d'items,
// et accumule le prix de chaque item à chaque itération.
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;