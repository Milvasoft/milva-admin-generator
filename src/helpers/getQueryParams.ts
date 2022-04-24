/* eslint-disable prefer-destructuring */
export type QueryObj = {
    [keys: string]: any;
  };

export default function getQueryParams(keys?: Array<string>) {

  const regex = /(\?|&)?([a-zA-Z0-9_]+)=([^&]+)/g;

  const matches = decodeURIComponent(window.location.search).matchAll(regex);

  const params: QueryObj = {};

  Array.from(matches).forEach((match) => {

    if (match.length === 4) {

      params[match[2]] = match[3];
    
    }
  
  });
  
  if (keys !== undefined) {

    const p: QueryObj = {};
    
    keys.forEach((key) => {

      if (Object.prototype.hasOwnProperty.call(params, key)) {

        p[key] = params[key];
      
      }
    
    });
    return p;
  
  }
  return params;

}
