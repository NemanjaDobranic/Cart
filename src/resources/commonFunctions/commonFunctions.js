export const getPrice = (prices, currency) => {
  const price = prices
    ? prices.find(
        (price) => JSON.stringify(price.currency) === JSON.stringify(currency)
      ).amount
    : 0;
  return `${currency.symbol}${Math.round(price * 100) / 100}`;
};

/**
 * Returns the index of the first product in products array
 * that matches to product passed together with products array
 * where both have same selected items in all product attributes or
 * with same product ids if product doesn't have attributes
 * @param {object} product
 * @param {Array} products
 * @returns non negative index if criteria is satisfied or -1
 */
export const findSameProductIndex = (product, products) =>
  products.findIndex((p1) =>
    p1.attributes.length > 0 && product.attributes.length > 0
      ? p1.attributes.every((a1) =>
          product.attributes.find(
            (a2) =>
              a1.id === a2.id &&
              JSON.stringify(a1.selectedItem) ===
                JSON.stringify(a2.selectedItem)
          )
        )
      : p1.id === product.id
  );

  /**
   * Recalculates amount property for each totalPrice object in totalPrices 
   * array based on amount property found in prices object array. 
   * By deafult, third argument is set to true and addition is done. 
   * Otherwise, to do the subtraction pass false as third argument.
   * @param {Array} prices 
   * @param {Array} totalPrices 
   * @param {boolean} addition 
   * @returns 
   */
export const recalculateTotalPrices = (prices, totalPrices, addition = true) =>
  totalPrices.map((totalPrice) => {
    const price = prices.find(
      (price) =>
        JSON.stringify(totalPrice.currency) === JSON.stringify(price.currency)
    );
    return {
      ...totalPrice,
      amount: addition
        ? totalPrice.amount + price.amount
        : totalPrice.amount - price.amount,
    };
  });
