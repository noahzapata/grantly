import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import styles from '../../styles/Home.module.scss';

export default function Products() {
  return (
    <Layout title='Products'>
      <main className={styles.main}>
        <div className={styles.HomeGrid}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    </Layout>
  );
}
