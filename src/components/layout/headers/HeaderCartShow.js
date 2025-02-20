import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HeaderCartShow = () => {
  const { data: session } = useSession(); // Cek status login
  const { headerStyle } = useHeaderContex();
  const { cartProducts } = useCartContext();

  // ✅ Jika belum login, sembunyikan total produk & harga

  const totalProduct = cartProducts?.length;
  const totalPrice = countTotalPrice(cartProducts);
  return (
    <>
      {totalProduct || totalProduct === 0 ? (
        <div
          className={`mini-cart-icon   ${
            headerStyle === 5 ? "mini-cart-icon-2" : ""
          }`}
        >
          <Link href="#ltn__utilize-cart-menu" className="ltn__utilize-toggle">
            <span className={headerStyle === 5 ? "mini-cart-icon" : ""}>
              <i className="icon-shopping-cart"></i> <sup>{session ? totalProduct : null}</sup>
            </span>
            {headerStyle === 5 ? (
              <h6>
                <span>Your Cart</span>{" "}
                <span className="ltn__secondary-color">
                  ${modifyAmount(session ? totalPrice : null)}
                </span>
              </h6>
            ) : (
              ""
            )}
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HeaderCartShow;
