import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src={"/img/bg.png"} layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        </div>
        <div className={styles.card}>
          <h3>Find our restaurants</h3>
          <div>
            <p>1654 Don Road #85544</p>
            <p> New York 334455</p>
            <p>(+1225522455)</p>
          </div>
          <div>
            <p>1654 Don Road #85544</p>
            <p> New York 334455</p>
            <p>(+1225522455)</p>
          </div>
          <div>
            <p>1654 Don Road #85544</p>
            <p> New York 334455</p>
            <p>(+1225522455)</p>
          </div>
        </div>
        <div className={styles.card}>
          <h3>Working Hours</h3>
          <p>Monday-Friday 8am to 10pm</p>
          <p>Saturday-Sunday 10am to 12pm</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
