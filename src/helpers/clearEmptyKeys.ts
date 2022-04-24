export default function clearEmptyKeys(obj: any): any {

  return Object.fromEntries(
    Object.entries(obj)
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== 'null' && v !== null && v !== undefined && v !== ''
      )
      .map(([k, v]) => [k, v === Object(v) ? clearEmptyKeys(v) : v])
  );

}
