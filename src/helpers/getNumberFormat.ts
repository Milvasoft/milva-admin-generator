export default function getNumberFormat(value?: number) {

  const newValue = Number(value || 0).toFixed(2);
  
  const splitArray = newValue.split('.');
  
  if (splitArray[1] === '00') return value;
  
  return newValue;
  
}
  
