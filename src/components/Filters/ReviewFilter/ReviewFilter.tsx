import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { SORT_BY_NEWEST, SORT_BY_OLDEST, SORT_BY_AUTHOR, SORT_BY_HIGHEST, SORT_BY_LOWEST } from "../../../lib/types";
import styles from "./ReviewFilter.module.css";

interface ReviewFilterProps {
  // Calls parent function so we can manage state of the main page
  onChange: (type: string) => void;
}

// Filters available for the reviews
const options = [
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  SORT_BY_AUTHOR,
  SORT_BY_HIGHEST,
  SORT_BY_LOWEST,
];

// Default filter set to latest (newest) reviews first
const defaultOption = options[0];

const ReviewFilter: React.FC<ReviewFilterProps> = ({
  onChange,
}: ReviewFilterProps) => {
  return (
    <div className={styles.filter}>
      <label>Filters</label>
      <div data-testid={"ReviewFilter.Dropdown"}>
        <Dropdown
          options={options}
          value={defaultOption}
          onChange={(e) => {
            onChange(e.value);
          }}
          placeholder="Select a filter"
        />
      </div>
    </div>
  );
};

export default ReviewFilter;
