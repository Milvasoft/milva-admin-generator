export function getCookie(name: string) {

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

}

export function setCookie(name: string, value: string, expires?: Date) {

  if (expires === undefined) {

    expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
  
  }

  const path = process.env.NEXT_PUBLIC_BASE_PATH;
  
  document.cookie = `${name}=${value}; Path=${path}; Expires=${expires.toUTCString()};`;

}

export function removeCookie(name: string) {

  const path = process.env.NEXT_PUBLIC_BASE_PATH;

  document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

}

export function checkACookieExists(name: string) {

  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith(name));

}

export function checkCookieHasASpecificValue(name: string, value: string) {

  return document.cookie.split(';').some((item) => item === `${name}=${value}`);

}
