"use client";
import {signIn, useSession} from "next-auth/react";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import {createContext, useContext, useEffect, useState} from "react";


const demoProducts = [];
const cartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { data: session } = useSession(); // Cek status login
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const createAlert = useSweetAlert();

  useEffect(() => {
    const cartProductFromLocalStorage = getItemsFromLocalstorage("cart");

    if (!cartProductFromLocalStorage) {
      setCartProducts(demoProducts);
      addItemsToLocalstorage("cart", demoProducts);
    } else [setCartProducts(cartProductFromLocalStorage)];
  }, []);

  // add  product = localstorage cart
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
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

    const modifyableProduct = cartProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );
    const previousQuantity = modifyableProduct?.quantity;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts;
    if (isTotalQuantity) {
      currentProducts = cartProducts?.map((product) =>
        product.id === currentId &&
        product?.title === currentTitle &&
        isTotalQuantity
          ? {
              ...product,
              quantity: currentProduct.quantity,
            }
          : product
      );

      if (previousQuantity < currentQuantity) {
        // createAlert("success", "Success! Quantity increased.");
        setCartStatus("incresed");
      } else if (previousQuantity > currentQuantity) {
        // createAlert("success", "Success! Quantity decreased.");
        setCartStatus("decreased");
      }
    } else {
      const isAlreadyExist = !!modifyableProduct;

      if (isAlreadyExist) {
        currentProducts = cartProducts?.map((product) =>
          product.id === currentId &&
          product?.title === currentTitle &&
          isDecreament
            ? {
                ...product,
                quantity: product.quantity - currentProduct?.quantity,
              }
            : product.id === currentId && product?.title === currentTitle
            ? {
                ...product,
                quantity: product.quantity + currentProduct?.quantity,
              }
            : product
        );
        if (isDecreament) {
          // createAlert("success", "Success! Quantity decreased.");
          setCartStatus("decreased");
        } else {
          // createAlert("success", "Success! Quantity increased.");
          setCartStatus("increased");
        }
      } else {
        currentProducts = [...cartProducts, currentProduct];

        // createAlert("success", "Success! added to cart.");
        setCartStatus("added");
      }
    }
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
  };

  // delete product = localstorage cart
  const deleteProductFromCart = (currentId, currentTitle) => {
    if (!session) {
      createAlert("warning", "You need to login first!");
      signIn();
      return;
    }

    const currentProducts = cartProducts?.filter(
      ({ id, title }) => id !== currentId || title !== currentTitle
    );
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
    createAlert("success", "Success! deleted from cart.");
    setCartStatus("deleted");
  };
  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        cartStatus,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(cartContext);
};
export default CartContextProvider;
