import Cookies from 'js-cookie';

const GetCookies = key => {
  return Cookies.get(key);
};
export default GetCookies;
