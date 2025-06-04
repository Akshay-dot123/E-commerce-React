import { gql } from "@apollo/client";

export const FIND_ALL_PRODUCTS = gql`
  query FindAllProducts {
    findAllProduct {
      id
      name
      description
      price
      link
      promoted
      category
    }
  }
`;
export const FIND_ALL_CART_PRODUCTS = gql`
  query FindAllCartProducts {
    findAllCartProduct {
      id
      quantity
      product {
        id
        name
        description
        price
        link
        promoted
        category
      }
    }
  }
`;