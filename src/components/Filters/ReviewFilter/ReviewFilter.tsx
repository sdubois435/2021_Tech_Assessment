import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "./ReviewFilter.module.css";

interface ReviewFilterProps {
  onChange: (type: string) => void;
}

const options = [
  "By Date (newest)",
  "By Date (oldest)",
  "By Author",
  "By Rating (high to low)",
  "By Rating (low to high)",
];
const defaultOption = options[0];

const ReviewFilter: React.FC<ReviewFilterProps> = ({
  onChange,
}: ReviewFilterProps) => {
  return (
    <div className={styles.filter}>
      <label>Filters</label>
      <Dropdown
        options={options}
        value={defaultOption}
        onChange={(e) => {
          onChange(e.value);
        }}
        placeholder="Select a filter"
      />
    </div>
  );
};

export default ReviewFilter;
