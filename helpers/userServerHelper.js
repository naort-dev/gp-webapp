import { cookies } from 'next/headers';

export const getServerToken = () => {
  const nextCookies = cookies();
  const cookie = nextCookies.get('token');
  const impersonateCookie = nextCookies.get('impersonateToken');
  if (impersonateCookie?.value) {
    return impersonateCookie.value;
  } else if (cookie?.value) {
    return cookie.value;
  }
  return false;
};

export const getServerUser = () => {
  const nextCookies = cookies();
  const cookie = nextCookies.get('user');
  const impersonateCookie = nextCookies.get('impersonateUser');
  if (impersonateCookie?.value) {
    return JSON.parse(impersonateCookie.value);
  } else if (cookie?.value) {
    return JSON.parse(cookie.value);
  }
  return false;
};
