import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./CustomInputs.module.css";

const CustomCheckbox = ({ formData, handleCheck, value, index }) => {
  return (
    <div
      className={styles.container}
      style={{ display: "flex", gap: "5px", alignItems: "center" }}
      onClick={() => handleCheck(value, index)}
    >
      {formData.extras.some((extra) => extra.ing === value.ing) ? (
        <FaHeart color="red" />
      ) : (
        <FaRegHeart color="gray" />
      )}
      <p style={{ fontSize: "14px" }}>{value.ing}</p>
    </div>
  );
};

export default CustomCheckbox;
