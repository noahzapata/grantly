import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout title='Home' />

      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </div>
  );
}
