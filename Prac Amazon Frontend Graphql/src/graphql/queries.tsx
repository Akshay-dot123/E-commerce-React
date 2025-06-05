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

// Still not setup
// export const GET_PROFILE = gql`
//   query GetProfile {
//     profile {
//       id
//     }
//   }
// `;
