export const API_ROUTES = {
  AUTH: {
    RESEND_EMAIL: '/auth/verify/resend',
    SIGN_IN: '/auth/signin',
    REGISTER: '/auth/signup',
    VERIFY_USER: '/auth/verify',
  },
  PRODUCT: {
    ADD_PRODUCT: '/mst/m-products',
    GET_PRODUCT: '/mst/m-product/by-query',
    GET_CATEGORY: '/mst/m-categories',
    CREATE_CATEGORY: '/mst/m-categories',
  },
  PROMO: {
    GET_NEWS_PROMO: '/mst/m-news-offer',
  }
};
