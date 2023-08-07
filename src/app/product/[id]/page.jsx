"use client";
import Image from "next/image";
import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import CustomCheckbox from "@/app/components/CustomInputs/CustomCheckbox";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";
import { v4 as uuidv4 } from "uuid";

const Product = () => {
  const dispatch = useDispatch();
  const newId = uuidv4();
  const [idCreated, setIdCreated] = useState(0);

  const pizza = {
    id: '1',
    img: "/img/pizza.png",
    name: "CAMPAGNOLA",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
    sizes: [
      { inches: 'sm 9"', px: 50 },
      { inches: 'md 14"', px: 70 },
      { inches: 'lg 20"', px: 90 },
    ],
  };

  const extras = [
    { ing: "Bacon", price: 2 },
    { ing: "Pepperoni", price: 2 },
    { ing: "Mushrooms", price: 2 },
    { ing: "Olives", price: 2 },
    { ing: "Pinapple", price: 2 },
  ];

  const [formData, setFormData] = useState({
    productId: pizza.id,
    img: pizza.img,
    productName: pizza.name,
    quantity: 1,
    size: pizza.sizes[0].inches,
    extras: [],
    price: pizza.price[0],
    total: pizza.price[0],
  });

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleCheck = (value) => {
    setFormData((prev) => {
      const index = prev.extras.findIndex((object) => {
        return object.ing === value.ing;
      });

      if (
        prev.extras.some((extra) => {
          return extra.ing === value.ing;
        })
      ) {
        return {
          ...prev,
          extras: [...prev.extras.toSpliced(index, 1)],
        };
      }
      return {
        ...prev,
        extras: [...prev.extras, value],
      };
    });
  };

  useEffect(() => {
    setFormData((prev) => {
      const extrasTotal = prev.extras.reduce((total, current) => {
        return total + current.price;
      }, 0);
      return {
        ...prev,
        total: (prev.price + extrasTotal) * prev.quantity,
      };
    });
  }, [formData.price, formData.extras, formData.quantity]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{pizza.name}</div>
        <div className={styles.price}>{formData.total.toFixed(2)}$</div>
        <div className={styles.desc}>{pizza.desc}</div>
        <div className={styles.choose}>Choose your size</div>

        <div className={styles.sizes}>
          {pizza.sizes.map((size, i) => (
            <div
              key={i}
              className={styles.sizeImg}
              style={{
                height: size.px,
                width: size.px,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Image
                onClick={() => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      price: pizza.price[i],
                      size: pizza.sizes[i].inches,
                    };
                  });
                }}
                src={"/img/size.png"}
                layout="fill"
                alt=""
              />
              <p>{size.inches}</p>
            </div>
          ))}
        </div>
        <div className={styles.quantityContainer}>
          <label className={styles.quantityLabel} htmlFor="number">
            Quantity
          </label>
          <input
            className={styles.quantity}
            type="number"
            name="number"
            value={formData.quantity}
            onChange={(e) => handleChange(e, "quantity")}
          />
        </div>
        <div className={styles.extrasContainer}>
          <h3 className={styles.extrasTitle}>Select your extras</h3>
          <div className={styles.extras}>
            {extras.map((item, i) => (
              <CustomCheckbox
                key={i}
                handleCheck={handleCheck}
                value={item}
                formData={formData}
                index={i}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(addItem({ itemId: newId, ...formData }));
            setIdCreated((prev) => prev + 1);
          }}
          className={styles.btn}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
