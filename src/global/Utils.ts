export const stringToNumber = (value: string): number => Number(value.replaceAll(',', ''));

export const numberDisplay = (value: string) => {
  const parsed = stringToNumber(value);
  return value === '' || isNaN(parsed) ? value : parsed.toLocaleString();
}

export const verifyNumber = (value: number) => isNaN(value) ? 0 : value;