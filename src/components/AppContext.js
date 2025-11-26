'use client';
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.price;
  if (cartProduct.size) {
    price += cartProduct.size.extraPrice;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.extraPrice;
    }
  }
  return price;
}


export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const localStorage =
    typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')) {
      setCartProducts(JSON.parse(localStorage.getItem('cart')));
    }
  }, [localStorage]);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartItem(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed successfully.');
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts,
        addToCart, removeCartItem, clearCart,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}