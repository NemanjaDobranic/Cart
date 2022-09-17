import { gql } from "apollo-boost";

const getCategoriesAndCurrenciesQuery = gql`
  {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

const getProductsQuery = gql`
  query ($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const getProductQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export { getCategoriesAndCurrenciesQuery, getProductsQuery, getProductQuery };
