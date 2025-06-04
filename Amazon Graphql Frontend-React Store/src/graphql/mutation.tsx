import { gql } from "@apollo/client";

export const CREATE_CART= gql`
  mutation CreateCart($createCartInput: CreateCartInput!) {
    createCart(createCartInput: $createCartInput) 
    {
      id
    }
  }
`;

export const ADD_ITEM_QUANTITY_CART = gql`
  mutation AddItemQuantityInCart($id: Int!) {
    addItemQuantityInCart(id: $id) {
      id
    }
  }
`;
export const REMOVE_ITEM_QUANTITY_CART = gql`
  mutation SubtractItemQuantityInCart($id: Int!) {
    subtractItemQuantityInCart(id: $id) {
      id
    }
  }
`;
export const DELETE_CART = gql`
  mutation DeleteCart($id: Int!) {
    deleteCart(id: $id) {
      id
    }
  }
`;