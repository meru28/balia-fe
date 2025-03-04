"use client";
import controlModal from "@/libs/controlModal";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCommonContext } from "@/providers/CommonContext";
import moment from "moment";
const ProductDetailsRight = ({ product }) => {
  // destructure current product
  const { id, title, price, disc, size, color } = product;
  // current Date

  // hooks
  const value = useCommonContext();
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist, isProductInWishlist, deleteProductFromWishlist } = useWishlistContext();
  // dom referance
  const inputRef = useRef(null);
  // states
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentSize, setCurrentSize] = useState(size?.toUpperCase());
  const [purchaseDate, setPurchaseDate] = useState(null);
  // varriables
  const { type } = value ? value : {};
  const { netPrice } = countDiscount(price, disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const purchaseDateMilliseconds = moment(purchaseDate)?.valueOf();
  const productToSave = {
    ...product,
    color: currentColor,
    size: currentSize,
    quantity,
    purchaseDate: purchaseDateMilliseconds,
  };

  const isInWishlist = isProductInWishlist(product);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      deleteProductFromWishlist(id, title);
    } else {
      addProductToWishlist(productToSave);
    }
  };

// Function to set the selected size
  const handleSetSelectedSize = (size) => {
    setCurrentSize(size);
  };

  // useEffect(() => {
  //   const currentDate = Date.now();
  //   const calanderFormat = moment(currentDate).format("YYYY-MM-DD");
  //   setPurchaseDate(calanderFormat);
  //   const inputParent = inputRef.current;
  //   const input = inputParent.querySelector("input");
  //
  //   setTimeout(() => {
  //     const increament = inputParent.querySelector(".inc");
  //     const decreament = inputParent.querySelector(".dec");
  //     increament.addEventListener("click", () => {
  //       setQuantity(parseInt(input.value));
  //     });
  //     decreament.addEventListener("click", () => {
  //       setQuantity(parseInt(input.value));
  //     });
  //   }, 500);
  // }, []);
  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      {/* ratings */}
      {/*<div className="product-ratting">*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <Link href="#">*/}
      {/*        <i className="fas fa-star"></i>*/}
      {/*      </Link>*/}
      {/*    </li>{" "}*/}
      {/*    <li>*/}
      {/*      <Link href="#">*/}
      {/*        <i className="fas fa-star"></i>*/}
      {/*      </Link>*/}
      {/*    </li>{" "}*/}
      {/*    <li>*/}
      {/*      <Link href="#">*/}
      {/*        <i className="fas fa-star"></i>*/}
      {/*      </Link>*/}
      {/*    </li>{" "}*/}
      {/*    <li>*/}
      {/*      <Link href="#">*/}
      {/*        <i className="fas fa-star-half-alt"></i>*/}
      {/*      </Link>*/}
      {/*    </li>{" "}*/}
      {/*    <li>*/}
      {/*      <Link href="#">*/}
      {/*        <i className="far fa-star"></i>*/}
      {/*      </Link>*/}
      {/*    </li>{" "}*/}
      {/*    <li className="review-total">*/}
      {/*      <Link href="#"> ( {modifyNumber(reviewsLength)} Reviews )</Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
      {/* title */}
      <h3>{title}</h3>
      {/* price */}
      <div className="product-price text-nowrap">
        <span>${netPriceModified}</span> <del>${priceModified}</del>
      </div>
      {/* description */}

      {/* category, availability */}
      <div className={`modal-product-meta ltn__product-details-menu-1  `}>
        <ul>
          <li
            onClick={() => {
              !type ? controlModal() : "";
            }}
          >
            <strong>Categories:</strong>{" "}
            <span>
              <Link href="/shop?category=fruits">Fashion</Link>{" "}
              <Link href="/shop?category=meat">Fashion 22</Link>{" "}
              <Link href="/shop?category=fish">Women</Link>{" "}
              <Link href="/shop?category=fried">New Arrival</Link>
            </span>
          </li>
        </ul>
      </div>
      {/* countdown */}
      
      {/* size selection */}
      <div className="space-y-2">
        <h5 className="text-lg font-semibold">Available Sizes:</h5>
        <div className="flex gap-2">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSetSelectedSize(size)}
              className={`tw-px-4 tw-py-2 tw-transition tw-border tw-border-black ${
                currentSize === size
                  ? "tw-bg-gray-900 tw-text-white"
                  : "tw-bg-white tw-text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* add to cart */}
      <div className="ltn__product-details-menu-2">
        <ul>
          <li>
            <div className="cart-plus-minus" ref={inputRef}>
              <input
                onChange={(e) =>
                  setQuantity(
                    !parseInt(e.target.value) ? 1 : parseInt(e.target.value)
                  )
                }
                type="text"
                value={quantity}
                name="qtybutton"
                className="cart-plus-minus-box"
              />
            </div>
          </li>{" "}
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToCart(productToSave);
              }}
              href="#"
              className="theme-btn-1 btn btn-effect-1"
              title="Add to Cart"
              data-bs-toggle="modal"
              data-bs-target="#add_to_cart_modal"
            >
              <i className="fas fa-shopping-cart"></i> <span>ADD TO CART</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* add to wishlist and compare */}
      <div className="ltn__product-details-menu-3">
        <ul>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle();
              }}
              href="#"
              className=""
              title="Wishlist"
              data-bs-toggle="modal"
              data-bs-target="#liton_wishlist_modal"
            >
              <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart`}
                 style={{ color: isInWishlist ? '#ff0000' : 'inherit' }}
              />
              <span>
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </span>
            </Link>
          </li>{" "}
        </ul>
      </div>
      <hr />
      {/* socials */}
      <div className="ltn__social-media">
        <ul>
          <li>Share:</li>{" "}
          <li>
            <Link href="https://www.facebook.com" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://x.com" title="Twitter">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.linkedin.com" title="Linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.instagram.com" title="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </div>
      {/* checkout image */}
      {type ? (
        <>
          <hr />
          <div className="ltn__safe-checkout">
            <h5>Guaranteed Safe Checkout</h5>
            <Image
              src="/img/icons/payment-2.png"
              alt="Payment Image"
              height={35}
              width={350}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetailsRight;
