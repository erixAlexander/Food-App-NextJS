import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className={styles.container}>
      <Image src={"/img/pizza.png"} width={500} height={500} alt="" />
      <h1 className={styles.title}>Margarita Tomato</h1>
      <span className={styles.price}>19.99$</span>
      <p className={styles.desc}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

export default ProductCard;
