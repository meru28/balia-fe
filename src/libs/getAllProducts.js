import allProducts from "@/../public/fakedata/products.json";
import comments from "@/../public/fakedata/productComments.json";
import reviews from "@/../public/fakedata/productReviews.json";
const productImage1 = "/img/baju/1.webp";
const productImage2 = "/img/baju/2.webp";
const productImage3 = "/img/baju/3.webp";
const productImage4 = "/img/baju/4.webp";
const productImage5 = "/img/baju/5.webp";
const productImage6 = "/img/baju/6.webp";
const productImage7 = "/img/baju/7.webp";
const productImage8 = "/img/baju/8.webp";
const productImage9 = "/img/baju/9.webp";
const productImage10 = "/img/baju/10.webp";
const productImage11 = "/img/baju/11.webp";
const productImage12 = "/img/baju/12.webp";

const getAllProducts = () => {
  const images = [
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
    productImage7,
    productImage8,
    productImage9,
    productImage10,
    productImage11,
    productImage12,
    productImage6,
    productImage5,
    productImage4,
    productImage3,
    productImage2,
    productImage1,
    productImage12,
    productImage11,
    productImage10,
    productImage9,
    productImage8,
    productImage7,
    productImage6,
    productImage3,
    productImage5,
    productImage7,
    productImage9,
    productImage11,
    productImage2,
    productImage4,
    productImage6,
    productImage8,
    productImage10,
    productImage12,
    productImage1,
    productImage4,
    productImage7,
    productImage10,
    productImage2,
    productImage5,
    productImage8,
    productImage11,
    productImage3,
    productImage6,
    productImage9,
    productImage12,
    productImage4,
    productImage7,
    productImage10,
    productImage5,
    productImage8,
    productImage11,
    productImage6,
    productImage9,
    productImage12,
    productImage7,
    productImage10,
    productImage4,
  ];

  const products = [...allProducts]?.map((product, idx) => ({
    ...product,

    image: images[idx],
    comments: comments?.filter(({ productId }) => productId === product?.id),
    reviews: reviews?.filter(({ productId }) => productId === product?.id),
  }));

  return products;
};

export default getAllProducts;
