"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import {signIn, useSession} from "next-auth/react";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import {createContext, useContext, useEffect, useState} from "react";
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
      ?.map((product) => ({ ...product, quantity: 1 }));

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
      createAlert("warning", "You need to login first!", { timeout: 3000 });
      setTimeout(() => {
        signIn().then(() => {
          // Handle post sign-in actions if needed
        });
      }, 2000)
      return;
    }

    const { id: currentId, title: currentTitle } = currentProduct;

    const modifyableProduct = wishlistProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );

    const isAlreadyExist = !!modifyableProduct;

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

  const isProductInWishlist = (currentProduct) => {
    const modifyableProduct = wishlistProducts?.find(
      ({ id, title }) => id === currentProduct.id && title === currentProduct.title
    );

    return !!modifyableProduct;
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlistProducts,
        setWishlistProducts,
        addProductToWishlist,
        deleteProductFromWishlist,
        wishlistStatus,
        isProductInWishlist
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
export const useWishlistContext = () => {
  return useContext(wishlistContext);
};
export default WishlistContextProvider;
