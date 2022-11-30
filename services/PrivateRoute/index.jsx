import { useJwt } from 'react-jwt';
import Link from 'next/link';
import useGetCookies from '../Cookies/useGetCookies';
const PrivateRoute = ({ children }) => {
  const user = useGetCookies('lausrin');
  const { isExpired } = useJwt(user);
  const auth = isExpired;
  return !auth ? children : <Link href='/' />;
};

export default PrivateRoute;
