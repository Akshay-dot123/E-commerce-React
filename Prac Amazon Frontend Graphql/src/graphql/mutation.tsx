import { gql } from "@apollo/client";

export const CREATE_CART= gql`
  mutation CreateCart($createCartInput: CreateCartInput!) {
    createCart(createCartInput: $createCartInput) 
    {
      id
      product{
        id
      }
    }
  }
`;

export const CREATE_PROFILE= gql`
     # ❗ Mutation name can be anything, $userInputForProfile must match with variable named described in frontend graphql, CreateUserProfileInput must match backend schema
  mutation MakeNewProfile($userInputForProfile: CreateUserProfileInput!) {
     # ❗ createUsersProfile must match with name of backend mutation resolver function name, inputArgName must match @Args('inputArgName') which is defined in backend
    createUsersProfile(inputArgName: $userInputForProfile) 
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