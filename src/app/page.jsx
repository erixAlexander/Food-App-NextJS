import styles from "./Home.module.css";
import Featured from "./components/Featured/Featured";
import ProductList from "./components/ProductList/ProductList";

const Page = () => {
  return (
    <div className={styles.container}>
      <Featured />
      <ProductList />
    </div>
  );
};

export default Page;
