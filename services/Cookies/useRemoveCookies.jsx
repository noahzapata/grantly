import Cookies from 'js-cookie';

const RemoveCookies = key => {
  Cookies.remove(key);
};
export default RemoveCookies;
