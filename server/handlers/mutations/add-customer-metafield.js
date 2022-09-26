import "isomorphic-fetch";
import { gql } from "apollo-boost";

export function CUSTOMER_UPDATE(id) {
  console.log("CUSTOMER ID", id)
  return gql`
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
}

export const addShopipointsToCustomer = async (client, id) => {
  return await client
    .mutate({
      mutation: CUSTOMER_UPDATE(id),
      variables: {
        input: {
          id,
          metafields: {
            namespace: "wallet",
            key: "total_shopipoints",
            value: "0",
            valueType: "INTEGER"
          }
        }
      }
    })
    .then((response) => {
      console.log('Add Shopipoints Response:', response.data)
      return response.data
    });
};
