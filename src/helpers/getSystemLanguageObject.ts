export default function getSystemLanguageObject(list: any[]) {

  const obj: any = {};

  list?.forEach((item) => {

    obj[item?.systemLangugeId] = { ...item };

    delete obj[item?.systemLangugeId]?.systemLangugeId;

  });    

  return obj;

}
