"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { toggle } from "@/redux/features/sidebarSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.persistedReducer.sidebar);
  const { order, option } = useSelector((state) => state.persistedReducer.cart);

  return (
    <div
      className={styles.container}
      style={
        open
          ? { transform: "translateX(0%)", transition: "all 1s ease-in-out" }
          : { transform: "translateX(100%)", transition: "all 1s ease-in-out" }
      }
    >
      <button
        className={styles.closeIcon}
        onClick={() => dispatch(toggle(false))}
      >
        <AiFillCloseCircle size={30} color="red" />
      </button>
      <div className={styles.body}>
        <h1>Cart</h1>
        <div className={styles.itemContainer}>
          <div className={styles.itemTitle}>
            <p>Img</p>
            <p style={{ flex: 3 }}>Name</p>
            <p style={{ flex: 1 }}>Quantity</p>
            <p>Total</p>
          </div>
          {order.map((item) => {
            return (
              <div className={styles.item}>
                <Image src={item.img} width={35} height={35} />
                <p style={{ flex: 3 }}>{item.productName}</p>
                <p style={{ flex: 1 }}>{item.quantity}</p>
                <p>{item.total}</p>
              </div>
            );
          })}
        </div>
        <button> Go To Checkout</button>
      </div>
    </div>
  );
};

export default Sidebar;
