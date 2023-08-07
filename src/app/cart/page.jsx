"use client";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "./Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuantity,
  subtractQuantity,
  selectOption,
  clearCart,
} from "@/redux/features/cartSlice";
import CustomSelect from "../components/CustomInputs/CustomSelect";
import { useSession } from "next-auth/react";

const Page = () => {
  const dispatch = useDispatch();
  const { order, option } = useSelector((state) => state.persistedReducer.cart);
  const { data: session } = useSession();

  let subtotal = order
    .map((item) => item.total)
    .reduce((total, curr) => {
      return total + curr;
    }, 0);
  const discount = 0.0;
  let total = subtotal + discount;
  console.log(order);
  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <div className={styles.top}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.row}>
                <th>Img</th>
                <th>Name</th>
                <th>Size</th>
                <th style={{ flex: 3, maxWidth: "220px" }}>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody className={styles.body}>
              {order.map((item, i) => {
                return (
                  <tr key={i} className={styles.row}>
                    <td>
                      <Image src={item.img} width={40} height={40} alt="" />
                    </td>
                    <td>{item.productName.toLowerCase()}</td>
                    <td>{item.size}</td>
                    <td style={{ flex: 3, maxWidth: "220px" }}>
                      {item.extras.map((extra, i) => (
                        <>
                          <p key={i}>
                            {extra.ing}&nbsp;
                            <span style={{ fontWeight: "bold" }}>
                              {extra.price}$
                            </span>
                            {item.extras.length - 1 !== i ? "," : ""}
                          </p>
                          &nbsp;
                        </>
                      ))}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      {item.price.toFixed(2)}$
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          dispatch(subtractQuantity(item.itemId));
                        }}
                        className={styles.quantityIcons}
                        style={{ marginRight: "3px" }}
                      >
                        <FaMinus color="red" size={10} />
                      </div>
                      <p>{item.quantity}</p>
                      <div
                        onClick={(e) => {
                          dispatch(addQuantity(item.itemId));
                        }}
                        className={styles.quantityIcons}
                        style={{ marginLeft: "3px" }}
                      >
                        <FaPlus color="green" size={10} />
                      </div>
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      {item.total.toFixed(2)}$
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.totalContainer}>
          <div>
            <h2>Total</h2>
          </div>
          <div>
            <p>
              <strong>SubTotal:</strong> {subtotal.toFixed(2)}$
            </p>
          </div>
          <div>
            <p>
              <strong>Discount:</strong> {discount.toFixed(2)}$
            </p>
          </div>
          <div>
            <p>
              <strong>Total:</strong> {total?.toFixed(2)}$
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomSelect
              label={"Select an Option"}
              value={option}
              onChange={(e) => {
                dispatch(selectOption(e.target.value));
              }}
              options={[
                { value: "Delivery", label: "Delivery" },
                { value: "Pick-Up", label: "Pick-Up" },
              ]}
            />
            <button
              onClick={async () => {
                await fetch(`http://localhost:3000/api/orders`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    order,
                    option,
                    id: session.userInfo._id,
                  }),
                });
                dispatch(clearCart());
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
