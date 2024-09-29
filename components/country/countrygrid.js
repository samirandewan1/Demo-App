import React from "react";
import { getCountries } from "@/lib/dbmodule";
import styles from "./countrygrid.module.css";
import CountryFilter from "../filter/filter";
import Link from "next/link";


const CountryGrid = async ({ squery, rquery }) => {
  let filteredCountries = [];
  const countryData = await getCountries();
  const uniqueRegions = [
    ...new Set(countryData.map((country) => country.region)),
  ];
  const regionOptions = uniqueRegions.map((region) => ({
    label: region,
    value: region,
  }));
  if (squery) {
    const searchText = squery.toLowerCase();
    filteredCountries = countryData.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      const capital = country.capital ? country.capital[0].toLowerCase() : "";

      return (
        countryName.startsWith(searchText) || capital.startsWith(searchText)
      );
    });
  }
  if (rquery) {
    const searchText = rquery.toLowerCase();
    const searchRegions = searchText.split(",").map((region) => region.trim());

    const regionToDisplay = squery ? filteredCountries : countryData;
    filteredCountries = regionToDisplay.filter((country) => {
      const regionName = country.region.toLowerCase(); // Assuming country.name.common contains the country name
      return searchRegions.includes(regionName);
    });
  }
  const countriesToDisplay = squery || rquery ? filteredCountries : countryData;
  return (
    <>
      {countriesToDisplay && (
        <>
          <div className={styles["country-data-filter"]}>
            <CountryFilter regions={regionOptions} />
          </div>
          <div className={styles["country-data-cards"]}>
            {countriesToDisplay.map((country, index) => (
              <div key={index} className={styles["country-data-card"]}>
                <h2 className={styles["country-data-heading"]}>
                  {country.name.common}
                </h2>
                <p className={styles["country-data-paragraph"]}>
                  <strong>Flag: </strong>
                  {country.flag}
                </p>
                <p className={styles["country-data-paragraph"]}>
                  <strong>Region: </strong>
                  {country.region}
                </p>
                <p className={styles["country-data-paragraph"]}>
                  <strong>Current time: </strong>
                  {country.timezones}
                </p>
                <button className={styles["country-data-btn"]}>
                  <Link href={`/countries/${country.cca2}`}> Details <span className={styles["arrow"]}>&#8594;</span></Link>
                 
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {!countryData && <span>no data found.</span>}
    </>
  );
};

export default CountryGrid;
