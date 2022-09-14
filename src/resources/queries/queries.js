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

export { getCategoriesAndCurrenciesQuery };
