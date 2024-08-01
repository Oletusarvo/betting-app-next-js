/**Converts an amount of currency from its fractions to full units. For example, a 100 subunits of a currency becomes 1. */
export function convertAmount(amount: number, fractions: number) {
  return amount / fractions;
}
