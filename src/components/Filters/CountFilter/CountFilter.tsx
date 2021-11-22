import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "./CountFilter.module.css";

interface CountFilterProps {
  onChange: (count: string) => void;
}

const options = ["10", "25", "50", "100", "all"];
const defaultOption = options[0];

const CountFilter: React.FC<CountFilterProps> = ({
  onChange,
}: CountFilterProps) => {
  return (
    <div className={styles.countFilter}>
      <label>Reviews to show</label>
      <Dropdown
        options={options}
        onChange={(e) => {
          console.log(e);
          onChange(e.value);
        }}
        value={defaultOption}
      />
    </div>
  );
};

export default CountFilter;
