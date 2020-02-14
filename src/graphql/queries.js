/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCountryFoodSales = `query GetCountryFoodSales($id: ID!) {
  getCountryFoodSales(id: $id) {
    id
    countryCode
    donutSales
    kebabSales
    sandwichSales
    burgerSales
    hotdogSales
  }
}
`;
export const listCountryFoodSaless = `query ListCountryFoodSaless(
  $filter: ModelCountryFoodSalesFilterInput
  $limit: Int
  $nextToken: String
) {
  listCountryFoodSaless(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      countryCode
      donutSales
      kebabSales
      sandwichSales
      burgerSales
      hotdogSales
    }
    nextToken
  }
}
`;
export const getTalk = `query GetTalk($id: ID!) {
  getTalk(id: $id) {
    id
    name
    description
    speakerName
  }
}
`;
export const listTalks = `query ListTalks(
  $filter: ModelTalkFilterInput
  $limit: Int
  $nextToken: String
) {
  listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      speakerName
    }
    nextToken
  }
}
`;
