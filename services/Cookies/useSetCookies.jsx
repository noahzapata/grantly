import Cookies from 'js-cookie';

const SetCookies = (key, value) => {
  Cookies.set(key, value, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
  });
};

export default SetCookies;
