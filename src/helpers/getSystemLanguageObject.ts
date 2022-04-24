export default function getSystemLanguageObject(list: any[]) {

  const obj: any = {};

  list?.forEach((item) => {

    obj[item?.systemLanguageId] = { ...item };

    delete obj[item?.systemLanguageId]?.systemLanguageId;

  });    

  return obj;

}
