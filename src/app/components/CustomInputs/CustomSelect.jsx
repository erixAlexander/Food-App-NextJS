import styles from "./CustomInputs.module.css";

const CustomSelect = ({ label, value, options, onChange, name }) => {
  return (
    <div className={styles.container}>
      <label className={styles.selectLabel}>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e, name)}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
