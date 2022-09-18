export const getPrice = (prices, currency) => {
  const price = prices.find(
    (price) => JSON.stringify(price.currency) === JSON.stringify(currency)
  );
  return `${price.currency.symbol} ${price.amount}`;
};


