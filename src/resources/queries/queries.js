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
        brand
        inStock
        gallery
        description
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

export { getCategoriesAndCurrenciesQuery, getProductsQuery };
