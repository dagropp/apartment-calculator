const _calculateTax = (cost: number) => {
  const NO_TAX = 1_805_545;
  const LOW_TAX = 336_060;
  const taxable = cost - NO_TAX;
  return Math.ceil(
    taxable <= 0 ? 0 : taxable <= LOW_TAX ? taxable * 0.035 : LOW_TAX * 0.035 + (taxable - LOW_TAX) * 0.05
  );
};

export const buildCostObject = (cost: number, name: string,): CostObject => {

  const realtor = Math.ceil(cost * 0.02 * 1.17);
  const attorney = Math.ceil(cost * (0.01 / 3) * 1.17);
  const tax = _calculateTax(cost);
  const extras = realtor + attorney + tax;

  return {
    id: btoa(encodeURI(name)),
    name,
    initial: {title: 'עלות ראשונית', value: cost},
    realtor: {title: 'דמי תיווך', breakdown: '2% + מע"מ', value: realtor},
    attorney: {title: 'עו"ד', breakdown: '0.33% + מע"מ', value: attorney},
    tax: {title: 'מס רכישה', breakdown: 'לפי מדרגות מס', value: tax},
    extras: {title: 'סה"כ תוספות', value: extras},
    total: {title: 'סה"כ', value: extras + cost},
  };
}