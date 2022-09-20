export const getPrice = (prices, currency) => {
  const price = prices
    ? prices.find(
        (price) => JSON.stringify(price.currency) === JSON.stringify(currency)
      ).amount
    : 0;
  return `${currency.symbol}${price}`;
};
