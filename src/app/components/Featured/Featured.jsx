"use client";
import Image from "next/image";
import SliderImages from "@/app/utils/SliderImages";
import styles from "./Featured.module.css";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const handleArrow = (dir) => {
    if (dir === "l") {
      setIndex((prev) => (prev == 0 ? 2 : prev - 1));
    }
    if (dir === "r") {
      setIndex((prev) => (prev == 2 ? 0 : prev + 1));
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image src={"/img/arrowl.png"} layout="fill" alt="arrow" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${index * -100}vw)` }}
      >
        {SliderImages.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} layout="fill" objectFit="cover" alt="img" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }}>
        <Image
          src={"/img/arrowr.png"}
          layout="fill"
          onClick={() => handleArrow("r")}
          alt="arrow"
        />
      </div>
    </div>
  );
};

export default Featured;
