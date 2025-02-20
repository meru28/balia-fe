"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useSession, signIn } from "next-auth/react";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import getAllProducts from "@/libs/getAllProducts";

const wishlistContext = createContext(null);
const WishlistContextProvider = ({ children }) => {
  const { data: session } = useSession(); // Cek status login
  const [wishlistStatus, setWishlistStatus] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const createAlert = useSweetAlert();
  useEffect(() => {
    const demoProducts = getAllProducts()
      ?.slice(0, 0)
      ?.map((product, idx) => ({ ...product, quantity: 1 }));

    const wishlistProductFromLocalStorage =
      getItemsFromLocalstorage("wishlist");

    if (!wishlistProductFromLocalStorage) {
      setWishlistProducts(demoProducts);
      addItemsToLocalstorage("wishlist", demoProducts);
    } else [setWishlistProducts(wishlistProductFromLocalStorage)];
  }, []);
  // add  product from localstorage cart
  const addProductToWishlist = (currentProduct) => {
    if (!session) {
      createAlert("warning", "You need to login first!");
      signIn(); // Arahkan ke halaman login
      return;
    }

    const { id: currentId, title: currentTitle } = currentProduct;

    const modifyableProduct = wishlistProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );

    const isAlreadyExist = modifyableProduct ? true : false;

    if (isAlreadyExist) {
      // createAlert("error", "Failed ! Already exist in wishlist.");
      setWishlistStatus("exist");
    } else {
      let currentProducts = [...wishlistProducts, currentProduct];
      setWishlistProducts(currentProducts);
      addItemsToLocalstorage("wishlist", currentProducts);
      // createAlert("success", "Success! added to wishlist.");
      setWishlistStatus("added");
    }
  };

  // delete product from localstorage cart
  const deleteProductFromWishlist = (currentId, currentTitle) => {
    if (!session) {
      createAlert("warning", "You need to login first!");
      signIn(); // Arahkan ke halaman login
      return;
    }

    const currentProducts = wishlistProducts?.filter(
      ({ id, title }) => id !== currentId || title !== currentTitle
    );
    setWishlistProducts(currentProducts);
    addItemsToLocalstorage("wishlist", currentProducts);
    createAlert("success", "Success! deleted from wishlist.");
    setWishlistStatus("deleted");
  };
  return (
    <wishlistContext.Provider
      value={{
        wishlistProducts,
        setWishlistProducts,
        addProductToWishlist,
        deleteProductFromWishlist,
        wishlistStatus,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
export const useWishlistContext = () => {
  const value = useContext(wishlistContext);
  return value;
};
export default WishlistContextProvider;
