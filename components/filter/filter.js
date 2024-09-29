"use client";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./filter.module.css";

function CountryFilter({ regions }) {
  const [selected, setSelected] = useState([]);
  const searchParam = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const handleSelections = (options) => {
    console.log(options);
    setSelected(options);
    if (options) {
      const regionValues = options.map((option) => option.value);
      const queryString = regionValues.join(",");
      const params = new URLSearchParams(searchParam);
      if (queryString) {
        params.set("r", queryString);
      } else {
        params.delete("r");
      }
      replace(`${pathName}?${params.toString()}`);
    }
  };
  return (
    <>
      <div className={styles["filter-container"]}>
        <MultiSelect
          options={regions}
          value={selected}
          onChange={handleSelections}
          overrideStrings={{
            selectSomeItems: "filter by region",
          }}
        />
      </div>
    </>
  );
}

export default CountryFilter;
