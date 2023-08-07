"use client";
import styles from "./Order.module.css";
import Statuses from "@/app/components/Order/Statuses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {
    const orders = await fetch(
      `http://localhost:3000/api/orders/${session?.userInfo._id}`,
      {
        next: { revalidate: 10 },
        method: "GET",
      }
    );
    if (orders.ok) {
      setOrders(await orders.json());
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [session]);

  useEffect(() => {
    setSubtotal(
      orders?.map((order) => order.total).reduce((acc, curr) => acc + curr, 0)
    );
  }, [orders]);

  useEffect(() => {
    setTotal(subtotal + discount);
  }, [subtotal]);

  if (!session || !session.user) {
    return (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <div className={styles.top}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.row}>
                <th>Order Number</th>
                <th style={{ flex: 3, maxWidth: "220px" }}>Products</th>
                <th style={{ flex: 3, maxWidth: "220px" }}>Address</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className={styles.body}>
              {orders?.map((order, i) => {
                return (
                  <tr key={i} className={styles.row}>
                    <td>{order._id.substring(18)}</td>
                    <td style={{ flex: 3, maxWidth: "220px" }}>
                      {order.items.map((item, i) => (
                        <p style={{ fontSize: "12px" }} key={i}>
                          {item.productName} &nbsp;
                        </p>
                      ))}
                    </td>
                    <td style={{ flex: 3, maxWidth: "220px" }}>
                      San Diego, Bvd. 2332 st. 43
                    </td>

                    <td style={{ fontWeight: "bold" }}>
                      {order.total?.toFixed(2)}$
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      <Statuses status={"Paid"} />
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
              <strong>SubTotal:</strong> {subtotal?.toFixed(2)}$
            </p>
          </div>
          <div>
            <p>
              <strong>Discount:</strong> {discount?.toFixed(2)}$
            </p>
          </div>
          <div>
            <p>
              <strong>Total:</strong> {total?.toFixed(2)}$
            </p>
          </div>
          <div>
            <button>Paid</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
