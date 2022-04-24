/* eslint-disable eqeqeq */

type langList = {
    systemLanguageId?: any,
    [key: string]: any
}

export default function diffLang(baseList: langList[], newList:langList[]) {

  let diff = false;
 
  if (baseList?.length !== newList?.length) return true;
  
  const BreakException = {};

  try {

    newList?.forEach((item) => {

      const baseItem = baseList?.find((s) => Number(s.systemLanguageId) == Number(item.systemLanguageId));
    
      if (baseItem === undefined) throw BreakException;
      else {
          
        Object.keys(baseItem)?.forEach((basKey) => {

          if (basKey === 'id') return;

          if (baseItem[basKey] !== item[basKey]) throw BreakException;

        });
        
      }
    
    
    });
      
  } catch (e) {

    diff = true;
  
  }


  return diff;

} 
