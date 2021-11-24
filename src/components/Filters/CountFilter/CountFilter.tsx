import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { RETURN_ALL } from "../../../lib/types";
import styles from "./CountFilter.module.css";

interface CountFilterProps {
  // Calls parent function so we can manage state of the main page
  onChange: (count: string) => void;
}

// Number of reviews to show on the page
const options = ["10", "25", "50", "100", RETURN_ALL];

// Set the defualt option to 10 reviews on the page
const defaultOption = options[0];

const CountFilter: React.FC<CountFilterProps> = ({
  onChange,
}: CountFilterProps) => {
  return (
    <div className={styles.countFilter}>
      <label>Reviews to show</label>
      <div data-testid={"ReviewCount.Dropdown"}>
        <Dropdown
          options={options}
          onChange={(e) => {
            onChange(e.value);
          }}
          value={defaultOption}
        />
      </div>
    </div>
  );
};

export default CountFilter;
