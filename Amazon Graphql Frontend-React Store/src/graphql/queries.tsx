import { gql } from "@apollo/client";

export const FIND_ALL_PRODUCTS = gql`
  query FindAllProducts {
    findAllProduct {
      id
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
        description
        price
        link
        promoted
        category
      }
    }
  }
`;

export const FIND_PRODUCT_BY_ID = gql`
  query findProductById($id: Int!) {
    findProductById(id: $id) {
      id
      description
      price
      link
      promoted
      category
    }
  }
`;