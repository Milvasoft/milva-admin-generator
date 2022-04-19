
export default function getCurrencyFormat(value?: number|string) : string {

  const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'TRY', });

  const newValue = formatter.format(Number(value || 0));

  const splitArray = newValue.split(',');

  if (splitArray[1] === '00') return splitArray[0];

  return newValue;

}
