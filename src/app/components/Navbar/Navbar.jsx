"use client";
import Image from "next/image";
import { left, right } from "@/app/utils/NavLinks";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/features/sidebarSlice";
import SignButton from "../SignButton/SignButton";

const Navbar = () => {
  const order = useSelector((state) => state.persistedReducer.cart.order);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.phoneContainer}>
        <div className={styles.phoneButton}>
          <Image
            src={"/img/telephone.png"}
            width={45}
            height={45}
            alt="phone"
          />
        </div>
        <div className={styles.phoneText}>
          <p>Order Now</p>
          <p>+1 555 754 8899</p>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.linksContainer}>
          {left.map(({ link, name }) => {
            return (
              <Link key={name} href={link}>
                {name}
              </Link>
            );
          })}
        </div>
        <div>
          <Image src={"/img/logo.png"} width={120} height={70} alt="logo" />
        </div>
        <div className={styles.linksContainer}>
          {right.map(({ link, name }) => {
            return (
              <Link key={name} href={link}>
                {name}
              </Link>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <SignButton />
        <button
          className={styles.cartContainer}
          onClick={() => {
            dispatch(toggle(true));
          }}
        >
          <div>
            <Image src={"/img/cart.png"} height={35} width={35} alt="cart" />
            <div className={styles.cartItems}>{<p>{order?.length}</p>}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
